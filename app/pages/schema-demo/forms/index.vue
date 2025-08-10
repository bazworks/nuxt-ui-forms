<script setup lang="ts">
// Navigation to different form layout demos
const formDemos = [
  {
    title: "Vertical Layout",
    description:
      "All fields stacked vertically - simple and clean layout for basic forms",
    path: "/schema-demo/forms/vertical",
    icon: "heroicons:bars-3",
    color: "primary",
  },
  {
    title: "Horizontal Layout",
    description:
      "Name and email side by side, other fields below - efficient use of space",
    path: "/schema-demo/forms/horizontal",
    icon: "heroicons:arrows-right-left",
    color: "success",
  },
  {
    title: "Grid Layout",
    description:
      "Two-column grid layout for better space utilization and organization",
    path: "/schema-demo/forms/grid",
    icon: "heroicons:squares-2x2",
    color: "info",
  },
  {
    title: "Mixed Layout",
    description:
      "Complex layout combining horizontal, vertical, and grouping for advanced forms",
    path: "/schema-demo/forms/mixed",
    icon: "heroicons:puzzle-piece",
    color: "warning",
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Form Layout Demos</h1>
      <p class="text-xl text-gray-600">
        Explore different layout configurations for the schema form system
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="demo in formDemos"
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
        About Form Layouts
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Layout Types</h3>
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
          <h3 class="font-medium text-gray-900 mb-2">Features</h3>
          <ul class="space-y-1 text-sm">
            <li>• Zod validation integration</li>
            <li>• Custom field components</li>
            <li>• Responsive design</li>
            <li>• Theme-aware styling</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
