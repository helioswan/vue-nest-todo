<script setup lang="ts">
import type { Task } from '@/interfaces/board/task.entity'
import UpdateTaskModal from './UpdateTaskModal.vue'
import DeleteTaskModal from './DeleteTaskModal.vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import { ref } from 'vue'

const props = defineProps({
  task: { type: Object as () => Task, required: true },
})

const isUpdateModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

function openUpadteModal() {
  isUpdateModalOpen.value = true
}

function openDeleteModal() {
  isDeleteModalOpen.value = true
}

const items: DropdownMenuItem[][] = [
  [
    {
      label: 'Edit',
      icon: 'i-lucide-pencil',
      onSelect: openUpadteModal,
    },
  ],
  [
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash',
      onSelect: openDeleteModal,
    },
  ],
]
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex gap-4 justify-between">
        <h3 class="text-xl font-bold text-wrap w-full break-all">{{ props.task.title }}</h3>
        <UDropdownMenu
          :items="items"
          :ui="{ content: 'w-48' }"
          :content="{
            align: 'start',
            side: 'right',
            sideOffset: 8,
          }"
        >
          <UButton
            aria-label="Open task actions"
            color="neutral"
            variant="ghost"
            icon="i-lucide-ellipsis-vertical"
          />
        </UDropdownMenu>
        <UpdateTaskModal
          :id="task._id"
          :title="task.title"
          :description="task.description"
          :status="task.status"
          v-model="isUpdateModalOpen"
        />
        <DeleteTaskModal :id="task._id" v-model="isDeleteModalOpen" />
      </div>
    </template>

    <p class="text-wrap break-all">
      {{ props.task.description }}
    </p>
  </UCard>
</template>

<style scoped></style>
