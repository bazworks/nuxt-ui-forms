<template>
  <div class="w-full">
    <!-- Tab Navigation -->
    <div class="border-b border-border mb-6">
      <nav class="flex space-x-8">
        <button
          v-for="(section, index) in schema.sections"
          :key="index"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
          :class="
            activeTab === index
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
          "
          @click="activeTab = index"
        >
          <div class="flex items-center gap-2">
            <UIcon v-if="section.icon" :name="section.icon" class="w-4 h-4" />
            <span>{{ section.title || `Section ${index + 1}` }}</span>
          </div>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="p-6">
      <div
        v-for="(section, index) in schema.sections"
        v-show="activeTab === index"
        :key="index"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DetailFieldDefinition, DetailSchema } from "./types";

const _props = defineProps<{
  schema: DetailSchema;
}>();

// Use destructured props to avoid "unused" warning
const { schema } = _props;

const activeTab = ref(0);

function getFieldClasses(field: DetailFieldDefinition) {
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
</script>
