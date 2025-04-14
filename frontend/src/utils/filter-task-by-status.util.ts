import type { TaskStatus } from '@/enums/task-status.enum'
import type { Task } from '@/interfaces/board/task.entity'

export function filterTaskByStatus(tasks: Task[], status: TaskStatus) {
  return tasks.filter((task) => task.status === status)
}
