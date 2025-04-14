<script setup lang="ts">
import type { Board } from '@/interfaces/board/board.entity'
import { formatDate } from '../../utils/date-formatter.util'
import RenameBoardModal from '@/components/board/RenameBoardModal.vue'

const props = defineProps({
  board: { type: Object as () => Board, required: true },
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between flex-wrap">
        <h3 class="text-xl font-bold">{{ props.board.title }}</h3>
        <RenameBoardModal :id="props.board._id" :title="props.board.title" />
      </div>
    </template>
    <p>Created at: {{ formatDate(props.board.createdAt) }}</p>
    <template #footer>
      <div class="flex gap-2 justify-end">
        <UButton icon="i-lucide-eye" :to="{ name: 'board', params: { id: props.board._id } }"
          >View</UButton
        >
        <DeleteBoardModal :id="props.board._id" :title="props.board.title" />
      </div>
    </template>
  </UCard>
</template>
