import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from '@emotion/styled'

import InputArea from '../molucules/InputArea'
import Tasks from '../molucules/Tasks'
import { auth } from '../../firebase'
import Btn from '../atoms/Btn'
import { sinInWithGoogle } from '../../firebase';

const TodoList: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <Sdiv >
      {user ?
        (<>
          <InputArea />
          <Tasks />
        </>)
        :
        <Btn onClick={sinInWithGoogle} >ログイン</Btn>}
    </Sdiv>
  )
}

export default TodoList

const Sdiv = styled.div`
  margin: 0 auto;
  max-width: 700px;
  min-height:calc(100vh - 112px);
`