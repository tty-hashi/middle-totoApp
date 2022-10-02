import { atom } from 'recoil'

export const taskProgressState = atom<string>({
  key: 'taskProgress',
  default: 'noStarted'
})

export const taskSortState = atom<string>({
  key: 'taskSortValue',
  default: 'all'
})