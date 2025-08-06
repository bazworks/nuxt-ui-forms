<template>
  <div class="container">
    <div v-if="pending">Loading...</div>
    <template v-else>
      <h1>Testing api plugin</h1>
      <UButton :loading="isLoading" @click="testApi">Test API</UButton>
      <div v-if="data">
        <pre>{{ data }}</pre>
      </div>
      <div v-if="error">
        <p>Error:</p>
        <pre>statusCode: {{ error.statusCode }}</pre>
        <pre>message: {{ error.message }}</pre>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { apiFetch, apiUseFetch } = useApi();

const isLoading = ref(false);
async function testApi() {
  data.value = undefined;
  error.value = undefined;
  isLoading.value = true;
  try {
    const response = await apiFetch("/auth/login/otp/", {
      method: "POST",
    });
    data.value = response;
    isLoading.value = false;
  } catch (err: any) {
    console.error(err.data);
    isLoading.value = false;
    error.value = err;
  }
}

const { pending, data, error } = apiUseFetch("/auth/login/otp/", {
  method: "POST",
  lazy: true,
});

console.log("responseData", data);
</script>
