import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Flex, Select } from '@chakra-ui/react'

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

import Btn from '../atoms/Btn'
import InputText from '../atoms/InputText'
import { inputTaskTextState, taskItemState } from '../../states/inpuTaskState'
import { useAlltodos } from '../../hooks/useAlltodos';
import { userState } from '../../states/userState';
import { taskSortState } from '../../states/taskProgressState';

const InputArea: React.FC = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState)
  const [inputTaskText, setInputTaskText] = useRecoilState(inputTaskTextState)
  const [selectSortValue, setSelectSortValue] = useRecoilState(taskSortState);
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

  const selectTodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value;
    setSelectSortValue(selectValue);
    initGet(uid, selectValue);
  }
  return (
    <>
      <form onSubmit={sbumitHandler}>
        <Flex justifyContent={'center'} my={8}>
          <InputText />
          <Btn onClick={addTodo} disabled={inputTaskText === ''}>追加</Btn>
          <Select w={'100px'} marginRight={4} value={selectSortValue} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { selectTodo(e) }} >
            <option value='all'>すべて</option>
            <option value='noStarted'>未着手</option>
            <option value='inProgress'>進行中</option>
            <option value='done'>完了</option>
          </Select>

        </Flex>
      </form>
    </>
  )
}

export default InputArea