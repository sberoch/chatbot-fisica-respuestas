import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'

const theme = extendTheme({
  fonts: {
    heading: "Nunito",
    body: "Nunito",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
