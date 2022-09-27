import React from 'react'
import { useRecoilState } from 'recoil'
import { collection, addDoc, query, orderBy, doc, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

import { taskItemState } from '../states/inpuTaskState';

const useAlltodos = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState);

  //firebaseからtaskを取得して、stateを更新
  const initGet = async (uid: string) => {
    console.log(`snapshot get`)
    const todo = await query(collection(db, 'todos'), where('uid', '==', uid));
    const querySnapshot = await getDocs(todo);
    console.log(querySnapshot);
    let todos: any[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        cratedAt: doc.data().cratedAt
      });
    });
    console.log(todos);

    setTaskItems([...todos])
  }
  return { initGet }
}

export default useAlltodos