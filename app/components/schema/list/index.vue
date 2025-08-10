<template>
  <div class="schema-list">
    <!-- Search Bar -->
    <SchemaListSearchFilter v-if="schema.searchable" @search="handleSearch" />

    <!-- List -->
    <SchemaListRenderer
      :schema="schema"
      :filtered-items="filteredItems"
      @action="handleAction"
    >
      <!-- Pass through slots to ListRenderer -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </SchemaListRenderer>

    <!-- Empty state -->
    <div v-if="filteredItems.length === 0" class="empty-state text-center py-8">
      <UIcon
        name="heroicons:document-text"
        class="w-12 h-12 text-muted-foreground mx-auto mb-4"
      />
      <p class="text-muted-foreground">
        {{
          searchQuery
            ? "No items found matching your search."
            : "No items to display."
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ListSchema } from "./types";

const props = defineProps<{
  schema: ListSchema;
}>();

const emit = defineEmits<{
  action: [action: string | Function, item: Record<string, unknown>];
}>();

const searchQuery = ref("");

// Filter items based on search query
const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return props.schema.items;
  }

  const query = searchQuery.value.toLowerCase();
  return props.schema.items.filter((item) => {
    // Search across all field values
    return props.schema.fields.some((field) => {
      const value = item[field.key];
      if (value === null || value === undefined) {
        return false;
      }
      return String(value).toLowerCase().includes(query);
    });
  });
});

// Handle search
const handleSearch = (query: string) => {
  searchQuery.value = query;
};

// Handle action from ListRenderer
const handleAction = (
  action: string | Function,
  item: Record<string, unknown>
) => {
  emit("action", action, item);
};
</script>
