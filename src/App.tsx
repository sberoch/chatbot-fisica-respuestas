import { Button, Flex, Progress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Message from "./Message";
import Preview from "./Preview";
import ResponseForm from "./ResponseForm";
import { getMessagesFromIntent, writeToSheets } from "./sheets";
import { Toast } from "./Toast";

//TODO: autocompletado de intents
//TODO: borrar items viejos de ese intent al subir de nuevo

function App() {

  const [loading, setLoading] = useState(false)
  const [questionIntent, setQuestionIntent] = useState('');
  const [responseMessages, setResponseMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getMessages() {
      setLoading(true)
      const messages = await getMessagesFromIntent(questionIntent)
      setResponseMessages(messages)
      setLoading(false)
    }
    if (questionIntent.length >= 3) {
      getMessages()
    }
  }, [questionIntent])

  const reset = () => {
    setQuestionIntent('')
    setResponseMessages([])
  }

  const send = async () => {
    setLoading(true)
    await getMessagesFromIntent(questionIntent)
    if (!questionIntent) {
      Toast({ type: "ERROR", title: 'Se debe especificar el intent que se quiere responder.' });
    } else if (!responseMessages || responseMessages.length === 0) {
      Toast({ type: "ERROR", title: 'Se debe incluir al menos un mensaje de respuesta.' });
    } else {
      await writeToSheets(responseMessages, questionIntent)
      Toast({ type: "SUCCESS", title: 'Enviado con éxito.' });
      reset();
    }
    setLoading(false)
  }

  return (
    <>
      { loading && <Progress size="md" isIndeterminate />}
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
