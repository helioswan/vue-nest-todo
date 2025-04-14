<script setup lang="ts"></script>

<template>
  <header class="sticky top-0 left-0 w-full border-b dark:bg-slate-900 bg-(--ui-bg)">
    <div class="container py-4 md:px-6 px-5 mx-auto flex justify-between items-center">
      <ULink :to="{ name: 'home' }" class="text-2xl font-bold">Todo App</ULink>
      <AuthBoutons />
    </div>
  </header>
</template>

<style scoped></style>
