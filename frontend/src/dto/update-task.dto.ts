import type { TaskStatus } from '@/enums/task-status.enum'

export interface UpdateTaskDto {
  title: string
  description: string
  status: TaskStatus
}
