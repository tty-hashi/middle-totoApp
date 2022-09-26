import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Flex } from '@chakra-ui/react'

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

import Btn from '../atoms/Btn'
import InputText from '../atoms/InputText'
import { inputTaskTextState, taskItemState } from '../../states/inpuTaskState'
import useAlltodos from '../../hooks/useAlltodos';

const InputArea: React.FC = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
  const [inputTaskText, setInputTaskText] = useRecoilState(inputTaskTextState)
  const { initGet } = useAlltodos();

  // firebaseへのデータの追加
  const addTodo = async () => {
    await addDoc(collection(db, "todos"), {
      content: inputTaskText,
      createdAt: serverTimestamp(),
      isComplete: false,
    })
    setInputTaskText('')
    initGet()

  }
  return (
    <>
      <Flex justifyContent={'center'} my={8}>
        <InputText />
        <Btn onClick={addTodo} disabled={inputTaskText === ''}>追加</Btn>
      </Flex>
    </>
  )
}

export default InputArea