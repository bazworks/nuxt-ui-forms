// composables/useApiClient.ts

interface ApiResponse<T> {
  data: T | null;
  error: any | null;
}

export function useApi() {
  const config = useRuntimeConfig();
  const token = useCookie("access_token");
  const { showErrorToast } = useErrorFormatter();

  const isBackendError = (error: any): boolean => {
    return (
      error?.data && typeof error.data === "object" && "detail" in error.data
    );
  };

  const handleNonBackendError = (error: any) => {
    const message = error?.message || "An unexpected error occurred";
    if (import.meta.client) {
      try {
        useToast().add({
          title: "Error",
          description: message,
          color: "error",
        });
      } catch (e) {
        console.error("Failed to show toast:", e);
      }
    } else {
      console.error("Error:", message);
    }
  };

  async function apiFetch<T = unknown>(
    url: string,
    options: Parameters<typeof $fetch<T>>[1] = {}
  ): Promise<ApiResponse<T>> {
    const headers = {
      ...((options.headers as Record<string, string>) || {}),
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    };

    try {
      const response = await $fetch<T>(url, {
        ...options,
        headers,
        baseURL: config.public.API_BASE_URL,
      });
      return { data: response as T, error: null };
    } catch (error: any) {
      if (isBackendError(error)) {
        showErrorToast(error?.data);
      } else {
        handleNonBackendError(error);
      }
      return { data: null, error };
    }
  }

  function apiUseFetch<T = unknown>(
    url: string,
    options: Parameters<typeof useFetch<T>>[1] = {}
  ) {
    const headers = {
      ...((options.headers as Record<string, string>) || {}),
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    };

    return useFetch<T>(url, {
      ...options,
      headers,
      baseURL: config.public.API_BASE_URL,
      onResponseError({ response }) {
        if (isBackendError(response._data)) {
          showErrorToast(response._data);
        } else {
          handleNonBackendError(response._data);
        }
      },
    });
  }

  return {
    apiFetch,
    apiUseFetch,
  };
}
