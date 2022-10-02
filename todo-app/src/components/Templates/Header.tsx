import React from 'react'
import { Box, Button, Flex, Spacer } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { logOut, sinInWithGoogle } from '../../firebase';
import { userState } from '../../states/userState';

const Header: React.FC = () => {
  const uid = useRecoilValue(userState);
  return (
    <Flex py={4} px={8} bg={'gray.400'} alignItems={'center'}>
      <Box fontSize={'xl'} fontWeight={'bold'} letterSpacing={'wider'}>中級編Todoアプリ</Box>
      <Spacer />
      {uid !== '' ? <Button colorScheme='gray' onClick={logOut}>ログアウト</Button> :
        <Button colorScheme='gray' onClick={sinInWithGoogle}>ログイン</Button>
      }
    </Flex>
  )
}

export default Header