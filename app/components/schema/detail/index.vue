<template>
  <div class="detail-view">
    <!-- Header Section -->
    <div v-if="schema.showHeader" class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-foreground">
            {{ schema.headerTitle || "Details" }}
          </h1>
          <p v-if="schema.headerSubtitle" class="text-muted-foreground mt-1">
            {{ schema.headerSubtitle }}
          </p>
        </div>
        <div v-if="schema.headerActions?.length" class="flex gap-2">
          <UButton
            v-for="action in schema.headerActions"
            :key="action.label"
            :variant="action.variant || 'primary'"
            :size="action.size || 'md'"
            :icon="action.icon"
            @click="handleAction(action.action)"
          >
            {{ action.label }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Content based on layout -->
    <SchemaDetailVerticalRenderer
      v-if="schema.layout === 'vertical'"
      :schema="schema"
      @action="handleAction"
    />

    <SchemaDetailHorizontalRenderer
      v-else-if="schema.layout === 'horizontal'"
      :schema="schema"
      @action="handleAction"
    />

    <SchemaDetailCardRenderer
      v-else-if="schema.layout === 'card'"
      :schema="schema"
      @action="handleAction"
    />

    <SchemaDetailTabsRenderer
      v-else-if="schema.layout === 'tabs'"
      :schema="schema"
      @action="handleAction"
    />
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

function handleAction(action: string | Function) {
  emit("action", action);
}
</script>
