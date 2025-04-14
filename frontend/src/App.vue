<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from '@/components/layout/BaseHeader.vue'
</script>

<template>
  <UApp>
    <main class="min-h-screen">
      <BaseHeader />
      <RouterView />
    </main>
  </UApp>
</template>
