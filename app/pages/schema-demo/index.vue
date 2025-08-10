<script setup lang="ts">
// Navigation to different schema demos
const schemaDemos = [
  {
    title: "Form Layouts",
    description:
      "Schema-driven forms with validation, layouts, and custom fields",
    path: "/schema-demo/forms",
    icon: "heroicons:document-text",
    color: "primary",
  },
  {
    title: "List Views",
    description:
      "Schema-driven list views with search, actions, and custom layouts",
    path: "/schema-demo/list",
    icon: "heroicons:list-bullet",
    color: "success",
  },
  {
    title: "Detail Views",
    description:
      "Schema-driven detail views with sections, layouts, and custom fields",
    path: "/schema-demo/detail",
    icon: "heroicons:user-circle",
    color: "info",
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Schema Component Demos
      </h1>
      <p class="text-xl text-gray-600">
        Explore different layout configurations for the schema component system
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="demo in schemaDemos"
        :key="demo.path"
        class="hover:shadow-lg transition-shadow cursor-pointer p-6"
        @click="navigateTo(demo.path)"
      >
        <div class="flex items-start space-x-4">
          <div
            :class="`p-3 rounded-lg bg-${demo.color}-100 text-${demo.color}-600`"
          >
            <UIcon :name="demo.icon" class="w-6 h-6" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ demo.title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ demo.description }}</p>
            <UButton
              variant="soft"
              size="sm"
              @click.stop="navigateTo(demo.path)"
            >
              View Demo
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <div class="mt-12 bg-gray-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        About Schema Components
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Form Layouts</h3>
          <ul class="space-y-1 text-sm">
            <li>
              • <strong>Vertical:</strong> Fields stacked in a single column
            </li>
            <li>• <strong>Horizontal:</strong> Fields arranged side by side</li>
            <li>• <strong>Grid:</strong> Multi-column grid layout</li>
            <li>• <strong>Mixed:</strong> Combination of different layouts</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-2">List Views</h3>
          <ul class="space-y-1 text-sm">
            <li>• <strong>Grid:</strong> Card-based grid layout</li>
            <li>• <strong>Flex:</strong> Horizontal list layout</li>
            <li>• <strong>Table:</strong> Traditional table layout</li>
            <li>• <strong>Search:</strong> Built-in search functionality</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Detail Views</h3>
          <ul class="space-y-1 text-sm">
            <li>• <strong>Vertical:</strong> Fields stacked in sections</li>
            <li>• <strong>Horizontal:</strong> Grid layout within sections</li>
            <li>• <strong>Card:</strong> Each section as a separate card</li>
            <li>• <strong>Tabs:</strong> Sections organized in tabs</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
