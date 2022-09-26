import { atom } from 'recoil'

import { TodoTpye } from '../types/todo'

export const inputTaskTextState = atom<string>({
  key: 'inputTaskText',
  default: '',
})

export const taskItemState = atom<Array<TodoTpye>>({
  key: 'taskItems',
  default: [{ id: '', content: '', cratedAt: '' }]
})