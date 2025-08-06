<template>
  <div class="flex flex-col flex-1 w-full gap-2">
    <div
      class="flex flex-row items-center gap-2 justify-between border-b border-accented"
    >
      <UInput
        v-model="globalFilter"
        type="search"
        class="max-w-lg w-full py-2 flex-1"
        placeholder="Filter..."
        icon="i-lucide-search"
      />
      <UBadge size="lg" variant="solid" color="neutral" icon="i-lucide-info">
        {{
          `${table?.tableApi?.getFilteredRowModel().rows.length || 0} records`
        }}
      </UBadge>
    </div>

    <ClientOnly>
      <section v-if="rows.length > 0">
        <UTable
          ref="table"
          v-model:global-filter="globalFilter"
          :data="dataWithTotals"
          :columns="tableColumns"
          class="flex-1"
          role="grid"
          aria-label="Data table"
          :ui="{ thead: 'bg-primary/20' }"
          @select="OnSelect"
        >
          <slot />
        </UTable>
      </section>

      <div v-else class="flex-1 flex items-center justify-center text-muted">
        No data available
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { Column as TanstackColumn } from "@tanstack/vue-table";
import { h, resolveComponent, useSlots } from "vue";

const UBadge = resolveComponent("UBadge");
const UTable = resolveComponent("UTable");
const UButton = resolveComponent("UButton");

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
  filterable?: boolean;
  total?: "sum" | "avg";
  currency?: string;
  suffix?: string;
}

interface TableRow {
  [key: string]: string | number | boolean | undefined;
  id?: string | number;
  slug: string;
}

const props = defineProps<{
  columns: TableColumn[];
  rows: TableRow[];
  showTotalsRow?: boolean;
}>();

const emit = defineEmits<{
  (e: "select", row: TableRow): void;
}>();

const globalFilter = ref("");
const table = ref<any>(null);
const slots = useSlots();

const filteredRows = computed(() => {
  return table.value?.tableApi?.getFilteredRowModel()?.rows ?? [];
});

const totals = computed(() => {
  const result: Record<string, number> = {};

  const rows = filteredRows.value.length
    ? filteredRows.value
    : props.rows.map((row) => ({ original: row }));

  props.columns.forEach((col) => {
    if (!col.total || !col.numeric) return;

    const values = rows.map((row) => {
      const raw = row.original[col.key];
      const num =
        typeof raw === "string"
          ? Number(raw.replace(/[^0-9.-]+/g, ""))
          : Number(raw);
      return isNaN(num) ? 0 : num;
    });

    if (col.total === "sum") {
      result[col.key] = values.reduce((a, b) => a + b, 0);
    } else if (col.total === "avg") {
      result[col.key] =
        values.length > 0
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;
    }
  });

  return result;
});

const dataWithTotals = computed(() => {
  if (!props.showTotalsRow) return filteredRows.value;

  const totalsRow: TableRow = { slug: "totals" };

  props.columns.forEach((col, index) => {
    if (col.total && col.numeric) {
      totalsRow[col.key] = totals.value[col.key] ?? 0;
    } else if (index === 0) {
      totalsRow[col.key] = "Total";
    } else {
      totalsRow[col.key] = "";
    }
  });

  return [...props.rows, totalsRow];
});

const tableColumns = computed(() => {
  if (!props.columns?.length) return [];
  return props.columns.map((col) => ({
    accessorKey: col.key,
    header: ({ column }: { column: TanstackColumn<TableRow> }) =>
      getHeader(column, col),
    cell: ({
      row,
    }: {
      row: { getValue: (key: string) => any; original: TableRow };
    }) => {
      const slotName = `${col.key}-cell`;
      const isTotals = row.original.slug === "totals";

      if (slots[slotName] && !isTotals) {
        return slots[slotName]({ row });
      }

      const value = row.getValue(col.key);

      if (col.currency) {
        const num =
          typeof value === "number"
            ? value
            : Number(String(value).replace(/[^0-9.-]+/g, ""));

        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: col.currency,
        }).format(num || 0);

        const display = col.suffix ? `${formatted}${col.suffix}` : formatted;
        return h(
          "div",
          {
            class: `text-right ${isTotals ? "font-bold bg-muted/40" : ""}`,
          },
          display
        );
      }

      if (col.numeric) {
        const formatted = Number(value).toFixed(2);
        const display = col.suffix ? `${formatted}${col.suffix}` : formatted;

        return h(
          "div",
          {
            class: `text-right ${isTotals ? "font-bold bg-muted/40" : ""}`,
          },
          display
        );
      }

      if (isTotals && col === props.columns[0]) {
        return h(
          "div",
          {
            class: "font-bold text-2xltext-left bg-muted/40 pl-2",
          },
          "Total"
        );
      }

      return value;
    },
  }));
});

const OnSelect = (row: { original: TableRow }, event: MouseEvent) => {
  console.log(row, event);
  emit("select", row.original);
};

function getHeader(column: TanstackColumn<TableRow>, dataColumn: TableColumn) {
  const rightAlign = dataColumn.numeric ? "flex justify-end" : "";
  return h(
    "div",
    {
      class: `${rightAlign}`,
    },
    getSortHeader(column, dataColumn)
  );
}

function getSortHeader(
  column: TanstackColumn<TableRow>,
  dataColumn: TableColumn
) {
  const isSorted = column.getIsSorted();
  if (dataColumn.sortable) {
    return h(UButton, {
      color: "neutral",
      variant: "ghost",
      label: dataColumn.label,
      icon: isSorted
        ? isSorted === "asc"
          ? "i-lucide-arrow-up-narrow-wide"
          : "i-lucide-arrow-down-wide-narrow"
        : "i-lucide-arrow-up-down",
      class: `flex justify-end p-0 data-[state=open]:bg-elevated`,
      "aria-label": `Sort by ${
        isSorted === "asc" ? "descending" : "ascending"
      }`,
      onClick: () => column.toggleSorting(isSorted === "asc"),
    });
  }
  return dataColumn.label;
}
</script>
