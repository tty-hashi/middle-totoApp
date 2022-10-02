import React from 'react'
import { useRecoilState } from 'recoil'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

import { taskItemState } from '../states/inpuTaskState';

export const useAlltodos = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState);
  //firebaseからtaskを取得して、stateを更新
  const initGet = async (uid: string, selectValue?: string) => {
    console.log(`snapshot get`)
    const todo = await query(collection(db, 'todos'), where('uid', '==', uid));
    const querySnapshot = await getDocs(todo);
    console.log(querySnapshot);
    let todos: any[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        cratedAt: doc.data().cratedAt,
        status: doc.data().status
      });
    });
    //inputAreaのselectに応じてtasksをsort
    if (selectValue) {
      switch (selectValue) {
        case 'all':
          setTaskItems([...todos]);
          break;
        case 'noStarted':
          const noStartedTodos = todos.filter(({ status }) => status === 'noStarted')
          setTaskItems([...noStartedTodos])
          break;
        case 'inProgress':
          const inProgressTodos = todos.filter(({ status }) => status === 'inProgress')
          setTaskItems([...inProgressTodos])
          break;
        case 'done':
          const doneTodos = todos.filter(({ status }) => status === 'done')
          setTaskItems([...doneTodos])
          break;
      }
    } else {
      setTaskItems([...todos])
    }

  }
  return { initGet }
}

