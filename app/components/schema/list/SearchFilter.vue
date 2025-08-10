<template>
  <div class="search-filter mb-4">
    <UInput
      v-model="searchQuery"
      placeholder="Search..."
      icon="heroicons:magnifying-glass"
      class="max-w-md"
      @input="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  search: [query: string];
}>();

const searchQuery = ref("");

const handleSearch = () => {
  emit("search", searchQuery.value);
};

// Debounced search
let searchTimeout: NodeJS.Timeout;
watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    emit("search", newQuery);
  }, 300);
});
</script>
