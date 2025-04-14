<script setup lang="ts">
const props = defineProps<{
  title: string
  color: 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral'
}>()
</script>

<template>
  <div>
    <div class="flex gap-4 p-4 mb-4">
      <UChip standalone inset :color="props.color" class="my-auto" />
      <h2 class="text-xl font-medium">{{ props.title }}</h2>
    </div>
    <ul class="dark:bg-slate-700 bg-slate-300 rounded-xl p-4 flex flex-col gap-4">
      <slot />
    </ul>
  </div>
</template>

<style scoped></style>
