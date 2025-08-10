<template>
  <div :class="getItemClasses()">
    <!-- Item fields -->
    <div v-for="field in schema.fields" :key="field.key" class="field">
      <!-- Custom slot content -->
      <slot v-if="hasCustomSlot(field.key)" :name="field.key" :item="item" />

      <!-- Default content -->
      <div v-else :class="getFieldClasses(field)">
        <span v-if="field.label" class="field-label">{{ field.label }}:</span>
        <span class="field-value">{{ formatValue(item[field.key]) }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="schema.actions?.length" class="actions">
      <UDropdownMenu :items="getActionItems()">
        <UButton icon="heroicons:ellipsis-vertical" variant="ghost" size="sm" />
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ActionDefinition,
  ListFieldDefinition,
  ListSchema,
} from "./types";

const props = defineProps<{
  item: Record<string, unknown>;
  schema: ListSchema;
}>();

const emit = defineEmits<{
  action: [action: string | Function, item: Record<string, unknown>];
}>();

// Check if there's a custom slot for this field
const hasCustomSlot = (fieldKey: string) => {
  return !!useSlots()[fieldKey];
};

// Get item container classes
const getItemClasses = () => {
  const baseClasses = ["item", "p-4", "border", "rounded-lg", "bg-white"];

  if (props.schema.layout === "grid") {
    baseClasses.push("flex", "flex-col", "gap-2");
  } else {
    baseClasses.push("flex", "items-center", "gap-4");
  }

  if (props.schema.itemClassName) {
    baseClasses.push(props.schema.itemClassName);
  }

  return baseClasses.join(" ");
};

// Get field classes
const getFieldClasses = (field: ListFieldDefinition) => {
  const classes = ["field"];

  if (field.align === "center") {
    classes.push("text-center");
  } else if (field.align === "right") {
    classes.push("text-right");
  }

  if (field.width) {
    classes.push(field.width);
  }

  if (field.className) {
    classes.push(field.className);
  }

  return classes.join(" ");
};

// Format field value
const formatValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return "-";
  }
  return String(value);
};

// Get action items for dropdown
const getActionItems = () => {
  return (
    props.schema.actions?.map((action) => ({
      label: action.label,
      icon: action.icon,
      onSelect: () => handleAction(action),
    })) || []
  );
};

// Handle action click
const handleAction = (action: ActionDefinition) => {
  emit("action", action.action, props.item);
};
</script>

<style scoped>
.item {
  transition: all 0.2s ease;
}

.item:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.field-label {
  font-weight: 500;
  color: #6b7280;
  margin-right: 0.5rem;
}

.field-value {
  color: #111827;
}

.actions {
  margin-left: auto;
}
</style>
