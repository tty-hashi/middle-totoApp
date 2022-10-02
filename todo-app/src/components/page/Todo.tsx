import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from 'recoil'

import Footer from '../Templates/Footer'
import Header from '../Templates/Header'
import TodoList from '../Templates/TodoList'

import { userState } from '../../states/userState';
import { auth } from '../../firebase';


const Todo: React.FC = () => {
  const setuidState = useSetRecoilState(userState)

  //ログインしているユーザーを取得
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuidState(user.uid)
    }
  });
  return (
    <>
      <Header />
      <TodoList />
      <Footer />
    </>
  )
}

export default Todo