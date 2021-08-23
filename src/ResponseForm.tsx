import { Button, Divider, Flex, Heading, Radio, RadioGroup, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import Message from "./Message";
import Select from 'react-select'

const placeholderMap: Record<string, string> = {
  text: 'Ingrese aqui su respuesta de texto',
  image: 'Ingrese aqui el link de su imagen',
  url: 'Copie el link aqui'
}

interface Props {
  intent: string,
  setQuestionIntent: (intent: string) => void,
  setResponseMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  knownIntents: string[],
}

const styles = {
  container: (base: any) => ({
    ...base,
    flex: 1
  })
};

const ResponseForm = ({ intent, setQuestionIntent, setResponseMessages, knownIntents }: Props) => {

  const [messageText, setMessageText] = useState('')
  const [responseType, setResponseType] = useState("text")
  const selectOptions = knownIntents.map(intent => ({value: intent, label: intent}))

  const addMessage = () => {
    const message: Message = { text: messageText, type: responseType }
    setResponseMessages((prev: Message[]) => [...prev, message])
    setMessageText('')
  }

  return (
    <Flex w='100%' justifyContent='center'>
      <Stack spacing={6} w='70%' alignItems='center'>
        <Heading fontSize='20pt' mt={4} textAlign='center'>Respuesta</Heading>
        <Text mt={4} textAlign='center' fontSize='12pt' color='gray.700'>
          Primero, ingrese el intent para el que quiere ingresar una respuesta.
        </Text>
        <Text textAlign='center' fontSize='10pt' color='gray.700'>
          (Tambien puede agregar uno nuevo)
        </Text>
        <Flex w='100%'>
          <Select
            styles={styles}
            autoFocus={true}
            options={selectOptions}
            defaultValue={{value: '', label: ''}}
            onChange={(e) => setQuestionIntent(e?.label || '')}
          />
        </Flex>
        <Divider />

        <Text mt={4} textAlign='center' fontSize='12pt' color='gray.700'>
          Luego, agregue su respuesta. Pueden ser tantos mensajes como desee.
        </Text>
        <Textarea 
          placeholder={placeholderMap[responseType]}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)} 
        />
        <RadioGroup defaultValue={responseType} onChange={setResponseType} mb={6}>
          <Stack direction="row" spacing={5}>
            <Radio value="text">Texto</Radio>
            <Radio value="image">Imagen</Radio>
            <Radio value="url">URL</Radio>
          </Stack>
        </RadioGroup>
        <Button 
          colorScheme="blue"
          onClick={addMessage}
        >
          Agregar
        </Button>
      </Stack>
    </Flex>
  );
}

export default ResponseForm;