<template>
  <div class="w-full">
    <div class="grid grid-cols-2 items-stretch gap-4">
      <div>
        <label v-if="!hideLabels" class="block mb-1 text-sm font-medium"
          >Month</label
        >
        <USelect v-model="selectedMonth" :items="months" class="w-full" />
      </div>
      <div>
        <label v-if="!hideLabels" class="block mb-1 text-sm font-medium"
          >Year</label
        >
        <USelect v-model="selectedYear" :items="years" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string; // YYYY-MM-DD
  hideLabels?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Parse initial values
const initialDate = props.modelValue ? new Date(props.modelValue) : new Date();
const initialYear = String(initialDate.getFullYear());
const initialMonth = String(initialDate.getMonth() + 1);

const selectedYear = ref(initialYear);
const selectedMonth = ref(initialMonth);

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }));
});

// Emit combined value when either changes
watch(
  [selectedYear, selectedMonth],
  ([year, month]) => {
    if (year && month) {
      const paddedMonth = month.padStart(2, "0");
      emit("update:modelValue", `${year}-${paddedMonth}-01`);
    }
  },
  { immediate: true }
);
</script>

<style></style>
