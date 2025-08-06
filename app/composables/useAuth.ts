interface LoginResponse {
  access: string;
  refresh: string;
}

interface ApiResponse<T> {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  data: T;
}

export function useAuth<T extends LoginResponse = LoginResponse>() {
  const accessToken = useCookie("access_token");
  const refreshToken = useCookie("refresh_token");
  const ui = useUiStore();
  const { apiFetch } = useApi();

  const login = async (
    loginUrl: string,
    credentials: Record<string, unknown>
  ) => {
    ui.setLoading(true);
    try {
      const { data, error } = await apiFetch<ApiResponse<T>>(loginUrl, {
        method: "POST",
        body: credentials,
      });
      console.log("data", data, error);
      if (data?.data) {
        accessToken.value = data.data.access;
        refreshToken.value = data.data.refresh;
        return true;
      }
    } finally {
      ui.setLoading(false);
    }
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    navigateTo("/examples/login");
  };

  const isAuthenticated = computed(() => !!accessToken.value);

  return { login, logout, isAuthenticated };
}
