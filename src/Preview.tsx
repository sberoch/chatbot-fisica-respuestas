import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Link, Stack, Text, IconButton } from "@chakra-ui/react";
import Message from "./Message";

interface Props {
  intent: string,
  responseMessages: Message[],
  setResponseMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const Preview = ({ intent, responseMessages, setResponseMessages }: Props) => {

  const removeMessage = (message: Message) => {
    const newMessages = responseMessages.filter(m => m !== message)
    setResponseMessages(newMessages)
  }

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'text':
        return message.text;
      case 'image':
        return (
          <Image 
            boxSize="200px" 
            src={message.text} 
            alt={message.text} 
            objectFit="contain"
          />
        );
      case 'url':
        return (
          <Link href={message.text} isExternal>
            <Text as='u'>{message.text}</Text>
          </Link>
        );    
      default:
        break;
    }
  }
  
  return (
    <Flex w='100%' justifyContent='center'>
      <Stack spacing={4} w='70%' alignItems='center'>
        <Heading fontSize='20pt' mt={4} textAlign='center'>Vista previa</Heading>
        <Flex justifyContent='flex-end' w='100%'>
          <Box borderRadius='lg' borderWidth='2px' p={3} textColor='gray.600' maxW='95%'>
            Hola! Tengo una pregunta sobre {intent}
          </Box>
        </Flex>
        {responseMessages.map((message, idx) => (
          <Flex justifyContent='flex-start' w='100%' key={`${message.text}.${idx}`}>
            <Box borderRadius='lg' p={3} textColor='white' bgColor='blue.400' maxW='95%'>
              {renderMessage(message)}
            </Box>
            <IconButton 
              aria-label='remove-message' 
              onClick={() => removeMessage(message)}
              color='blue.400'
              bgColor='white'
              size='xs'
              icon={<CloseIcon />}
            />
         </Flex>
        ))}
      </Stack>
    </Flex>
  );
}

export default Preview;

