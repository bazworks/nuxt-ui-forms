<template>
  <ClientOnly>
    <UContainer class="flex h-full flex-col">
      <div class="grow overflow-y-auto">
        <div class="grid gap-2">
          <template v-for="group in menuGroups" :key="group.name">
            <div
              class="flex cursor-pointer select-none items-center text-sm font-semibold text-gray-500"
              @click="toggleGroup(group.name)"
            >
              <Icon
                :name="
                  isGroupCollapsed(group.name)
                    ? 'mdi-chevron-right'
                    : 'mdi-chevron-down'
                "
                size="20"
                class="mr-1"
              />
              {{ group.name }}
            </div>
            <div v-show="!isGroupCollapsed(group.name)">
              <NuxtLink
                v-for="item in group.items"
                :key="item.title"
                :to="getItemUrl(item.to)"
                class="flex cursor-pointer items-center gap-2 rounded py-1 pl-2 transition hover:bg-primary/50"
                :class="{
                  'bg-primary/50 text-white': isActive(getItemUrl(item.to)),
                }"
                @click="closeSidebar"
              >
                <Icon size="20" :name="item.icon" />
                {{ item.title }}
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
      <!-- User Info Section at the bottom -->
      <div class="mt-2 border-t border-gray-200 px-4 py-3">
        <div v-if="auth.userName" class="text-base font-semibold text-gray-800">
          {{ auth.userName }}
        </div>
        <div v-if="auth.userType" class="text-xs capitalize text-gray-500">
          {{ auth.userType }} &middot; {{ auth.roleName }}
        </div>
      </div>
    </UContainer>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import menuConfig from "./menuConfig.json";

const route = useRoute();
const auth = useAuthStore();

interface MenuItem {
  title: string;
  icon: string;
  to: string;
  permission: string;
}

interface MenuGroup {
  name: string;
  items: MenuItem[];
}

const menuGroups = [
  {
    name: "Dashboard",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    name: "Users",
    icon: "i-heroicons-user",
    to: "/users",
  },
  {
    name: "Settings",
    icon: "i-heroicons-cog-6-tooth",
    to: "/settings",
  },
];

// Use ref instead of useState for client-side only state
const sidebarState = useState("sidebarState", () => false);
const collapsedGroups = ref<Set<string>>(new Set());

// Group collapse helpers
function isGroupCollapsed(name: string): boolean {
  return collapsedGroups.value.has(name);
}

function toggleGroup(name: string) {
  if (collapsedGroups.value.has(name)) {
    collapsedGroups.value.delete(name);
  } else {
    collapsedGroups.value.add(name);
  }
}

// Sidebar helpers
function closeSidebar() {
  sidebarState.value = false;
}

// Active route helper
function isActive(path: string) {
  if (path === "/") return route.path === path;
  return route.path.startsWith(path);
}
</script>

<style scoped></style>
