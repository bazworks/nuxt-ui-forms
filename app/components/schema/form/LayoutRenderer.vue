<template>
  <div :class="getLayoutClasses(layout)" v-bind="layout.props">
    <template v-for="(item, index) in layout.fields" :key="index">
      <!-- If item is a field name string, render the field -->
      <template v-if="typeof item === 'string'">
        <div :class="getFieldWrapperClasses(layout.type)">
          <template v-if="getFieldByNameReliable(item)">
            <SchemaFormFieldRenderer
              :field="getFieldByNameReliable(item)!"
              :form-state="formState"
            />
          </template>
        </div>
      </template>
      <!-- If item is a nested layout group, render recursively -->
      <template v-else>
        <div :class="getFieldWrapperClasses(layout.type)">
          <SchemaFormLayoutRenderer
            :layout="item"
            :fields="fields"
            :form-state="formState"
            :form-class="formClass"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
// Layout types for UI schema
interface LayoutGroup {
  type: string; // Accept any string, we'll validate internally
  fields: (string | LayoutGroup)[]; // Field names or nested groups
  props?: Record<string, unknown>; // Additional props for the layout container
  className?: string; // Custom CSS classes
  columns?: number; // For grid layout
}

// Field definition interface
interface FieldDefinition {
  name: string;
  type: string; // Component name without the 'U' prefix
  fieldProps: Record<string, unknown>; // Props for UFormField
  inputProps: Record<string, unknown>; // Props for the actual input component
}

const props = defineProps<{
  layout: LayoutGroup;
  fields: FieldDefinition[];
  formState: Record<string, unknown>;
  formClass?: string; // Form's class for spacing
}>();

// Create a map of field names to field objects for more reliable lookup
const fieldMap = computed(() => {
  const map = new Map();
  props.fields.forEach((field) => {
    map.set(field.name, field);
  });
  return map;
});

const getFieldByNameReliable = (name: string) => {
  return fieldMap.value.get(name);
};

// Helper function to get CSS classes for layout
const getLayoutClasses = (layout: LayoutGroup) => {
  const baseClasses = [];

  if (layout.type === "horizontal") {
    baseClasses.push("flex", "flex-row", "items-end", "w-full");
    // Use form class for spacing, fallback to gap-4
    baseClasses.push(props.formClass || "gap-4");
  } else if (layout.type === "vertical") {
    baseClasses.push("flex", "flex-col", "w-full");
    // Use form class for spacing, fallback to gap-4
    baseClasses.push(props.formClass || "gap-4");
  } else if (layout.type === "grid") {
    baseClasses.push("grid", "w-full");
    // Use form class for spacing, fallback to gap-4
    baseClasses.push(props.formClass || "gap-4");
    if (layout.columns) {
      baseClasses.push(`grid-cols-${layout.columns}`);
    } else {
      baseClasses.push("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
    }
  }

  // Add custom className after form class so it can override if needed
  if (layout.className) {
    baseClasses.push(layout.className);
  }

  return baseClasses.join(" ");
};

// Helper function to get wrapper classes for fields based on parent layout
const getFieldWrapperClasses = (layoutType: string) => {
  if (layoutType === "horizontal") {
    return "flex-1 min-w-0"; // flex-1 to expand, min-w-0 to allow shrinking
  } else if (layoutType === "vertical") {
    return "w-full";
  } else if (layoutType === "grid") {
    return "w-full";
  }
  return "w-full";
};
</script>
