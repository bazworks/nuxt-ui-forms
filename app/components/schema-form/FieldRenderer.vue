<template>
  <UFormField v-bind="field.fieldProps" class="w-full">
    <template #error="{ error }">
      <!-- Custom error display with reserved space -->
      <div class="min-h-[20px] transition-all duration-200">
        <span v-if="error" class="text-error text-sm">
          {{ error }}
        </span>
      </div>
    </template>
    <!-- Core form input components that exist in Nuxt UI -->
    <UInput
      v-if="field.type === 'Input'"
      v-model="formState[field.name] as string | number"
      v-bind="field.inputProps"
      class="w-full"
    />
    <USelect
      v-else-if="field.type === 'Select'"
      v-model="formState[field.name] as string | number"
      v-bind="field.inputProps"
      class="w-full"
    />
    <UTextarea
      v-else-if="field.type === 'Textarea'"
      v-model="formState[field.name] as string"
      v-bind="field.inputProps"
      class="w-full"
    />
    <UCheckbox
      v-else-if="field.type === 'Checkbox'"
      v-model="formState[field.name] as boolean"
      v-bind="field.inputProps"
    />
    <URadioGroup
      v-else-if="field.type === 'RadioGroup'"
      v-model="formState[field.name] as string | number"
      v-bind="field.inputProps"
      class="w-full"
    />
    <USwitch
      v-else-if="field.type === 'Switch'"
      v-model="formState[field.name] as boolean"
      v-bind="field.inputProps"
    />
    <UButton v-else-if="field.type === 'Button'" v-bind="field.inputProps" />

    <!-- Display components -->
    <UBadge v-else-if="field.type === 'Badge'" v-bind="field.inputProps" />
    <UAvatar v-else-if="field.type === 'Avatar'" v-bind="field.inputProps" />
    <UIcon
      v-else-if="field.type === 'Icon'"
      v-bind="field.inputProps"
      :name="(field.inputProps.name as string) || 'heroicons:question-mark-circle'"
    />

    <!-- Layout components -->
    <UCard
      v-else-if="field.type === 'Card'"
      v-bind="field.inputProps"
      class="w-full"
    >
      <slot />
    </UCard>

    <!-- Feedback components -->
    <UProgress
      v-else-if="field.type === 'Progress'"
      v-bind="field.inputProps"
      class="w-full"
    />
    <UAlert
      v-else-if="field.type === 'Alert'"
      v-bind="field.inputProps"
      class="w-full"
    />

    <!-- Navigation and Interactive components -->
    <UTabs
      v-else-if="field.type === 'Tabs'"
      v-model="formState[field.name] as string | number"
      v-bind="field.inputProps"
      class="w-full"
    />
    <UAccordion
      v-else-if="field.type === 'Accordion'"
      v-model="formState[field.name] as string | string[]"
      v-bind="field.inputProps"
      class="w-full"
    />
    <UTable
      v-else-if="field.type === 'Table'"
      v-bind="field.inputProps"
      class="w-full"
    />
    <UModal
      v-else-if="field.type === 'Modal'"
      v-model="formState[field.name] as boolean"
      v-bind="field.inputProps"
    >
      <slot />
    </UModal>

    <!-- Fallback for any unknown component types -->
    <div v-else class="text-red-500 text-sm">
      Unknown component type: {{ field.type }}
    </div>
  </UFormField>
</template>

<script setup lang="ts">
// Field definition interface
interface FieldDefinition {
  name: string;
  type: string; // Component name without the 'U' prefix
  fieldProps: Record<string, unknown>; // Props for UFormField
  inputProps: Record<string, unknown>; // Props for the actual input component
}

const _props = defineProps<{
  field: FieldDefinition;
  formState: Record<string, unknown>;
}>();

// Use destructured props to avoid "unused" warning
const { field, formState } = _props;
</script>
