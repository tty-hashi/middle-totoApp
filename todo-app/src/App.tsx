import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";

import Todo from './components/page/Todo';

function App() {
  return (
    <ChakraProvider>
      <Todo />
    </ChakraProvider>
  );
}

export default App;
