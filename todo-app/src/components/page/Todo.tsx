import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from 'recoil'

import Footer from '../Templates/Footer'
import Header from '../Templates/Header'
import TodoList from '../Templates/TodoList'

import { userState } from '../../states/userState';
import { auth } from '../../firebase';


const Todo = () => {
  const [uidState, setuidState] = useRecoilState<any>(userState)
  //ログインしているユーザーを取得
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid)
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