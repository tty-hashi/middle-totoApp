import { useRecoilState } from 'recoil'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

import { taskItemState } from '../states/inpuTaskState';
import { TodoType } from '../types/todo'

export const useAlltodos = () => {
  const [taskItems, setTaskItems] = useRecoilState(taskItemState);
  //firebaseからtaskを取得して、stateを更新
  const initGet = async (uid: string, todoStatus?: string) => {
    const todo = query(collection(db, 'todos'), where('uid', '==', uid));
    const querySnapshot = await getDocs(todo);
    const todos: TodoType[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        status: doc.data().status
      });
    });
    if (!todoStatus || todoStatus === 'all') {
      setTaskItems([...todos]);
    } else {
      setTaskItems([...todos.filter(({ status }) => status === todoStatus)]);
    }
  }
  return { initGet }
}

