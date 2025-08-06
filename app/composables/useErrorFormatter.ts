interface DRFErrorResponse {
  [key: string]: string | string[] | DRFErrorResponse;
}

export function useErrorFormatter() {
  const formatError = (error: unknown): string[] => {
    // Handle string errors
    if (typeof error === "string") {
      return [error];
    }

    // Handle null/undefined
    if (!error) {
      return ["An unexpected error occurred"];
    }

    // Handle DRF error response object
    if (typeof error === "object") {
      const messages: string[] = [];
      const processErrorObject = (obj: DRFErrorResponse, prefix = "") => {
        Object.entries(obj).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Handle array of error messages
            value.forEach((msg) => {
              const fieldName = key === "non_field_errors" ? "" : `${key}: `;
              messages.push(`${prefix}${fieldName}${msg}`);
            });
          } else if (typeof value === "object" && value !== null) {
            // Handle nested objects
            const newPrefix = prefix ? `${prefix}${key}.` : `${key}.`;
            processErrorObject(value as DRFErrorResponse, newPrefix);
          } else if (typeof value === "string") {
            // Handle single string messages
            const fieldName = key === "non_field_errors" ? "" : `${key}: `;
            messages.push(`${prefix}${fieldName}${value}`);
          }
        });
      };

      processErrorObject(error as DRFErrorResponse);
      return messages;
    }

    // Fallback for unknown error types
    return ["An unexpected error occurred"];
  };

  const showErrorToast = (error: unknown) => {
    if (import.meta.client) {
      const messages = formatError(error);
      messages.forEach((message) => {
        useToast().add({
          title: "Error",
          description: message,
          color: "error",
        });
      });
    }
  };

  return {
    formatError,
    showErrorToast,
  };
}
