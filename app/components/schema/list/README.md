# Schema List Components

A simple and flexible list view system using Nuxt UI components. This system allows you to create dynamic lists based on JSON schemas with search, actions, and custom layouts.

## Components

- **`SchemaList.vue`** - Main list component that orchestrates everything
- **`ListRenderer.vue`** - Renders grid or flex layouts
- **`ItemRenderer.vue`** - Renders individual items with fields and actions
- **`SearchFilter.vue`** - Provides search functionality

## Quick Start

### 1. Basic List Setup

```vue
<script setup lang="ts">
import type { ListSchema } from "~/components/schema/list/types";

// Your data
const items = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
];

// Define your list schema
const listSchema: ListSchema = {
  items,
  layout: "grid",
  columns: 3,
  gap: "gap-4",
  searchable: true,

  fields: [
    {
      key: "name",
      label: "Name",
      align: "left",
    },
    {
      key: "email",
      label: "Email",
      align: "left",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      width: "w-24",
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
};

// Handle actions
function handleAction(
  action: string | Function,
  item: Record<string, unknown>
) {
  console.log("Action:", action, "Item:", item);

  if (typeof action === "string") {
    switch (action) {
      case "edit":
        // Handle edit
        break;
      case "delete":
        // Handle delete
        break;
    }
  }
}
</script>

<template>
  <SchemaList :schema="listSchema" @action="handleAction" />
</template>
```

### 2. Custom Field Content

You can override field content using slots:

```vue
<template>
  <SchemaList :schema="listSchema" @action="handleAction">
    <!-- Custom status field -->
    <template #status="{ item }">
      <UBadge :color="item.status === 'active' ? 'success' : 'error'" size="sm">
        {{ item.status }}
      </UBadge>
    </template>

    <!-- Custom date field -->
    <template #createdAt="{ item }">
      <span class="text-sm text-gray-500">
        {{ new Date(item.createdAt).toLocaleDateString() }}
      </span>
    </template>
  </SchemaList>
</template>
```

## API Reference

### SchemaList Props

| Prop     | Type         | Required | Description                 |
| -------- | ------------ | -------- | --------------------------- |
| `schema` | `ListSchema` | ✅       | List configuration and data |

### SchemaList Events

| Event    | Payload                                                       | Description                       |
| -------- | ------------------------------------------------------------- | --------------------------------- |
| `action` | `(action: string \| Function, item: Record<string, unknown>)` | Fired when an action is triggered |

### ListSchema Interface

```typescript
interface ListSchema {
  // Data (user provides)
  items: Record<string, unknown>[];

  // Layout configuration
  layout: "grid" | "flex";
  columns?: number; // For grid layout
  gap?: string; // CSS gap (e.g., "gap-4")

  // Item configuration
  fields: ListFieldDefinition[];

  // Features
  searchable?: boolean;

  // Styling
  className?: string;
  itemClassName?: string;

  // Actions
  actions?: ActionDefinition[];
}
```

### ListFieldDefinition Interface

```typescript
interface ListFieldDefinition {
  key: string; // Data field key
  label?: string; // Optional label
  align?: "left" | "center" | "right";
  width?: string; // CSS width
  className?: string;
}
```

### ActionDefinition Interface

```typescript
interface ActionDefinition {
  label: string;
  action: string | Function;
  icon?: string;
  variant?: "primary" | "secondary" | "error";
}
```

## Layout Types

### 1. Grid Layout

```typescript
const gridSchema: ListSchema = {
  items,
  layout: 'grid',
  columns: 3,              // Number of columns
  gap: 'gap-6',            // Gap between items
  fields: [...]
};
```

### 2. Flex Layout

```typescript
const flexSchema: ListSchema = {
  items,
  layout: 'flex',
  gap: 'gap-4',            // Gap between items
  fields: [...]
};
```

## Field Configuration

### Alignment

```typescript
fields: [
  {
    key: "name",
    align: "left", // left, center, right
  },
  {
    key: "status",
    align: "center",
  },
];
```

### Width Control

```typescript
fields: [
  {
    key: "name",
    width: "w-48", // Tailwind width classes
  },
  {
    key: "status",
    width: "w-24",
  },
];
```

### Custom Styling

```typescript
fields: [
  {
    key: "status",
    className: "font-bold text-green-600",
  },
];
```

## Actions

### Basic Actions

```typescript
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
    variant: "danger",
  },
];
```

### Function Actions

```typescript
actions: [
  {
    label: "Custom Action",
    action: (item) => {
      console.log("Custom action for:", item);
    },
    icon: "heroicons:star",
  },
];
```

## Search Functionality

Enable search by setting `searchable: true`:

```typescript
const listSchema: ListSchema = {
  items,
  searchable: true, // Enables search
  // ... other config
};
```

Search works across all field values automatically.

## Styling

### Custom Classes

```typescript
const listSchema: ListSchema = {
  items,
  className: "my-custom-list", // Container classes
  itemClassName: "my-custom-item", // Item classes
  // ... other config
};
```

### Responsive Design

```typescript
const listSchema: ListSchema = {
  items,
  layout: "grid",
  columns: 3,
  className: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  // ... other config
};
```

## Examples

### User List with Status Badges

```typescript
const userListSchema: ListSchema = {
  items: users,
  layout: "grid",
  columns: 2,
  gap: "gap-6",
  searchable: true,

  fields: [
    { key: "name", label: "Name", align: "left" },
    { key: "email", label: "Email", align: "left" },
    { key: "status", label: "Status", align: "center", width: "w-24" },
    { key: "role", label: "Role", align: "center", width: "w-20" },
  ],

  actions: [
    { label: "Edit", action: "edit", icon: "heroicons:pencil-square" },
    {
      label: "Delete",
      action: "delete",
      icon: "heroicons:trash",
      variant: "error",
    },
  ],
};
```

### Product Grid

```typescript
const productListSchema: ListSchema = {
  items: products,
  layout: "grid",
  columns: 4,
  gap: "gap-4",
  searchable: true,

  fields: [
    { key: "name", label: "Product", align: "left" },
    { key: "price", label: "Price", align: "right" },
    { key: "category", label: "Category", align: "center" },
    { key: "stock", label: "Stock", align: "center" },
  ],

  actions: [
    { label: "View", action: "view", icon: "heroicons:eye" },
    {
      label: "Add to Cart",
      action: "addToCart",
      icon: "heroicons:shopping-cart",
    },
  ],
};
```

## Best Practices

### 1. Data Structure

- Use consistent data structure across items
- Include unique identifiers (id, key) for proper rendering
- Handle null/undefined values gracefully

### 2. Field Configuration

- Use descriptive field keys
- Set appropriate alignments for different data types
- Use width constraints for consistent layouts

### 3. Actions

- Keep action labels clear and concise
- Use appropriate icons for better UX
- Handle action responses properly

### 4. Search

- Enable search for lists with many items
- Consider field-specific search if needed
- Provide clear feedback for no results

### 5. Responsive Design

- Test layouts on different screen sizes
- Use responsive grid classes when needed
- Consider mobile-first design

## Troubleshooting

### Common Issues

1. **Items not rendering**: Check that `items` array is not empty
2. **Actions not working**: Verify action handlers are properly implemented
3. **Search not working**: Ensure `searchable: true` is set
4. **Layout issues**: Check CSS classes and responsive design

### Debug Tips

- Check browser console for errors
- Verify data structure matches field definitions
- Test with simple data first
- Use browser dev tools to inspect rendered elements

The list view system provides a simple yet powerful way to display data with search, actions, and custom layouts while maintaining consistency with the overall design system.
