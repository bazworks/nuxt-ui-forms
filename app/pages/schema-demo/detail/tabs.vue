<script setup lang="ts">
import { computed } from "vue";
import type { DetailSchema } from "~/components/schema/detail/types";

// Sample data
const item = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  status: "active",
  role: "admin",
  department: "Engineering",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  bio: "Senior software engineer with 8+ years of experience in full-stack development. Passionate about clean code and user experience.",
  skills: ["JavaScript", "TypeScript", "Vue.js", "Node.js", "Python"],
  hireDate: "2022-03-15",
  lastLogin: "2024-01-20T10:30:00Z",
  isRemote: true,
  salary: 120000,
};

// Tabs layout schema
const tabsSchema = computed<DetailSchema>(() => ({
  item,
  layout: "tabs",
  showHeader: true,
  headerTitle: "Employee Details",
  headerSubtitle: "Complete information about the employee",
  headerActions: [
    {
      label: "Edit",
      action: "edit",
      icon: "heroicons:pencil-square",
      variant: "primary",
    },
    {
      label: "Delete",
      action: "delete",
      icon: "heroicons:trash",
      variant: "error",
    },
  ],

  sections: [
    {
      title: "Personal Information",
      description: "Basic personal details of the employee",
      icon: "heroicons:user",
      fields: [
        {
          key: "name",
          label: "Full Name",
          type: "text",
        },
        {
          key: "email",
          label: "Email Address",
          type: "email",
        },
        {
          key: "phone",
          label: "Phone Number",
          type: "phone",
        },
        {
          key: "website",
          label: "Website",
          type: "url",
        },
        {
          key: "bio",
          label: "Biography",
          type: "text",
        },
      ],
    },
    {
      title: "Employment Details",
      description: "Work-related information and status",
      icon: "heroicons:briefcase",
      fields: [
        {
          key: "status",
          label: "Status",
          type: "badge",
        },
        {
          key: "role",
          label: "Role",
          type: "badge",
        },
        {
          key: "department",
          label: "Department",
          type: "text",
        },
        {
          key: "location",
          label: "Location",
          type: "text",
        },
        {
          key: "hireDate",
          label: "Hire Date",
          type: "date",
        },
        {
          key: "isRemote",
          label: "Remote Work",
          type: "boolean",
        },
      ],
    },
    {
      title: "Additional Information",
      description: "Additional details and preferences",
      icon: "heroicons:information-circle",
      fields: [
        {
          key: "lastLogin",
          label: "Last Login",
          type: "date",
        },
        {
          key: "salary",
          label: "Annual Salary",
          type: "number",
          format: (value) => `$${Number(value).toLocaleString()}`,
        },
      ],
    },
  ],
}));

// Handle actions
function handleAction(action: string | Function) {
  console.log("Action:", action);

  if (typeof action === "string") {
    switch (action) {
      case "edit":
        alert("Edit employee details");
        break;
      case "delete":
        if (confirm("Are you sure you want to delete this employee?")) {
          alert("Employee deleted");
        }
        break;
    }
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Tabs Layout Demo</h1>
      <p class="text-gray-600">
        Sections organized in tabs - ideal for complex data with multiple
        categories
      </p>
    </div>

    <!-- Tabs Layout Demo -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <SchemaDetail :schema="tabsSchema" @action="handleAction">
        <!-- Custom skills field -->
        <template #skills="{ value }">
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="skill in value"
              :key="skill"
              color="neutral"
              size="sm"
            >
              {{ skill }}
            </UBadge>
          </div>
        </template>
      </SchemaDetail>
    </div>
  </div>
</template>
