import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { doc, deleteDoc } from "firebase/firestore";
import { Box, List, ListItem, Select, Spacer } from '@chakra-ui/react'
import { updateDoc, serverTimestamp } from "firebase/firestore";

import Btn from '../atoms/Btn'
import { taskItemState } from '../../states/inpuTaskState'
import { useAlltodos } from '../../hooks/useAlltodos'
import { db } from '../../firebase';
import { userState } from '../../states/userState';
import { taskProgressState, taskSortState } from '../../states/taskProgressState';
import EditingModal from '../atoms/EditingModal';


const Tasks: React.FC = () => {
  const { initGet } = useAlltodos();
  const taskItems = useRecoilValue(taskItemState)
  const setTaskSortValue = useSetRecoilState(taskSortState);
  const uid = useRecoilValue(userState)
  const setTaskStatus = useSetRecoilState(taskProgressState);

  //chakraのModal

  //削除ボタンでタスクを一つ削除
  const todoDelete = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'todos', id))
    initGet(uid);
  }
  //firebaseからtaskを取得して、stateを更新
  useEffect(() => {
    initGet(uid);
  }, [])
  const updateStatus = async (postId: string, eventTaskProgress: string) => {
    const todo = doc(db, 'todos', postId)
    return updateDoc(todo, {
      status: eventTaskProgress,
      updateAt: serverTimestamp(),
    })
  }

  const selectboxHandler = async (e: React.ChangeEvent<HTMLSelectElement>, postId: string) => {
    const statusValue = e.target.value;
    setTaskStatus(statusValue);
    await updateStatus(postId, statusValue)
    setTaskSortValue('all')
    initGet(uid)
  }
  return (
    <>
      <List>
        {taskItems.map((item: any) => (
          <ListItem display={'flex'} key={item.id} py={4}>
            <Box w={'60%'}>
              {item.content}
            </Box>
            <Spacer />
            <Select w={'100px'} marginRight={4} value={item.status} onChange={(e: any) => { selectboxHandler(e, item.id) }} >
              <option value='noStarted'>未着手</option>
              <option value='inProgress'>進行中</option>
              <option value='done'>完了</option>
            </Select>
            <Btn onClick={() => { todoDelete(item.id) }}>削除</Btn>
            <Spacer width={4} />
            <EditingModal postId={item.id} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Tasks