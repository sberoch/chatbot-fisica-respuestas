import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Message from "./Message";
import Preview from "./Preview";
import ResponseForm from "./ResponseForm";
import { Toast } from "./Toast";

function App() {

  const [questionIntent, setQuestionIntent] = useState('');
  const [responseMessages, setResponseMessages] = useState<Message[]>([]);

  const reset = () => {
    setQuestionIntent('')
    setResponseMessages([])
  }

  const send = () => {
    if (!questionIntent) {
      Toast({ type: "ERROR", title: 'Se debe especificar el intent que se quiere responder.' });
    } else if (!responseMessages || responseMessages.length === 0) {
      Toast({ type: "ERROR", title: 'Se debe incluir al menos un mensaje de respuesta.' });
    } else {
      //TODO: send to database
      console.log(responseMessages)
      Toast({ type: "SUCCESS", title: 'Enviado con éxito.' });
      reset();
    }
  }

  return (
    <>
      <Flex>
        <ResponseForm
          intent={questionIntent}
          setQuestionIntent={setQuestionIntent}
          setResponseMessages={setResponseMessages}
        />
        <Preview 
          intent={questionIntent} 
          responseMessages={responseMessages}
          setResponseMessages={setResponseMessages}
        />
      </Flex>
      <Flex w='100%' justifyContent='center' mt={10} p={4}>
        <Button
          w='30%'
          colorScheme="blue"
          onClick={send}
        >
          Enviar
        </Button>
      </Flex>
    </>
  );
}

export default App;
