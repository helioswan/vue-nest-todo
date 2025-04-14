import type { TaskStatus } from '@/enums/task-status.enum'

export interface Task {
  _id: string
  title: string
  description: string
  boardId: string
  status: TaskStatus
}
