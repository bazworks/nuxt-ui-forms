export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie("access_token");
  const isPublic = to.meta.public === true;
  if (!accessToken.value && !isPublic) {
    return navigateTo("/examples/login");
  }
});
