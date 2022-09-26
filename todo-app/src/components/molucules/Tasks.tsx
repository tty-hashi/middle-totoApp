import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Box, List, ListItem, Select, Spacer } from '@chakra-ui/react'

import Btn from '../atoms/Btn'
import { taskItemState } from '../../states/inpuTaskState'
import useAlltodos from '../../hooks/useAlltodos'


const Tasks: React.FC = () => {
  const { initGet } = useAlltodos();
  const [taskItems, setTaskItems] = useRecoilState(taskItemState);
  //削除ボタンでタスクを一つ削除
  const taskDalete = (i: number): void => {
    const newTaskItems = [...taskItems];
    newTaskItems.splice(i, 1);
    setTaskItems(newTaskItems);
  }

  //firebaseからtaskを取得して、stateを更新
  useEffect(() => {
    initGet()
  }, [])
  return (
    <>
      <List>
        {taskItems.map((item: any) => (
          <ListItem display={'flex'} key={item.id} py={4}>
            <Box w={'80%'}>
              {item.content}
            </Box>
            <Spacer />
            <Select placeholder='進行状況' w={'100px'} marginRight={4}>
              <option value='option1'>未着手</option>
              <option value='option2'>進行中</option>
              <option value='option3'>完了</option>
            </Select>
            <Btn onClick={() => { taskDalete(item.id) }}>削除</Btn>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Tasks