<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  labelField: {
    type: [String, Function] as PropType<string | ((item: any) => any)>,
    default: "label",
  },
  valueField: {
    type: String,
    default: "value",
  },
  modelValue: {
    type: [String, Number, Object, null] as PropType<
      string | number | object | null
    >,
    default: null,
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  emitRaw: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const loading = ref(false);
const fetchedItems = ref<any[]>([]);

const getLabel = (item: any) => {
  if (typeof props.labelField === "function") {
    return props.labelField(item);
  }
  return item[props.labelField];
};

const getValue = (item: any) => item[props.valueField];

const itemsToUse = computed(() => {
  const source = props.url ? fetchedItems.value : props.items;
  if (!Array.isArray(source)) return [];
  return source.map((item) => ({
    label: getLabel(item),
    value: getValue(item),
    raw: item,
  }));
});

const api = useApiInstance();
if (props.url) {
  try {
    loading.value = true;
    const response = await api(props.url);
    console.log("FieldSelectMenu response: ", response);
    fetchedItems.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const selectedItem = computed(() => {
  if (props.emitRaw) {
    // If modelValue is an object, match by valueField
    return (
      itemsToUse.value.find(
        (item) =>
          item.value ===
          (props.modelValue && typeof props.modelValue === "object"
            ? (props.modelValue as any)[props.valueField]
            : props.modelValue)
      ) ?? undefined
    );
  } else {
    // Match by value
    return (
      itemsToUse.value.find((item) => item.value === props.modelValue) ??
      undefined
    );
  }
});

function onSelect(item) {
  emit(
    "update:modelValue",
    item ? (props.emitRaw ? item.raw : item.value) : null
  );
}
</script>

<template>
  <USelectMenu
    :model-value="selectedItem"
    :items="itemsToUse"
    :loading="loading"
    :name="name"
    icon="i-lucide-user"
    :placeholder="placeholder"
    class="w-48"
    @update:model-value="onSelect"
  />
</template>
