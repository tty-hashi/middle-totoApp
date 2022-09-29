import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { doc, deleteDoc } from "firebase/firestore";
import { Box, List, ListItem, Select, Spacer } from '@chakra-ui/react'
import { updateDoc, serverTimestamp } from "firebase/firestore";

import Btn from '../atoms/Btn'
import { taskItemState } from '../../states/inpuTaskState'
import useAlltodos from '../../hooks/useAlltodos'
import { db } from '../../firebase';
import { userState } from '../../states/userState';
import { taskProgressState } from '../../states/taskProgressState';


const Tasks: React.FC = () => {
  const { initGet } = useAlltodos();
  const [taskItems, setTaskItems] = useRecoilState(taskItemState);
  const uid = useRecoilValue(userState)
  //削除ボタンでタスクを一つ削除
  const todoDelete = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'todos', id))
    initGet(uid);
  }
  //firebaseからtaskを取得して、stateを更新
  useEffect(() => {
    initGet(uid);
  }, [])
  //selectをハンドリング
  const [taskStatus, setTaskStatus] = useRecoilState(taskProgressState);

  const updateStatus = async (uid: string, eventTaskProgress:string) => {
    const todo =  doc(db, 'todos', uid)
    return updateDoc(todo, {
      status: eventTaskProgress,
      updateAt: serverTimestamp(),
    })
  }

  const selectboxHandler = async (e: React.ChangeEvent<HTMLSelectElement>, postId: string) => {
    const statusValue = e.target.value;
    setTaskStatus(statusValue);
    await updateStatus(postId,statusValue)
    initGet(uid)
  }

  return (
    <>
      <List>
        {taskItems.map((item: any) => (
          <ListItem display={'flex'} key={item.id} py={4}>
            <Box w={'80%'}>
              {item.content}
            </Box>
            <Spacer />
            <Select w={'100px'} marginRight={4} value={item.status} onChange={(e: any) => { selectboxHandler(e, item.id) }} >
              <option value='noStarted'>未着手</option>
              <option value='inProgress'>進行中</option>
              <option value='done'>完了</option>
            </Select>
            <Btn onClick={() => { todoDelete(item.id) }}>削除</Btn>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Tasks