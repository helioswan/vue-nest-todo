import type { CreateBoardDto } from '@/dto/create-board.dto'
import type { UpdateTaskDto } from '@/dto/update-task.dto'
import api from './api.service'

async function getTasksByBoardId(id: string) {
  return await api.get(`/boards/${id}/tasks`)
}

async function createTask(createBoardDto: CreateBoardDto) {
  return await api.post('/tasks', createBoardDto)
}

async function updateTask(updateTaskDto: UpdateTaskDto, id: string) {
  return await api.put(`/tasks/${id}`, updateTaskDto)
}

async function deleteTask(id: string) {
  return await api.delete(`/tasks/${id}`)
}

export default { getTasksByBoardId, createTask, updateTask, deleteTask }
