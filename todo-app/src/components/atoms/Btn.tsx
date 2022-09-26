import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  children: React.ReactNode;
  width?: string;
  onClick?: (num1: any) => void;
  disabled?: boolean;
}

const Btn: React.FC<Props> = (props) => {
  const { children, width, onClick, disabled } = props
  return (
    <Button width={width} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  )
}

export default Btn