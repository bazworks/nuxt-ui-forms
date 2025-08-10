<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <UCard
      v-for="(section, sectionIndex) in schema.sections"
      :key="sectionIndex"
      class="h-fit"
      :class="section.className"
    >
      <!-- Section Header -->
      <div v-if="section.title || section.description" class="mb-4">
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

      <!-- Fields -->
      <div class="space-y-4">
        <div
          v-for="field in section.fields"
          :key="field.key"
          class="flex flex-col"
        >
          <label class="text-sm font-medium text-muted-foreground mb-1">
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
    </UCard>
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
