<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useBoardStore } from '@/stores/board.store'
import { useTaskStore } from '@/stores/task.store'
import { useRoute } from 'vue-router'
import { TaskStatus } from '@/enums/task-status.enum'
import TaskList from '@/components/board/task/TaskList.vue'
import type { List } from '@/interfaces/board/list.entity'
import CreateTaskModal from '@/components/board/task/CreateTaskModal.vue'
import TaskCard from '@/components/board/task/TaskCard.vue'
import { filterTaskByStatus } from '@/utils/filter-task-by-status.util'
import type { Task } from '@/interfaces/board/task.entity'

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const route = useRoute()

const lists: List[] = [
  { title: 'To do', status: TaskStatus.TODO, color: 'info' },
  { title: 'In progress', status: TaskStatus.IN_PROGRESS, color: 'warning' },
  { title: 'Done', status: TaskStatus.DONE, color: 'success' },
]

const tasks = reactive({
  'To do': [] as Task[],
  'In progress': [] as Task[],
  Done: [] as Task[],
})

function filterTasks() {
  if (taskStore.tasks) {
    tasks['To do'] = filterTaskByStatus(taskStore.tasks, TaskStatus.TODO)
    tasks['In progress'] = filterTaskByStatus(taskStore.tasks, TaskStatus.IN_PROGRESS)
    tasks['Done'] = filterTaskByStatus(taskStore.tasks, TaskStatus.DONE)
  }
}

onMounted(() => {
  boardStore.fetchBoard(route.params.id as string)
  taskStore.fetchTasks()
  filterTasks()
})
</script>

<template>
  <div class="container mx-auto md:px-6 px-5 my-16">
    <section>
      <div class="flex gap-4 items-center mb-12">
        <UButton
          aria-label="Go back"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          :to="{ name: 'home' }"
        />
        <h1 class="text-2xl font-bold">{{ boardStore.board?.title }}</h1>
      </div>
      <ul class="flex gap-8 overflow-x-auto">
        <li v-for="(list, listIndex) in lists" class="md:min-w-96 min-w-72" :key="listIndex">
          <TaskList :title="list.title" :color="list.color">
            <li v-for="(task, taskIndex) in tasks[list.status]" :key="taskIndex">
              <TaskCard :task />
            </li>
            <li v-if="list.status === TaskStatus.TODO">
              <CreateTaskModal />
            </li>
          </TaskList>
        </li>
      </ul>
    </section>
  </div>
</template>
