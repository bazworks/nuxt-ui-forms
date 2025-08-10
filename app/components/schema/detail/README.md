# Schema Detail View System

A flexible and powerful detail view system for displaying individual items with organized sections, multiple layouts, and custom field types.

## Quick Start

````vue
<template>
  <SchemaDetail :schema="detailSchema" @action="handleAction">
    <!-- Custom field content -->
    <template #skills="{ value }">
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="skill in value" :key="skill" color="neutral" size="sm">
          {{ skill }}
        </UBadge>
      </div>
    </template>
  </SchemaDetail>
</template>

<script setup lang="ts">
import type { DetailSchema } from "~/components/schema/detail/types";

const detailSchema: DetailSchema = {
  item: {
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    skills: ["JavaScript", "Vue.js", "TypeScript"],
  },
  layout: "vertical",
  showHeader: true,
  headerTitle: "Employee Details",
  headerActions: [
    {
      label: "Edit",
      action: "edit",
      icon: "heroicons:pencil-square",
      variant: "primary",
    },
  ],
  sections: [
    {
      title: "Personal Information",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "status", label: "Status", type: "badge" },
        { key: "role", label: "Role", type: "badge" },
      ],
    },
  ],
};

function handleAction(action: string | Function) {
  console.log("Action:", action);
}
</script>

## Layout Types ### 1. Vertical Layout All fields stacked vertically in
organized sections - clean and organized layout for detailed information.
```typescript { layout: "vertical", sections: [ { title: "Personal Information",
fields: [/* fields */], }, ], }
````

### 2. Horizontal Layout

Fields arranged in a grid layout within sections - efficient use of space for compact details.

```typescript
{
  layout: "horizontal",
  sections: [
    {
      title: "Personal Information",
      fields: [/* fields */],
    },
  ],
}
```

### 3. Card Layout

Each section displayed as a separate card - perfect for dashboard-style detail views.

```typescript
{
  layout: "card",
  sections: [
    {
      title: "Personal Information",
      fields: [/* fields */],
    },
  ],
}
```

### 4. Tabs Layout

Sections organized in tabs - ideal for complex data with multiple categories.

```typescript
{
  layout: "tabs",
  sections: [
    {
      title: "Personal Information",
      icon: "heroicons:user",
      fields: [/* fields */],
    },
  ],
}
```

## API Reference

### DetailSchema Interface

```typescript
interface DetailSchema {
  item: Record<string, unknown>; // The data object to display
  layout: "vertical" | "horizontal" | "card" | "tabs";
  sections: DetailSectionDefinition[]; // Array of sections
  className?: string; // Custom CSS classes
  showHeader?: boolean; // Show header section
  headerTitle?: string; // Header title
  headerSubtitle?: string; // Header subtitle
  headerActions?: DetailActionDefinition[]; // Header action buttons
}
```

### DetailSectionDefinition Interface

```typescript
interface DetailSectionDefinition {
  title?: string; // Section title
  description?: string; // Section description
  icon?: string; // Icon for tabs layout
  fields: DetailFieldDefinition[]; // Array of fields
  className?: string; // Custom CSS classes
  columns?: number; // For horizontal layout
}
```

### DetailFieldDefinition Interface

```typescript
interface DetailFieldDefinition {
  key: string; // Field key (must match item property)
  label: string; // Display label
  type?:
    | "text"
    | "badge"
    | "date"
    | "email"
    | "url"
    | "phone"
    | "number"
    | "boolean"
    | "custom";
  align?: "left" | "center" | "right"; // Text alignment
  width?: string; // Custom width
  className?: string; // Custom CSS classes
  format?: (value: unknown) => string; // Custom formatter function
}
```

### DetailActionDefinition Interface

```typescript
interface DetailActionDefinition {
  label: string; // Button label
  action: string | Function; // Action to execute
  icon?: string; // Button icon
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "neutral";
  size?: "xs" | "sm" | "md" | "lg"; // Button size
}
```

## Supported Field Types

### Text Fields

- **`text`**: Plain text display
- **`number`**: Monospace number display with optional formatting
- **`date`**: Formatted date display
- **`email`**: Clickable mailto links
- **`url`**: Clickable external links
- **`phone`**: Clickable tel links

### Interactive Fields

- **`badge`**: Colored badges with automatic color detection
- **`boolean`**: Yes/No display with icons

### Custom Fields

- **`custom`**: Use slots for completely custom content

## Field Type Examples

### Basic Text

```typescript
{
  key: "name",
  label: "Full Name",
  type: "text",
}
```

### Badge with Auto-Color

```typescript
{
  key: "status",
  label: "Status",
  type: "badge",
}
```

### Email Link

```typescript
{
  key: "email",
  label: "Email Address",
  type: "email",
}
```

### Formatted Number

```typescript
{
  key: "salary",
  label: "Annual Salary",
  type: "number",
  format: (value) => `$${Number(value).toLocaleString()}`,
}
```

### Boolean with Icons

```typescript
{
  key: "isRemote",
  label: "Remote Work",
  type: "boolean",
}
```

## Custom Field Content

Use slots to override any field's content:

```vue
<SchemaDetail :schema="detailSchema">
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
```

## Header Actions

Add action buttons to the header:

```typescript
{
  showHeader: true,
  headerTitle: "Employee Details",
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
}
```

## Best Practices

### 1. Organize Data into Logical Sections

Group related fields together for better readability:

```typescript
sections: [
  {
    title: "Personal Information",
    fields: ["name", "email", "phone"],
  },
  {
    title: "Employment Details",
    fields: ["status", "role", "department"],
  },
];
```

### 2. Use Appropriate Field Types

Choose the right field type for your data:

- Use `badge` for status, roles, and categories
- Use `email`, `url`, `phone` for clickable links
- Use `boolean` for yes/no values
- Use `date` for timestamps
- Use `number` with formatting for currency, percentages, etc.

### 3. Leverage Custom Formatting

Use the `format` function for complex data display:

```typescript
{
  key: "lastLogin",
  label: "Last Login",
  type: "date",
  format: (value) => new Date(value as string).toLocaleString(),
}
```

### 4. Use Custom Slots for Complex Content

For arrays, objects, or complex UI, use custom slots:

```vue
<template #skills="{ value }">
  <div class="flex flex-wrap gap-2">
    <UBadge v-for="skill in value" :key="skill">
      {{ skill }}
    </UBadge>
  </div>
</template>
```

## Examples

### Employee Detail View

```typescript
const employeeSchema: DetailSchema = {
  item: employee,
  layout: "tabs",
  showHeader: true,
  headerTitle: "Employee Details",
  headerActions: [
    { label: "Edit", action: "edit", icon: "heroicons:pencil-square" },
  ],
  sections: [
    {
      title: "Personal Information",
      icon: "heroicons:user",
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "email", label: "Email", type: "email" },
        { key: "phone", label: "Phone", type: "phone" },
      ],
    },
    {
      title: "Employment",
      icon: "heroicons:briefcase",
      fields: [
        { key: "status", label: "Status", type: "badge" },
        { key: "role", label: "Role", type: "badge" },
        { key: "hireDate", label: "Hire Date", type: "date" },
      ],
    },
  ],
};
```

### Product Detail View

```typescript
const productSchema: DetailSchema = {
  item: product,
  layout: "card",
  showHeader: true,
  headerTitle: "Product Information",
  sections: [
    {
      title: "Basic Information",
      fields: [
        { key: "name", label: "Product Name", type: "text" },
        { key: "category", label: "Category", type: "badge" },
        {
          key: "price",
          label: "Price",
          type: "number",
          format: (v) => `$${v}`,
        },
      ],
    },
    {
      title: "Inventory",
      fields: [
        { key: "stock", label: "In Stock", type: "number" },
        { key: "isActive", label: "Active", type: "boolean" },
      ],
    },
  ],
};
```

## Troubleshooting

### Content Not Displaying

- Ensure the `key` matches a property in your `item` object
- Check that the field type is supported
- Verify the data exists in the item object

### Badge Colors Not Working

- Badge colors are automatically determined based on the value
- For custom colors, use a custom slot instead

### Tabs Not Switching

- Ensure each section has a unique title or the system will generate fallback names
- Check that the tab navigation is properly styled

### Custom Slots Not Working

- Ensure the slot name matches the field key exactly
- Verify the slot is placed inside the `SchemaDetail` component
- Check that the slot receives the correct props (`{ value }`)

## Theme Integration

The detail view system uses Nuxt UI theme classes for consistent styling:

- **Text Colors**: `text-foreground`, `text-muted-foreground`, `text-primary`
- **Background Colors**: `bg-card`, `bg-muted`
- **Border Colors**: `border`, `border-border`
- **Badge Colors**: `success`, `error`, `warning`, `primary`, `info`, `neutral`

All components automatically adapt to your theme configuration.
