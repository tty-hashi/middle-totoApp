import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import { sinInWithGoogle } from '../../firebase';

const Header: React.FC = () => {
  return (
    <Flex py={4} px={8} bg={'gray.400'} alignItems={'center'}>
      <Box fontSize={'xl'} fontWeight={'bold'} letterSpacing={'wider'}>中級編Todoアプリ</Box>
      <Spacer />
      <Button colorScheme='gray' onClick={sinInWithGoogle}>ログイン</Button>
    </Flex>
  )
}

export default Header