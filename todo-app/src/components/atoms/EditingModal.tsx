import React, { useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input } from '@chakra-ui/react'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import Btn from './Btn';
import { db } from '../../firebase';
import { useAlltodos } from '../../hooks/useAlltodos';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/userState';

type Props = {
  postId: string;
}

const EditingModal: React.FC<Props> = ({ postId }) => {
  //chakraのModal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputEditingTaskText, setInputEditingTaskText] = useState<string>('');
  const { initGet } = useAlltodos();
  const uid = useRecoilValue(userState)

  //Modal openの動作
  const modalOpenSetBeforeText: (postId: string) => Promise<void> = async (postId) => {
    onOpen();
    const docRef = doc(db, "todos", postId);
    const docSnap = await getDoc(docRef);
    const beforeText: any = docSnap.data();
    setInputEditingTaskText(beforeText.content);
  }

  //inputValueHandler
  let inputValue;

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditingTaskText(e.target.value)
    inputValue = e.target.value;
    return inputValue;
  }



  //taskの上書き
  const updateContent = async (postId: string, inputValue: string) => {
    const todo = doc(db, 'todos', postId)
    await updateDoc(todo, {
      content: inputValue,
      updateAt: serverTimestamp(),
    })
    onClose();
    initGet(uid);
  }

  return (
    <>
      <Btn onClick={() => { modalOpenSetBeforeText(postId) }}>編集</Btn>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Taskの内容を編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <Input value={inputEditingTaskText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputValueHandler(e)} autoFocus htmlSize={4} width='350px' mx='auto' />
          <ModalFooter>
            <Btn onClick={() => { updateContent(postId, inputEditingTaskText) }} >変更を送信</Btn>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default EditingModal