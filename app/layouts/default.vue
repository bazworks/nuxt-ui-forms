<template>
  <div>
    <slot />
    <div
      v-if="ui.loading"
      class="fixed inset-0 z-50 bg-white/80 flex items-center justify-center"
    >
      <div class="text-lg font-semibold animate-pulse">
        {{ ui.loadingMessage }}
      </div>
    </div>
  </div>
</template>
<script setup>
const ui = useUiStore();
</script>
