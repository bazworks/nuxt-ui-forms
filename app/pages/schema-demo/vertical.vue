<script setup lang="ts">
import { computed, reactive } from "vue";
import { z } from "zod";

// Define your Zod validator
const validator = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  age: z.coerce.number().int().min(0).max(120).optional(),
  newsletter: z.boolean().optional(),
  role: z.enum(["admin", "editor", "viewer"]).optional(),
});

// Create your form model
const model = reactive({
  name: "",
  email: "",
  age: undefined,
  newsletter: false,
  role: undefined,
});

// Define form props for UForm
const formProps = computed(() => ({
  state: model,
  schema: validator,
  class: "gap-2",
}));

// Define your fields
const formFields = computed(() => [
  {
    name: "name",
    type: "Input",
    fieldProps: { name: "name", label: "Full name" },
    inputProps: { type: "text", placeholder: "Enter your name" },
  },
  {
    name: "email",
    type: "Input",
    fieldProps: { name: "email", label: "Email address" },
    inputProps: { type: "email", placeholder: "Enter your email" },
  },
  {
    name: "age",
    type: "Input",
    fieldProps: { name: "age", label: "Age" },
    inputProps: { type: "number", placeholder: "Enter your age" },
  },
  {
    name: "newsletter",
    type: "Switch",
    fieldProps: { name: "newsletter", label: "Subscribe to newsletter" },
    inputProps: {},
  },
  {
    name: "role",
    type: "Select",
    fieldProps: { name: "role", label: "User Role" },
    inputProps: {
      items: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
  },
]);

// Handle form events
function onSubmit(event: { data: Record<string, unknown> }) {
  console.log("✅ Form submitted successfully:", event.data);
  formState.value = event.data;
}

function onError(event: unknown) {
  console.log("❌ Form validation errors:", event);
}

const formState = ref({});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Vertical Layout Demo
      </h1>
      <p class="text-gray-600">
        All fields stacked vertically - simple and clean layout
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- The form with vertical layout (default) -->
      <SchemaFormSimpleSchemaForm
        :form-props="formProps"
        :fields="formFields"
        @submit="onSubmit"
        @error="onError"
      />

      <!-- Display results -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-2">
            Current Form State:
          </h3>
          <pre
            class="text-sm bg-gray-50 p-4 rounded-lg overflow-auto max-h-60"
            >{{ JSON.stringify(model, null, 2) }}</pre
          >
        </div>
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-2">
            Last Submit Data:
          </h3>
          <pre
            class="text-sm bg-green-50 p-4 rounded-lg overflow-auto max-h-60"
            >{{ JSON.stringify(formState, null, 2) }}</pre
          >
        </div>
      </div>
    </div>
  </div>
</template>
