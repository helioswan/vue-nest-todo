<script setup lang="ts"></script>

<template>
  <div class="flex items-center flex-col gap-6 justify-center mt-16">
    <h1 class="text-2xl font-bold mb-2">Page not found</h1>
    <UButton label="Go to home page" :to="{ name: 'home' }"></UButton>
  </div>
</template>
