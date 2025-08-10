<template>
  <div class="space-y-6">
    <div
      v-for="(section, sectionIndex) in schema.sections"
      :key="sectionIndex"
      class="bg-card border rounded-lg p-6"
      :class="section.className"
    >
      <!-- Section Header -->
      <div v-if="section.title || section.description" class="mb-6">
        <h3
          v-if="section.title"
          class="text-lg font-semibold text-foreground mb-1"
        >
          {{ section.title }}
        </h3>
        <p v-if="section.description" class="text-muted-foreground text-sm">
          {{ section.description }}
        </p>
      </div>

      <!-- Fields in horizontal layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="field in section.fields"
          :key="field.key"
          class="flex flex-col"
        >
          <label class="text-sm font-medium text-muted-foreground mb-2">
            {{ field.label }}
          </label>
          <div
            class="text-foreground"
            :class="[getFieldClasses(field), field.className]"
          >
            <SchemaDetailFieldRenderer
              :field="field"
              :value="schema.item[field.key]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DetailSchema } from "./types";

const props = defineProps<{
  schema: DetailSchema;
}>();

const emit = defineEmits<{
  action: [action: string | Function];
}>();

function getFieldClasses(field: any) {
  const classes = [];

  if (field.align === "center") {
    classes.push("text-center");
  } else if (field.align === "right") {
    classes.push("text-right");
  } else {
    classes.push("text-left");
  }

  if (field.width) {
    classes.push(field.width);
  }

  return classes.join(" ");
}

function handleAction(action: string | Function) {
  emit("action", action);
}
</script>
