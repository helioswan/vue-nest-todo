<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layout/BaseHeader.vue'
</script>

<template>
  <UApp>
    <main class="min-h-screen">
      <Header />
      <RouterView />
    </main>
  </UApp>
</template>
