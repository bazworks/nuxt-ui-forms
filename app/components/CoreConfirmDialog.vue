<template>
  <UModal
    :title="title"
    :description="description"
    :dismissible="false"
    :ui="{ width: 'max-w-md' }"
    :close="{ onClick: () => emit('close', false) }"
  >
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton color="neutral" variant="soft" @click="emit('close', false)">
          {{ cancelText }}
        </UButton>
        <UButton
          :color="color"
          :variant="variant"
          :icon="icon"
          @click="emit('close', true)"
        >
          {{ confirmText }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  title: { type: String, default: "Are you sure?" },
  description: { type: String, default: "This action cannot be undone." },
  confirmText: { type: String, default: "Confirm" },
  cancelText: { type: String, default: "Cancel" },
  color: {
    type: String as PropType<
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "error"
      | "neutral"
      | undefined
    >,
    default: "primary",
  },
  variant: {
    type: String as PropType<
      "solid" | "link" | "outline" | "soft" | "subtle" | "ghost" | undefined
    >,
    default: "solid",
  },
  icon: { type: String, default: "i-heroicons-exclamation-triangle" },
  iconColor: { type: String, default: "text-warning-500" },
});

const emit = defineEmits<{ (e: "close", value: boolean): void }>();
</script>
