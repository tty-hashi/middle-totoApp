import { atom } from 'recoil'

export const userState = atom<any>({
  key: 'uid',
  default: ''
})