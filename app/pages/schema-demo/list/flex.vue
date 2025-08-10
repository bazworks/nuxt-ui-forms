<script setup lang="ts">
import { computed } from "vue";
import type { ListSchema } from "~/components/schema/list/types";

// Sample data
const items = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    role: "user",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "active",
    role: "editor",
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "pending",
    role: "user",
    createdAt: "2024-01-25",
  },
];

// Flex layout schema
const flexSchema = computed<ListSchema>(() => ({
  items,
  layout: "flex",
  gap: "gap-4",
  searchable: true,

  fields: [
    {
      key: "name",
      label: "Name",
      align: "left",
      width: "w-48",
    },
    {
      key: "email",
      label: "Email",
      align: "left",
      width: "w-64",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      width: "w-24",
    },
    {
      key: "role",
      label: "Role",
      align: "center",
      width: "w-20",
    },
  ],

  actions: [
    {
      label: "View",
      action: "view",
      icon: "heroicons:eye",
    },
    {
      label: "Edit",
      action: "edit",
      icon: "heroicons:pencil-square",
    },
  ],
}));

// Handle actions
function handleAction(
  action: string | Function,
  item: Record<string, unknown>
) {
  console.log("Action:", action, "Item:", item);

  if (typeof action === "string") {
    switch (action) {
      case "edit":
        alert(`Edit ${item.name}`);
        break;
      case "delete":
        if (confirm(`Delete ${item.name}?`)) {
          alert(`Deleted ${item.name}`);
        }
        break;
      case "view":
        alert(`View ${item.name}`);
        break;
    }
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Flex Layout Demo</h1>
      <p class="text-gray-600">
        Horizontal card-based list layout with flexible widths
      </p>
    </div>

    <!-- Flex Layout Demo -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <SchemaList :schema="flexSchema" @action="handleAction">
        <!-- Custom status field -->
        <template #status="{ item }">
          <UBadge
            :color="
              item.status === 'active'
                ? 'success'
                : item.status === 'inactive'
                ? 'error'
                : 'warning'
            "
            size="sm"
          >
            {{ item.status }}
          </UBadge>
        </template>
      </SchemaList>
    </div>
  </div>
</template>
