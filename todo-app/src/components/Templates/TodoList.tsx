import React from 'react'
import { RecoilRoot } from 'recoil'
import styled from '@emotion/styled'
import InputArea from '../molucules/InputArea'
import Tasks from '../molucules/Tasks'

const TodoList: React.FC = () => {
  return (
    <RecoilRoot>
      <Sdiv >
        <InputArea />
        <Tasks />
      </Sdiv>
    </RecoilRoot>
  )
}

export default TodoList

const Sdiv = styled.div`
  margin: 0 auto;
  max-width: 700px;
  height:calc(100vh - 112px);
`