import { atom } from 'recoil'

export const taskProgressState = atom<any>({
  key: 'taskProgress',
  default: 'noStarted'
})