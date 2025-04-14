<script setup lang="ts">
import { type Ref } from 'vue'
import { useTaskStore } from '@/stores/task.store'

const { deleteTask } = useTaskStore()

const open: Ref<boolean | undefined> = defineModel()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

function closeModal() {
  open.value = false
}

async function onSubmit() {
  await deleteTask(props.id)
  closeModal()
}
</script>

<template>
  <UModal v-model:open="open" title="Delete task" :ui="{ footer: 'justify-end' }">
    <template #body>
      This action is irreversible. Are you sure you want to delete this task ?
    </template>

    <template #footer>
      <UButton label="Delete" color="neutral" @click.prevent="onSubmit" />
      <UButton label="Cancel" color="neutral" variant="outline" @click.prevent="closeModal" />
    </template>
  </UModal>
</template>
