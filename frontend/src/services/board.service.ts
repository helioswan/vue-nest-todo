import type { CreateBoardDto } from '@/dto/create-board.dto'
import type { RenameBoardDto } from '@/dto/rename-board.dto'
import api from './api.service'

async function getBoards() {
  return await api.get('/boards')
}

async function getBoard(id: string) {
  return await api.get(`/boards/${id}`)
}

async function createBoard(createBoardDto: CreateBoardDto) {
  return await api.post('/boards', createBoardDto)
}

async function renameBoard(renameBoardDto: RenameBoardDto, id: string) {
  return await api.put(`/boards/${id}`, renameBoardDto)
}

async function deleteBoard(id: string) {
  return await api.delete(`/boards/${id}`)
}

export default { getBoards, createBoard, renameBoard, deleteBoard, getBoard }
