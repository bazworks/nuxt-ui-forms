// List view schema interfaces
export interface ListFieldDefinition {
  key: string; // Data field key
  label?: string; // Optional label
  align?: "left" | "center" | "right";
  width?: string; // CSS width
  className?: string;
}

export interface ActionDefinition {
  label: string;
  action: string | Function;
  icon?: string;
  variant?: "primary" | "secondary" | "error";
}

export interface ListSchema {
  // Data (user provides)
  items: Record<string, unknown>[];

  // Layout configuration
  layout: "grid" | "flex" | "table";
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
