<template>
  <div class="relative h-full w-full text-neutral-400">
    <!-- desktop sidebar -->
    <div class="hidden h-full w-[256px] flex-col lg:flex">
      <div class="h-full w-full">
        <SidebarMenu />
      </div>
    </div>

    <!-- mobile sidebar overlay-->
    <aside
      class="fixed left-0 top-[64px] z-[999] flex h-[calc(100vh-64px)] w-[256px] transform flex-col bg-neutral-50 transition-transform duration-500 ease-in-out lg:hidden"
      :class="{
        '-translate-x-full': !sidebarState,
        'translate-x-0': sidebarState,
      }"
    >
      <div class="h-full w-full p-4">
        <SidebarMenu />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const sidebarState = useState("sidebarState", () => false);
</script>

<style></style>
