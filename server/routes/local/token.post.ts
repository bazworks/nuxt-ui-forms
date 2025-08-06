export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (email === "test@example.com" && password === "test123") {
    return {
      success: true,
      data: {
        access: "mocked_access_token",
        refresh: "mocked_refresh_token",
      },
      message: "Login successful",
    };
  }

  return {
    success: false,
    message: "Login failed",
    errors: ["Invalid credentials"],
  };
});
