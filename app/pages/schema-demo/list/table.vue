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

// Table layout schema
const tableSchema = computed<ListSchema>(() => ({
  items,
  layout: "table",
  searchable: true,

  fields: [
    {
      key: "name",
      label: "Name",
      align: "left",
      width: "2fr",
    },
    {
      key: "email",
      label: "Email",
      align: "left",
      width: "3fr",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      width: "1fr",
    },
    {
      key: "role",
      label: "Role",
      align: "center",
      width: "1fr",
    },
    {
      key: "createdAt",
      label: "Created",
      align: "center",
      width: "1fr",
    },
  ],

  actions: [
    {
      label: "Edit",
      action: "edit",
      icon: "heroicons:pencil-square",
    },
    {
      label: "Delete",
      action: "delete",
      icon: "heroicons:trash",
      variant: "error",
    },
  ],
}));

// Format date consistently for server/client
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

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
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Table Layout Demo</h1>
      <p class="text-gray-600">
        Traditional table layout with proper alignment and styling
      </p>
    </div>

    <!-- Table Layout Demo -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <SchemaList :schema="tableSchema" @action="handleAction">
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

        <!-- Custom role field -->
        <template #role="{ item }">
          <UBadge
            :color="
              item.role === 'admin'
                ? 'primary'
                : item.role === 'editor'
                ? 'info'
                : 'neutral'
            "
            size="sm"
          >
            {{ item.role }}
          </UBadge>
        </template>

        <!-- Custom date field -->
        <template #createdAt="{ item }">
          <span class="text-sm text-muted-foreground">
            {{ formatDate(item.createdAt as string) }}
          </span>
        </template>
      </SchemaList>
    </div>
  </div>
</template>
