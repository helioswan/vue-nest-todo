<template>
  <div>
    <div class="flex flex-wrap gap-4" v-if="authStore.isAuthenticated">
      <UButton label="Log out" size="xl" class="font-bold" />
    </div>
    <div class="flex flex-wrap gap-4" v-else>
      <UButton label="Sign in" size="xl" class="font-bold" />
      <UButton label="Sign up" size="xl" color="neutral" class="font-bold" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
</script>

<style scoped></style>
