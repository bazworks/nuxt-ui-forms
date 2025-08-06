export default defineEventHandler((event) => {
  const token = getHeader(event, "Authorization");
  console.log("token: in server profile.get", token);
  if (!token?.includes("mocked_access_token")) {
    return {
      success: false,
      errors: ["Unauthorized"],
      message: "Invalid or missing token",
    };
  }
  return {
    success: true,
    data: {
      name: "Mock User",
      email: "test@example.com",
    },
    message: "Profile fetched",
  };
});
