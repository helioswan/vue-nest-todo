<script setup lang="ts">
import * as z from 'zod'
import { reactive, ref } from 'vue'
import { useBoardStore } from '@/stores/board.store'

const { createBoard } = useBoardStore()
const open = ref(false)

const schema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
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

  const { title } = result.data
  await createBoard({ title })
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
      </UForm>
    </template>

    <template #footer>
      <UButton label="Create" color="neutral" @click.prevent="onSubmit" />
      <UButton label="Cancel" color="neutral" variant="outline" @click.prevent="closeModal" />
    </template>
  </UModal>
  <UButton label="Create" icon="i-lucide-plus" @click.prevent="openModal" />
</template>
