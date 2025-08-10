<template>
  <!-- Table Layout -->
  <div v-if="schema.layout === 'table'" :class="getLayoutClasses()">
    <SchemaListTableRenderer
      :schema="schema"
      :items="filteredItems"
      @action="handleAction"
    >
      <!-- Pass through slots to TableRenderer -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </SchemaListTableRenderer>
  </div>

  <!-- Grid/Flex Layout -->
  <div v-else :class="getLayoutClasses()">
    <SchemaListItemRenderer
      v-for="item in filteredItems"
      :key="getItemKey(item)"
      :item="item"
      :schema="schema"
      @action="handleAction"
    >
      <!-- Pass through slots to ItemRenderer -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </SchemaListItemRenderer>
  </div>
</template>

<script setup lang="ts">
import type { ListSchema } from "./types";

const props = defineProps<{
  schema: ListSchema;
  filteredItems: Record<string, unknown>[];
}>();

const emit = defineEmits<{
  action: [action: string | Function, item: Record<string, unknown>];
}>();

// Get unique key for each item
const getItemKey = (item: Record<string, unknown>) => {
  return item.id || item.key || JSON.stringify(item);
};

// Get layout classes
const getLayoutClasses = () => {
  const baseClasses = ["list-container"];

  if (props.schema.layout === "grid") {
    baseClasses.push("grid", "w-full");

    if (props.schema.columns) {
      baseClasses.push(`grid-cols-${props.schema.columns}`);
    } else {
      baseClasses.push("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
    }
  } else if (props.schema.layout === "table") {
    baseClasses.push("w-full");
  } else {
    baseClasses.push("flex", "flex-col", "w-full");
  }

  // Add gap (only for grid and flex layouts)
  if (props.schema.layout !== "table") {
    if (props.schema.gap) {
      baseClasses.push(props.schema.gap);
    } else {
      baseClasses.push("gap-4");
    }
  }

  // Add custom classes
  if (props.schema.className) {
    baseClasses.push(props.schema.className);
  }

  return baseClasses.join(" ");
};

// Handle action from ItemRenderer
const handleAction = (
  action: string | Function,
  item: Record<string, unknown>
) => {
  emit("action", action, item);
};
</script>
