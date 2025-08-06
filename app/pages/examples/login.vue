<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md p-8 flex flex-col gap-4">
      <div class="text-center p-4">
        <h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
      </div>

      <div class="flex flex-col gap-4">
        <UInput
          v-model="email"
          type="text"
          placeholder="Email"
          icon="i-heroicons-envelope"
          class="w-full"
        />

        <UInput
          v-model="password"
          type="password"
          placeholder="Password"
          icon="i-heroicons-lock-closed"
          class="w-full"
        />

        <div class="flex items-center justify-end">
          <UButton variant="link" color="gray" class="text-sm">
            Forgot password?
          </UButton>
        </div>

        <UButton
          block
          color="primary"
          class="w-full"
          @click="submit"
          @keydown.enter="submit"
        >
          Sign in
        </UButton>
      </div>

      <p class="text-center text-sm text-gray-600">
        Don't have an account?
        <UButton variant="link" color="primary" class="text-sm">
          Sign up
        </UButton>
      </p>
    </UCard>
  </div>
</template>
<script setup>
definePageMeta({ public: true });
const email = ref("");
const password = ref("");
const { login } = useAuth();

const submit = async () => {
  const success = await login("/local/token/", {
    email: email.value,
    password: password.value,
  });
  if (success) navigateTo("/examples");
};
</script>
