<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-4" v-if="authStore.isAuthenticated">
      <UButton
        icon="i-lucide-log-out"
        variant="ghost"
        color="neutral"
        aria-label="log out"
        @click.prevent="authStore.logout"
        size="xl"
        class="font-bold"
        :to="{ name: 'home' }"
      />
    </div>
    <div class="flex flex-wrap gap-4" v-else>
      <UButton label="Sign in" size="xl" class="font-bold" :to="{ name: 'signin' }" />
      <UButton
        label="Sign up"
        size="xl"
        color="neutral"
        class="font-bold"
        :to="{ name: 'signup' }"
      />
    </div>
  </div>
</template>

<style scoped></style>
