<template>
  <div>
    <!-- Custom slot content -->
    <slot v-if="hasCustomSlot(field.key)" :name="field.key" :value="value" />

    <!-- Default content based on field type -->
    <div v-else>
      <!-- Badge type -->
      <UBadge
        v-if="field.type === 'badge'"
        :color="getBadgeColor(value)"
        size="sm"
      >
        {{ formatValue(value) }}
      </UBadge>

      <!-- Email type -->
      <a
        v-else-if="field.type === 'email'"
        :href="`mailto:${value}`"
        class="text-primary hover:underline"
      >
        {{ formatValue(value) }}
      </a>

      <!-- URL type -->
      <a
        v-else-if="field.type === 'url'"
        :href="String(value)"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:underline"
      >
        {{ formatValue(value) }}
      </a>

      <!-- Phone type -->
      <a
        v-else-if="field.type === 'phone'"
        :href="`tel:${value}`"
        class="text-primary hover:underline"
      >
        {{ formatValue(value) }}
      </a>

      <!-- Boolean type -->
      <div v-else-if="field.type === 'boolean'" class="flex items-center gap-2">
        <UIcon
          :name="value ? 'heroicons:check-circle' : 'heroicons:x-circle'"
          :class="value ? 'text-success' : 'text-error'"
          class="w-4 h-4"
        />
        <span>{{ value ? "Yes" : "No" }}</span>
      </div>

      <!-- Date type -->
      <span v-else-if="field.type === 'date'" class="text-muted-foreground">
        {{ formatDate(value) }}
      </span>

      <!-- Number type -->
      <span v-else-if="field.type === 'number'" class="font-mono">
        {{ formatValue(value) }}
      </span>

      <!-- Default text type -->
      <span v-else class="text-foreground">
        {{ formatValue(value) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DetailFieldDefinition } from "./types";

const props = defineProps<{
  field: DetailFieldDefinition;
  value: unknown;
}>();

// Check if there's a custom slot for this field
const hasCustomSlot = (fieldKey: string) => {
  return !!useSlots()[fieldKey];
};

// Format field value
const formatValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return "-";
  }

  if (props.field.format) {
    return props.field.format(value);
  }

  return String(value);
};

// Format date consistently
const formatDate = (value: unknown) => {
  if (!value) return "-";

  try {
    const date = new Date(value as string);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return formatValue(value);
  }
};

// Get badge color based on value
const getBadgeColor = (value: unknown) => {
  const strValue = String(value).toLowerCase();

  if (strValue.includes("active") || strValue.includes("success")) {
    return "success";
  }
  if (strValue.includes("inactive") || strValue.includes("error")) {
    return "error";
  }
  if (strValue.includes("pending") || strValue.includes("warning")) {
    return "warning";
  }
  if (strValue.includes("admin")) {
    return "primary";
  }
  if (strValue.includes("editor")) {
    return "info";
  }

  return "neutral";
};
</script>
