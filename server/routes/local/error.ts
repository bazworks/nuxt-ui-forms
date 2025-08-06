export default defineEventHandler((event) => {
  setResponseStatus(event, 400);
  return {
    requestedAt: Date.now(),
  };
});
