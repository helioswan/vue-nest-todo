import BoardService from '@/services/board.service'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import type { CreateBoardDto } from '@/dto/create-board.dto'
import type { RenameBoardDto } from '@/dto/rename-board.dto'
import type { Board } from '@/interfaces/board/board.entity'
import { ref, type Ref } from 'vue'

export const useBoardStore = defineStore(
  'board',
  () => {
    const toast = useToast()
    const boards: Ref<Board[] | undefined> = ref()
    const board: Ref<Board | undefined> = ref()

    async function fetchBoards() {
      try {
        const res = await BoardService.getBoards()
        boards.value = res.data.data
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Failed to load boards',
            description: 'An error occurred while fetching the boards. Please try again.',
            color: 'error',
          })
        }
      }
    }

    async function fetchBoard(id: string) {
      try {
        const res = await BoardService.getBoard(id)
        board.value = res.data.data
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Failed to load board',
            description: 'An error occurred while fetching the board. Please try again.',
            color: 'error',
          })
        }
      }
    }

    async function createBoard(createBoardDto: CreateBoardDto) {
      try {
        await BoardService.createBoard(createBoardDto)
        toast.add({
          title: 'Board created',
          description: 'Your board has been successfully created.',
          color: 'success',
        })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Board creation failed',
            description: 'An error occurred while creating your board. Please try again.',
            color: 'error',
          })
        }
      }
      fetchBoards()
    }

    async function renameBoard(renameBoardDto: RenameBoardDto, id: string) {
      try {
        await BoardService.renameBoard(renameBoardDto, id)
        toast.add({
          title: 'Board modified',
          description: 'Your board has been successfully modified.',
          color: 'success',
        })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Board rename failed',
            description: 'An error occurred while renaming your board. Please try again.',
            color: 'error',
          })
        }
      }
      fetchBoards()
    }

    async function deleteBoard(id: string) {
      try {
        await BoardService.deleteBoard(id)
        toast.add({
          title: 'Board deleted',
          description: 'Your board has been successfully deleted.',
          color: 'success',
        })
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          toast.add({
            title: 'Board delete failed',
            description: 'An error occurred while deleting your board. Please try again.',
            color: 'error',
          })
        }
      }
      fetchBoards()
    }

    return { boards, board, createBoard, fetchBoards, fetchBoard, renameBoard, deleteBoard }
  },
  { persist: true },
)
