# Schema Form Components

A simple and flexible form generation system using Nuxt UI components. This system allows you to create dynamic forms based on field definitions and layout schemas.

## Components

- **`SimpleSchemaForm.vue`** - Main form component that orchestrates everything
- **`FieldRenderer.vue`** - Renders individual form fields based on their type
- **`LayoutRenderer.vue`** - Handles form layouts (horizontal, vertical, grid)

## Quick Start

### 1. Basic Form Setup

```vue
<script setup lang="ts">
import { z } from "zod";
import { reactive, computed } from "vue";

// Define your Zod validator
const validator = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  age: z.coerce.number().int().min(0).max(120).optional(),
  newsletter: z.boolean().optional(),
  role: z.enum(["admin", "editor", "viewer"]).optional(),
});

// Create your form model
const model = reactive({
  name: "",
  email: "",
  age: undefined,
  newsletter: false,
  role: undefined,
});

// Define form props for UForm
const formProps = computed(() => ({
  state: model,
  schema: validator,
  class: "gap-4", // Optional: customize spacing for all layouts
}));

// Define your fields
const formFields = computed(() => [
  {
    name: "name",
    type: "Input",
    fieldProps: { name: "name", label: "Full name" },
    inputProps: { type: "text", placeholder: "Enter your name" },
  },
  {
    name: "email",
    type: "Input",
    fieldProps: { name: "email", label: "Email address" },
    inputProps: { type: "email", placeholder: "Enter your email" },
  },
  {
    name: "age",
    type: "Input",
    fieldProps: { name: "age", label: "Age" },
    inputProps: { type: "number", placeholder: "Enter your age" },
  },
  {
    name: "newsletter",
    type: "Switch",
    fieldProps: { name: "newsletter", label: "Subscribe to newsletter" },
    inputProps: {},
  },
  {
    name: "role",
    type: "Select",
    fieldProps: { name: "role", label: "User Role" },
    inputProps: {
      items: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
  },
]);

// Handle form events
function onSubmit(event: { data: Record<string, unknown> }) {
  console.log("Form submitted:", event.data);
}

function onError(event: unknown) {
  console.log("Form errors:", event);
}
</script>

<template>
  <SchemaFormSimpleSchemaForm
    :form-props="formProps"
    :fields="formFields"
    @submit="onSubmit"
    @error="onError"
  />
</template>
```

### 2. Adding Layouts

You can add custom layouts using the `ui-schema` prop:

```vue
<script setup lang="ts">
// ... previous setup code ...

// Define layout configurations
const layoutConfigs = [
  {
    title: "Default Layout (Vertical)",
    description: "All fields stacked vertically",
    uiSchema: undefined, // No UI schema = default vertical layout
  },
  {
    title: "Horizontal Layout",
    description: "Name and email side by side",
    uiSchema: {
      layout: {
        type: "vertical",
        fields: [
          {
            type: "horizontal",
            fields: ["name", "email"],
          },
          "age",
          "newsletter",
          "role",
        ],
      },
    },
  },
  {
    title: "Grid Layout",
    description: "Two-column grid layout",
    uiSchema: {
      layout: {
        type: "grid",
        columns: 2,
        fields: ["name", "email", "age", "role", "newsletter"],
        className: "items-start",
      },
    },
  },
  {
    title: "Mixed Layout",
    description: "Complex nested layout",
    uiSchema: {
      layout: {
        type: "vertical",
        fields: [
          {
            type: "horizontal",
            fields: ["name", "age"],
          },
          "email",
          {
            type: "horizontal",
            fields: ["role", "newsletter"],
            className: "items-center",
          },
        ],
      },
    },
  },
];
</script>

<template>
  <SchemaFormSimpleSchemaForm
    :form-props="formProps"
    :fields="formFields"
    :ui-schema="selectedLayout.uiSchema"
    @submit="onSubmit"
    @error="onError"
  />
</template>
```

## API Reference

### SimpleSchemaForm Props

| Prop        | Type                      | Required | Description                                         |
| ----------- | ------------------------- | -------- | --------------------------------------------------- |
| `formProps` | `Record<string, unknown>` | ✅       | All props for UForm (state, schema, validate, etc.) |
| `fields`    | `FieldDefinition[]`       | ✅       | Array of field definitions                          |
| `uiSchema`  | `UISchema \| undefined`   | ❌       | UI schema for layout configuration                  |

### FieldDefinition Interface

```typescript
interface FieldDefinition {
  name: string; // Field name (must match model property)
  type: string; // Component type (without 'U' prefix)
  fieldProps: Record<string, unknown>; // Props for UFormField
  inputProps: Record<string, unknown>; // Props for the input component
}
```

### UISchema Interface

```typescript
interface UISchema {
  layout?: LayoutGroup;
}

interface LayoutGroup {
  type: string; // "horizontal", "vertical", or "grid"
  fields: (string | LayoutGroup)[]; // Field names or nested groups
  props?: Record<string, unknown>; // Additional props for container
  className?: string; // Custom CSS classes
  columns?: number; // For grid layout
}
```

## Supported Component Types

### Form Input Components

- `"Input"` - UInput component
- `"Select"` - USelect component
- `"Textarea"` - UTextarea component
- `"Checkbox"` - UCheckbox component
- `"RadioGroup"` - URadioGroup component
- `"Switch"` - USwitch component
- `"Button"` - UButton component

### Display Components

- `"Badge"` - UBadge component
- `"Avatar"` - UAvatar component
- `"Icon"` - UIcon component

### Layout Components

- `"Card"` - UCard component

### Feedback Components

- `"Progress"` - UProgress component
- `"Alert"` - UAlert component

### Navigation & Interactive Components

- `"Tabs"` - UTabs component
- `"Accordion"` - UAccordion component
- `"Table"` - UTable component
- `"Modal"` - UModal component

## Layout Types

### 1. Vertical Layout

```typescript
{
  type: "vertical",
  fields: ["name", "email", "age", "role"]
}
```

### 2. Horizontal Layout

```typescript
{
  type: "horizontal",
  fields: ["name", "email"]
}
```

### 3. Grid Layout

```typescript
{
  type: "grid",
  columns: 2,
  fields: ["name", "email", "age", "role"]
}
```

### 4. Nested Layouts

```typescript
{
  type: "vertical",
  fields: [
    {
      type: "horizontal",
      fields: ["name", "email"]
    },
    "age",
    {
      type: "horizontal",
      fields: ["role", "newsletter"]
    }
  ]
}
```

## Best Practices

### 1. Field Naming

- Use descriptive field names that match your model properties
- Keep names consistent between your Zod schema, model, and field definitions

### 2. Spacing Strategy

- **Consistent Spacing**: Use the same gap classes across your application for consistency
- **Layout Flexibility**: Gap classes work across all layout types (vertical, horizontal, grid, mixed)
- **Responsive Design**: Consider using responsive gap classes for different screen sizes
- **Directional Control**: Use `gap-x-*` and `gap-y-*` for fine-tuned spacing control

### 3. Component Types

- Use the component name without the 'U' prefix (e.g., `"Input"` not `"UInput"`)
- Check the supported component types list above

### 4. Props Structure

- `fieldProps` are passed to `UFormField` (label, name, etc.)
- `inputProps` are passed to the actual input component (placeholder, type, etc.)

### 5. Layout Design

- Use horizontal layouts sparingly - they can become cramped on mobile
- Grid layouts work well for forms with many fields
- Consider using nested layouts for complex forms

### 5. Spacing Control

Control spacing between form fields using the `class` prop in `formProps`:

#### **Gap Classes for Different Layouts:**

```typescript
// Uniform spacing (works for all layouts)
class: "gap-4"        // 1rem gap in all directions
class: "gap-6"        // 1.5rem gap in all directions
class: "gap-8"        // 2rem gap in all directions

// Directional spacing (for grid and mixed layouts)
class: "gap-x-4 gap-y-2"    // 1rem horizontal, 0.5rem vertical
class: "gap-x-8 gap-y-4"    // 2rem horizontal, 1rem vertical
class: "gap-x-6 gap-y-3"    // 1.5rem horizontal, 0.75rem vertical

// Responsive spacing
class: "gap-2 md:gap-4 lg:gap-6"  // Responsive gaps
```

#### **Layout-Specific Recommendations:**

- **Vertical Layout**: Use `gap-2`, `gap-4`, or `gap-6` for consistent spacing
- **Horizontal Layout**: Use `gap-4` or `gap-6` for side-by-side fields
- **Grid Layout**: Use `gap-x-6 gap-y-4` for different horizontal/vertical spacing
- **Mixed Layout**: Use `gap-x-8 gap-y-4` for complex nested layouts

#### **Examples:**

```typescript
// Compact form
const formProps = computed(() => ({
  state: model,
  schema: validator,
  class: "gap-2",
}));

// Standard form
const formProps = computed(() => ({
  state: model,
  schema: validator,
  class: "gap-4",
}));

// Spacious form with directional control
const formProps = computed(() => ({
  state: model,
  schema: validator,
  class: "gap-x-8 gap-y-4",
}));
```

### 6. Validation

- Use Zod for schema validation
- `UForm` uses sensible defaults for validation timing
- Handle form errors in the `@error` event

## Examples

### Basic Contact Form

```typescript
const formFields = [
  {
    name: "firstName",
    type: "Input",
    fieldProps: { name: "firstName", label: "First Name" },
    inputProps: { type: "text", placeholder: "Enter first name" },
  },
  {
    name: "lastName",
    type: "Input",
    fieldProps: { name: "lastName", label: "Last Name" },
    inputProps: { type: "text", placeholder: "Enter last name" },
  },
  {
    name: "email",
    type: "Input",
    fieldProps: { name: "email", label: "Email" },
    inputProps: { type: "email", placeholder: "Enter email" },
  },
  {
    name: "message",
    type: "Textarea",
    fieldProps: { name: "message", label: "Message" },
    inputProps: { placeholder: "Enter your message", rows: 4 },
  },
];
```

### Settings Form with Layout

```typescript
// Form configuration with custom spacing
const formProps = computed(() => ({
  state: model,
  schema: validator,
  class: "gap-x-6 gap-y-4", // Different horizontal/vertical spacing
}));

const settingsLayout = {
  type: "vertical",
  fields: [
    {
      type: "horizontal",
      fields: ["firstName", "lastName"],
    },
    "email",
    {
      type: "horizontal",
      fields: ["theme", "notifications"],
    },
  ],
};
```

## Troubleshooting

### Common Issues

1. **Field not rendering**: Check that the field name exists in your `formFields` array
2. **Component not found**: Verify the component type is in the supported list
3. **Layout not working**: Ensure field names in layout match those in `formFields`
4. **Validation errors**: Check your Zod schema and formProps configuration

### Debug Tips

- Check the browser console for any errors
- Verify that all field names match between your model, schema, and field definitions
- Ensure your Zod schema matches your field structure

## Migration from Complex Schema Form

If you're migrating from the old complex schema form:

1. Replace JSON Schema with Zod validators
2. Convert widget definitions to field definitions
3. Use the new layout system instead of UI schema elements
4. Update component references to use the new naming convention

The new system is much simpler and more maintainable while providing the same flexibility.
