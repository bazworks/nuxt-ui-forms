export interface DetailFieldDefinition {
  key: string;
  label: string;
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
  align?: "left" | "center" | "right";
  width?: string;
  className?: string;
  format?: (value: unknown) => string;
}

export interface DetailSectionDefinition {
  title?: string;
  description?: string;
  icon?: string;
  fields: DetailFieldDefinition[];
  className?: string;
  columns?: number;
}

export interface DetailSchema {
  item: Record<string, unknown>;
  layout: "vertical" | "horizontal" | "card" | "tabs";
  sections: DetailSectionDefinition[];
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  headerActions?: DetailActionDefinition[];
}

export interface DetailActionDefinition {
  label: string;
  action: string | Function;
  icon?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "neutral";
  size?: "xs" | "sm" | "md" | "lg";
}
