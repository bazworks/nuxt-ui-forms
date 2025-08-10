<template>
  <UForm
    v-bind="formProps as any"
    @submit="$emit('submit', $event)"
    @error="$emit('error', $event)"
  >
    <!-- Render with UI schema layout if provided, otherwise default layout -->
    <template v-if="uiSchema?.layout">
      <SchemaFormLayoutRenderer
        :layout="uiSchema.layout"
        :fields="fields"
        :form-state="formState"
        :form-class="formProps.class"
      />
    </template>
    <template v-else>
      <!-- Default: render all fields vertically -->
      <div :class="`flex flex-col w-full ${formProps.class || 'gap-4'}`">
        <template v-for="field in fields" :key="field.name">
          <div class="w-full">
            <SchemaFormFieldRenderer :field="field" :form-state="formState" />
          </div>
        </template>
      </div>
    </template>

    <div class="flex gap-3 mt-6">
      <UButton type="submit">Submit</UButton>
      <UButton type="reset" variant="ghost">Reset</UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Layout types for UI schema
interface LayoutGroup {
  type: string; // Accept any string, we'll validate internally
  fields: (string | LayoutGroup)[]; // Field names or nested groups
  props?: Record<string, unknown>; // Additional props for the layout container
  className?: string; // Custom CSS classes
  columns?: number; // For grid layout
}

interface UISchema {
  layout?: LayoutGroup;
}

// Simple field definition - user provides correct props for each Nuxt UI component
interface FieldDefinition {
  name: string;
  type: string; // Component name without the 'U' prefix
  fieldProps: Record<string, unknown>; // Props for UFormField
  inputProps: Record<string, unknown>; // Props for the actual input component
}

const props = defineProps<{
  formProps: Record<string, unknown>; // All UForm props (state, schema, validate, etc.)
  fields: FieldDefinition[]; // Array of field definitions
  uiSchema?: UISchema; // UI schema for layout configuration
}>();

// Extract the form state from formProps to use with v-model
const formState = computed(
  () => props.formProps.state as Record<string, unknown>
);

defineEmits<{
  submit: [event: { data: Record<string, unknown> }];
  error: [event: unknown];
}>();
</script>
