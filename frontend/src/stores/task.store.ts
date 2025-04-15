import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Task } from '@/interfaces/board/task.entity'
import type { CreateTaskDto } from '@/dto/create-task.dto'
import TaskService from '@/services/task.service'
import type { UpdateTaskDto } from '@/dto/update-task.dto'

export const useTaskStore = defineStore(
  'task',
  () => {
    const toast = useToast()
    const tasks: Ref<Task[]> = ref([])
    const boardId = ref('')

    async function fetchTasks() {
      try {
        const res = await TaskService.getTasksByBoardId(boardId.value)
        tasks.value = res.data.data
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Failed to load tasks',
            description: 'An error occurred while fetching the tasks. Please try again.',
            color: 'error',
          })
        }
      }
    }

    async function createTask(createTaskDto: CreateTaskDto) {
      try {
        await TaskService.createTask(createTaskDto)
        toast.add({
          title: 'Task created',
          description: 'Your task has been successfully created.',
          color: 'success',
        })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Task creation failed',
            description: 'An error occurred while creating your task. Please try again.',
            color: 'error',
          })
        }
      }
      fetchTasks()
    }

    async function updateTask(updateTaskDto: UpdateTaskDto, taskId: string) {
      try {
        await TaskService.updateTask(updateTaskDto, taskId)
        toast.add({
          title: 'Task modified',
          description: 'Your task has been successfully modified.',
          color: 'success',
        })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Task rename failed',
            description: 'An error occurred while renaming your task. Please try again.',
            color: 'error',
          })
        }
      }
      fetchTasks()
    }

    async function deleteTask(taskId: string) {
      try {
        await TaskService.deleteTask(taskId)
        toast.add({
          title: 'Tasl deleted',
          description: 'Your task has been successfully deleted.',
          color: 'success',
        })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Task delete failed',
            description: 'An error occurred while deleting your task. Please try again.',
            color: 'error',
          })
        }
      }
      fetchTasks()
    }

    function setBoardId(new_id: string) {
      boardId.value = new_id
    }

    return { fetchTasks, deleteTask, updateTask, createTask, tasks, boardId , setBoardId }
  },
  { persist: true },
)
