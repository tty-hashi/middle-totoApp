import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from 'recoil'

import Todo from './components/page/Todo';

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Todo />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
