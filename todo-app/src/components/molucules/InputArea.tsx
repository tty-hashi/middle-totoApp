import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Flex } from '@chakra-ui/react'

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

import Btn from '../atoms/Btn'
import InputText from '../atoms/InputText'
import { inputTaskTextState, taskItemState } from '../../states/inpuTaskState'
import useAlltodos from '../../hooks/useAlltodos';
import { userState } from '../../states/userState';

const InputArea: React.FC = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
  const [inputTaskText, setInputTaskText] = useRecoilState(inputTaskTextState)
  const { initGet } = useAlltodos();
  const uid = useRecoilValue(userState)
  console.log(uid)
  // firebaseへのデータの追加
  const addTodo = async () => {
    await addDoc(collection(db, "todos"), {
      uid: uid,
      content: inputTaskText,
      createdAt: serverTimestamp(),
      status: 'noStarted'
    })
    setInputTaskText('')
    initGet(uid)
  }
  const sbumitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  }
  return (
    <>
      <form onSubmit={sbumitHandler}>
        <Flex justifyContent={'center'} my={8}>
          <InputText />
          <Btn onClick={addTodo} disabled={inputTaskText === ''}>追加</Btn>
        </Flex>
      </form>
    </>
  )
}

export default InputArea