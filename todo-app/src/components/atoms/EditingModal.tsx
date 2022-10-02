import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input } from '@chakra-ui/react'
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
    console.log(`編集の${postId}`);

    const docRef = doc(db, "todos", postId);
    const docSnap = await getDoc(docRef);
    const beforeText: any = docSnap.data();
    console.log(beforeText.content);
    setInputEditingTaskText(beforeText.content);
  }

  //taskの上書き
  const updateContent = async (postId: string) => {
    const todo = doc(db, 'todos', postId)
    onClose();
    initGet(uid);
    return updateDoc(todo, {
      content: inputEditingTaskText,
      updateAt: serverTimestamp(),
    })
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
          <Input value={inputEditingTaskText} onChange={e => setInputEditingTaskText(e.target.value)} autoFocus htmlSize={4} width='350px' mx='auto' />
          <ModalFooter>
            <Btn onClick={() => { updateContent(postId) }} >変更を送信</Btn>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default EditingModal