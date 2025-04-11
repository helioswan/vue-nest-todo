<template>
  <header
    class="sticky top-0 left-0 w-full border-b py-4 md:px-6 px-5 dark:bg-slate-900 bg-(--ui-bg)"
  >
    <div class="container mx-auto flex justify-between items-center">
      <ULink :to="{ name: 'home' }" class="text-2xl font-bold">Todo App</ULink>
      <AuthBoutons />
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
