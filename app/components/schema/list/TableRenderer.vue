<template>
  <div class="table-container">
    <table class="w-full">
      <!-- Table Header -->
      <thead class="bg-muted">
        <tr class="border-b">
          <th
            v-for="field in schema.fields"
            :key="field.key"
            class="px-4 py-3 text-sm font-medium text-foreground"
            :class="getFieldClasses(field)"
            :style="getFieldStyle(field)"
          >
            {{ field.label || field.key }}
          </th>
          <th
            v-if="schema.actions?.length"
            class="px-4 py-3 text-sm font-medium text-foreground text-right"
            style="width: auto"
          >
            Actions
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody>
        <tr
          v-for="item in items"
          :key="getItemKey(item)"
          class="border-b hover:bg-muted/50 transition-colors"
        >
          <td
            v-for="field in schema.fields"
            :key="field.key"
            class="px-4 py-3 text-sm"
            :class="getFieldClasses(field)"
            :style="getFieldStyle(field)"
          >
            <!-- Custom slot content -->
            <slot
              v-if="hasCustomSlot(field.key)"
              :name="field.key"
              :item="item"
            />

            <!-- Default content -->
            <span v-else>{{ formatValue(item[field.key]) }}</span>
          </td>

          <!-- Actions Column -->
          <td v-if="schema.actions?.length" class="px-4 py-3 text-right">
            <UDropdownMenu :items="getActionItems(item)">
              <UButton
                icon="heroicons:ellipsis-vertical"
                variant="ghost"
                size="sm"
              />
            </UDropdownMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { ListFieldDefinition, ListSchema } from "./types";

const props = defineProps<{
  schema: ListSchema;
  items: Record<string, unknown>[];
}>();

const emit = defineEmits<{
  action: [action: string | Function, item: Record<string, unknown>];
}>();

// Check if there's a custom slot for this field
const hasCustomSlot = (fieldKey: string) => {
  return !!useSlots()[fieldKey];
};

// Get unique key for each item
const getItemKey = (item: Record<string, unknown>) => {
  return item.id || item.key || JSON.stringify(item);
};

// Get field classes
const getFieldClasses = (field: ListFieldDefinition) => {
  const classes = [];

  // Set alignment - default to left if not specified
  if (field.align === "center") {
    classes.push("text-center");
  } else if (field.align === "right") {
    classes.push("text-right");
  } else {
    classes.push("text-left"); // Default alignment
  }

  if (field.className) {
    classes.push(field.className);
  }

  return classes.join(" ");
};

// Get field style for width
const getFieldStyle = (field: ListFieldDefinition) => {
  if (field.width) {
    return { width: field.width };
  }
  return {};
};

// Format field value
const formatValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return "-";
  }
  return String(value);
};

// Get action items for dropdown
const getActionItems = (item: Record<string, unknown>) => {
  return (
    props.schema.actions?.map((action) => ({
      label: action.label,
      icon: action.icon,
      onSelect: () => handleAction(action.action, item),
    })) || []
  );
};

// Handle action click
const handleAction = (
  action: string | Function,
  item: Record<string, unknown>
) => {
  emit("action", action, item);
};
</script>

<style scoped>
.table-container {
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  overflow: hidden;
}

table {
  border-collapse: collapse;
}

th,
td {
  border-collapse: collapse;
}
</style>
