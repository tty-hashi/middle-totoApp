import React from 'react'
import { useRecoilState } from 'recoil'
import { Input } from '@chakra-ui/react'

import { inputTaskTextState } from '../../states/inpuTaskState'

const InputText: React.FC = () => {
  const [inputTaskText, setInputTaskText] = useRecoilState<string>(inputTaskTextState)

  return (
    <>
      <Input value={inputTaskText} onChange={e => setInputTaskText(e.target.value)} autoFocus htmlSize={4} width='350px' marginRight={8} placeholder='Todoを入力してください' />
    </>
  )
}

export default InputText