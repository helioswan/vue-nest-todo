<template>
  <UCard>
    <template #header>
      <h3 class="text-xl font-bold">{{ props.board.title }}</h3>
    </template>
    <p>Created at: {{ formatDate(props.board.createdAt) }}</p>
    <p>Updated at: {{ formatDate(props.board.updatedAt) }}</p>
    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton icon="i-lucide-eye" :to="{ name: 'board', params: { id: props.board._id } }"
          >View</UButton
        >
        <RenameBoardModal :id="props.board._id" :title="props.board.title" />
        <DeleteBoardModal :id="props.board._id" :title="props.board.title" />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Board } from '@/interfaces/board/board.entity'
import { formatDate } from '../../utils/date-formatter'
import RenameBoardModal from '@/components/board/RenameBoardModal.vue'

const props = defineProps({
  board: { type: Object as () => Board, required: true },
})
</script>
