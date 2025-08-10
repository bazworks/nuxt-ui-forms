<script setup lang="ts">
// Navigation to different detail layout demos
const detailDemos = [
  {
    title: "Vertical Layout",
    description:
      "All fields stacked vertically in sections - clean and organized layout for detailed information",
    path: "/schema-demo/detail/vertical",
    icon: "heroicons:bars-3",
    color: "primary",
  },
  {
    title: "Horizontal Layout",
    description:
      "Fields arranged in a grid layout within sections - efficient use of space for compact details",
    path: "/schema-demo/detail/horizontal",
    icon: "heroicons:arrows-right-left",
    color: "success",
  },
  {
    title: "Card Layout",
    description:
      "Each section displayed as a separate card - perfect for dashboard-style detail views",
    path: "/schema-demo/detail/card",
    icon: "heroicons:rectangle-stack",
    color: "info",
  },
  {
    title: "Tabs Layout",
    description:
      "Sections organized in tabs - ideal for complex data with multiple categories",
    path: "/schema-demo/detail/tabs",
    icon: "heroicons:square-3-stack-3d",
    color: "warning",
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Detail View Demos</h1>
      <p class="text-xl text-gray-600">
        Explore different layout configurations for the schema detail view
        system
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="demo in detailDemos"
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
        About Detail Views
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Layout Types</h3>
          <ul class="space-y-1 text-sm">
            <li>• <strong>Vertical:</strong> Fields stacked in sections</li>
            <li>• <strong>Horizontal:</strong> Grid layout within sections</li>
            <li>• <strong>Card:</strong> Each section as a separate card</li>
            <li>• <strong>Tabs:</strong> Sections organized in tabs</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Features</h3>
          <ul class="space-y-1 text-sm">
            <li>• Multiple field types (text, badge, email, etc.)</li>
            <li>• Custom field content with slots</li>
            <li>• Header actions and navigation</li>
            <li>• Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
