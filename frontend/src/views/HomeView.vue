<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import BoardCard from '@/components/board/BoardCard.vue'
import CreateBoardModal from '@/components/board/CreateBoardModal.vue'
import { useBoardStore } from '@/stores/board.store'

const { user } = useAuthStore()
const boardStore = useBoardStore()

onMounted(() => {
  boardStore.fetchBoards()
})
</script>

<template>
  <div class="container mx-auto md:px-6 px-5 my-16">
    <h1 class="text-2xl font-bold mb-12 text-wrap break-all">Welcome {{ user?.username }}!</h1>
    <section>
      <div class="flex justify-between flex-wrap border-b mb-10 pb-4">
        <h2 class="text-xl font-bold">Your boards</h2>
        <CreateBoardModal />
      </div>
      <ul
        class="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
        v-if="boardStore.boards && boardStore.boards.length > 0"
      >
        <li v-for="(board, index) in boardStore.boards" :key="index">
          <BoardCard :board />
        </li>
      </ul>
      <p class="text-lg text-center" v-else>No board found</p>
    </section>
  </div>
</template>
