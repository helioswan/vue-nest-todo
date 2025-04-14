<script setup lang="ts">
import * as z from 'zod'
import { reactive, type Ref } from 'vue'
import { useTaskStore } from '@/stores/task.store'
import { TaskStatus } from '@/enums/task-status.enum'

const { updateTask } = useTaskStore()

const open: Ref<boolean | undefined> = defineModel()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const schema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .max(100, { message: 'Must be 100 or fewer characters long' }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .max(1000, { message: 'Must be 1000 or fewer characters long' }),
  status: z.nativeEnum(TaskStatus),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: props.title,
  description: props.title,
  status: props.status as TaskStatus,
})

function closeModal() {
  open.value = false
}

async function onSubmit() {
  const result = schema.safeParse(state)

  if (!result.success) {
    return console.log(result.error.formErrors.fieldErrors)
  }

  const { title, description, status } = result.data
  await updateTask(
    {
      title,
      description,
      status: status,
    },
    props.id,
  )
  closeModal()
}
</script>

<template>
  <UModal v-model:open="open" title="Edit task" :ui="{ footer: 'justify-end' }">
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-6">
        <UFormField label="Title" name="title" required>
          <UInput v-model="state.title" placeholder="Rename your task" class="block" />
        </UFormField>
        <UFormField label="Description" name="description" required>
          <UTextarea
            v-model="state.description"
            placeholder="Type your description..."
            class="block"
          />
        </UFormField>
        <UFormField label="Task status" name="status" required>
          <USelectMenu
            v-model="state.status"
            :items="['To do', 'In progress', 'Done']"
            class="w-48"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton label="Edit" color="neutral" @click.prevent="onSubmit" />
      <UButton label="Cancel" color="neutral" variant="outline" @click.prevent="closeModal" />
    </template>
  </UModal>
</template>
