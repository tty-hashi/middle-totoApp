import { atom } from 'recoil'

import { TodoType } from '../types/todo'

export const inputTaskTextState = atom<string>({
  key: 'inputTaskText',
  default: '',
})

export const taskItemState = atom<Array<TodoType>>({
  key: 'taskItems',
  default: [{ id: '', content: '', createdAt: '', status: 'noStarted' }]
})