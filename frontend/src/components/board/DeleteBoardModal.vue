<script setup lang="ts">
import { ref } from 'vue'
import { useBoardStore } from '@/stores/board.store'

const { deleteBoard } = useBoardStore()
const open = ref(false)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

function openModal() {
  open.value = true
}

function closeModal() {
  open.value = false
}

async function onSubmit() {
  await deleteBoard(props.id)
  closeModal()
}
</script>

<template>
  <UModal v-model:open="open" title="Delete board" :ui="{ footer: 'justify-end' }">
    <template #body>
      This action is irreversible. Are you sure you want to delete this board ?
    </template>

    <template #footer>
      <UButton label="Delete" color="neutral" @click.prevent="onSubmit" />
      <UButton label="Cancel" color="neutral" variant="outline" @click.prevent="closeModal" />
    </template>
  </UModal>
  <UButton icon="i-lucide-trash-2" @click.prevent="openModal" color="error">Delete</UButton>
</template>
