<script setup lang="ts">
import * as z from 'zod'
import { reactive, ref } from 'vue'
import { useTaskStore } from '@/stores/task.store'
import { useBoardStore } from '@/stores/board.store'

const { createTask, boardId } = useTaskStore()
const open = ref(false)

const schema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .max(100 , { message: 'Must be 100 or fewer characters long' }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .max(1000, { message: 'Must be 1000 or fewer characters long' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined,
})

function openModal() {
  open.value = true
}

function closeModal() {
  open.value = false
}

async function onSubmit() {
  const result = schema.safeParse(state)

  if (!result.success) {
    return console.log(result.error.formErrors.fieldErrors)
  }

  const { title, description } = result.data
  await createTask({ title, description, boardId })
  state.title = undefined
  state.description = undefined
  closeModal()
}
</script>

<template>
  <UModal v-model:open="open" title="Create board" :ui="{ footer: 'justify-end' }">
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-6">
        <UFormField label="Title" name="title" required>
          <UInput v-model="state.title" placeholder="Name your board" class="block" />
        </UFormField>
        <UFormField label="Description" name="description" required>
          <UTextarea
            v-model="state.description"
            placeholder="Type your description..."
            class="block"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Create" color="neutral" @click.prevent="onSubmit" />
      <UButton label="Cancel" color="neutral" variant="outline" @click.prevent="closeModal" />
    </template>
  </UModal>
  <UButton
    label="Create new task"
    icon="i-lucide-plus"
    @click.prevent="openModal"
    class="w-full"
    size="xl"
    color="primary"
    variant="soft"
  />
</template>
