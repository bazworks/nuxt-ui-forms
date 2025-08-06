<template>
  <Suspense>
    <template #default>
      <div class="flex flex-col gap-8 p-8">
        <h1 class="text-2xl font-bold">Minimal Dashboard</h1>
        <div class="p-4 mb-2">Logged In: {{ useAuth().isAuthenticated }}</div>

        <div v-if="profileData">
          <h2 class="text-lg font-semibold">Profile</h2>
          <pre>{{ profileData }}</pre>
        </div>

        <div class="mt-4">
          <UButton @click="logout">Logout</UButton>
        </div>
      </div>
    </template>
    <template #fallback>
      <div class="p-8">Loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
interface ProfileData {
  id: number;
  name: string;
  // add other profile fields as needed
}

const { apiUseFetch } = useApi();

const { data: profileData } = await apiUseFetch<ProfileData>("/local/profile/");

const logout = () => {
  useAuth().logout();
};
</script>
