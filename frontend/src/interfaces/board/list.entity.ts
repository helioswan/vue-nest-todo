import type { TaskStatus } from '@/enums/task-status.enum'

export interface List {
  title: string
  status: TaskStatus
  color: 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral'
}
