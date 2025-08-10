<script setup lang="ts">
// Navigation to different list layout demos
const listDemos = [
  {
    title: "Grid Layout",
    description:
      "Card-based grid layout with configurable columns - perfect for dashboards and visual data display",
    path: "/schema-demo/list/grid",
    icon: "heroicons:squares-2x2",
    color: "primary",
  },
  {
    title: "Flex Layout",
    description:
      "Horizontal card-based list layout with flexible widths - ideal for compact lists and user profiles",
    path: "/schema-demo/list/flex",
    icon: "heroicons:bars-3",
    color: "success",
  },
  {
    title: "Table Layout",
    description:
      "Traditional table layout with proper alignment and styling - perfect for data-heavy lists and admin interfaces",
    path: "/schema-demo/list/table",
    icon: "heroicons:table-cells",
    color: "info",
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        List View Layout Demos
      </h1>
      <p class="text-xl text-gray-600">
        Explore different layout configurations for the schema list view system
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="demo in listDemos"
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
        About List View Layouts
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Layout Types</h3>
          <ul class="space-y-1 text-sm">
            <li>
              • <strong>Grid:</strong> Card-based grid layout with configurable
              columns
            </li>
            <li>• <strong>Flex:</strong> Horizontal card-based list layout</li>
            <li>
              • <strong>Table:</strong> Traditional table with headers and rows
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Features</h3>
          <ul class="space-y-1 text-sm">
            <li>• Built-in search functionality</li>
            <li>• Custom field content with slots</li>
            <li>• Action menus with icons</li>
            <li>• Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
