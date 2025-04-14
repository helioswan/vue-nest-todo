import { describe, it, expect } from 'vitest'
import { filterTaskByStatus } from '../utils/filter-task-by-status.util'
import { Task } from '../interfaces/board/task.entity'
import { TaskStatus } from '../enums/task-status.enum'

describe('filterTaskByStatus', () => {
  const mockTasks: Task[] = [
    {
      _id: '1',
      title: 'Task 1',
      status: TaskStatus.TODO,
      description: 'Description 1',
      boardId: '1234',
    },
    {
      _id: '2',
      title: 'Task 2',
      status: TaskStatus.IN_PROGRESS,
      description: 'Description 2',
      boardId: '1234',
    },
    {
      _id: '3',
      title: 'Task 3',
      status: TaskStatus.DONE,
      description: 'Description 3',
      boardId: '1234',
    },
    {
      _id: '4',
      title: 'Task 4',
      status: TaskStatus.TODO,
      description: 'Description 4',
      boardId: '1234',
    },
    {
      _id: '5',
      title: 'Task 5',
      status: TaskStatus.IN_PROGRESS,
      description: 'Description 5',
      boardId: '1234',
    },
  ]

  it('should filter tasks with TODO status', () => {
    const todoTasks = filterTaskByStatus(mockTasks, TaskStatus.TODO)

    expect(todoTasks).toHaveLength(2)
    expect(todoTasks).toEqual([
      {
        _id: '1',
        title: 'Task 1',
        status: TaskStatus.TODO,
        description: 'Description 1',
        boardId: '1234',
      },
      {
        _id: '4',
        title: 'Task 4',
        status: TaskStatus.TODO,
        description: 'Description 4',
        boardId: '1234',
      },
    ])
  })

  it('should filter tasks with IN_PROGRESS status', () => {
    const inProgressTasks = filterTaskByStatus(mockTasks, TaskStatus.IN_PROGRESS)

    expect(inProgressTasks).toHaveLength(2)
    expect(inProgressTasks).toEqual([
      {
        _id: '2',
        title: 'Task 2',
        status: TaskStatus.IN_PROGRESS,
        description: 'Description 2',
        boardId: '1234',
      },
      {
        _id: '5',
        title: 'Task 5',
        status: TaskStatus.IN_PROGRESS,
        description: 'Description 5',
        boardId: '1234',
      },
    ])
  })

  it('should filter tasks with DONE status', () => {
    const doneTasks = filterTaskByStatus(mockTasks, TaskStatus.DONE)

    expect(doneTasks).toHaveLength(1)
    expect(doneTasks).toEqual([
      {
        _id: '3',
        title: 'Task 3',
        status: TaskStatus.DONE,
        description: 'Description 3',
        boardId: '1234',
      },
    ])
  })

  it('should return empty array when tasks array is empty', () => {
    const emptyResult = filterTaskByStatus([], TaskStatus.TODO)

    expect(emptyResult).toHaveLength(0)
    expect(emptyResult).toEqual([])
  })
})
