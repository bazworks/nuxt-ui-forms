<script setup lang="ts">
// Navigation to different layout demos
const layoutDemos = [
  {
    title: "Vertical Layout",
    description: "All fields stacked vertically - simple and clean layout",
    path: "/schema-demo/vertical",
    icon: "heroicons:bars-3",
    color: "blue",
  },
  {
    title: "Horizontal Layout",
    description: "Name and email side by side, other fields below",
    path: "/schema-demo/horizontal",
    icon: "heroicons:arrows-right-left",
    color: "green",
  },
  {
    title: "Grid Layout",
    description: "Two-column grid layout for better space utilization",
    path: "/schema-demo/grid",
    icon: "heroicons:squares-2x2",
    color: "purple",
  },
  {
    title: "Mixed Layout",
    description: "Complex layout combining horizontal, vertical, and grouping",
    path: "/schema-demo/mixed",
    icon: "heroicons:puzzle-piece",
    color: "orange",
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Schema Form Layout Demos
      </h1>
      <p class="text-xl text-gray-600">
        Explore different layout configurations for the schema form system
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="demo in layoutDemos"
        :key="demo.path"
        :ui="{ body: { padding: 'p-6' } }"
        class="hover:shadow-lg transition-shadow cursor-pointer"
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
              :color="demo.color"
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
        About Schema Form Layouts
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
            <li>• Responsive design that works on all devices</li>
            <li>• Custom CSS classes for styling</li>
            <li>• Nested layout support</li>
            <li>• Automatic field width management</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
