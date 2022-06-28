import { Button, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import fundo from './assets/fundo.jpg'
import { IoWalletOutline } from "react-icons/io5";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function App() {
  const [error, setError] = useState(null)

  useEffect(()=>{
    signInMetamask()
  }, [])


  async function signInMetamask() {
    
    if (!window.ethereum) {
      console.log('no metamsk ')
    }

  }

  return (
    <Flex
      w='100%'
      h='100vh'
      bg='gray.900'
      alignItems='center'

      backgroundImage={fundo}
      backgroundSize='cover'
      backgroundBlendMode='soft-light'
      direction='column'
    >

      <Flex
        w='100%'
        h='68px'
        bg='#ffffff1c'
        alignItems='center'
      >
        <Button
          ml='auto'
          mr='8'
          colorScheme='green'
        >
          <Stack direction='row' alignItems='center'>
            <Text>Conectar Carteira</Text>

            <IoWalletOutline size='24px'/>
          </Stack>


        </Button>
      </Flex>

      <Flex
        w='380px'
        h='60vh'
        bg='#264478d3'
        borderRadius='18'
        border='1px solid #ffffff11'
        shadow='2xl'
        direction='column'
        alignItems='center'
        justifyContent='space-around'
        mt='auto'
        mb='auto'
      >

        <Stack>
          <Text
            textAlign='center'
            color='white'
          >
            Saldo atual da conta:
          </Text>

          <Heading color='white'>$3000,80</Heading>

        </Stack>

        <Flex
          w='90%'
          h='60%'
          bg='#12264984'
          borderRadius='16'
          alignItems='center'
          justifyContent='center'
          direction='column'
          gap='2'
          p='2'
        >

          <Stack w='100%' mt='auto'>
            <Text color='white'>Quantidade:</Text>
            <Input
              w='100%'
              h='48px'
              borderRadius='full'
              bg='#ffffff11'
              p='2'
              color='white'
            />

            <Text color='white'>Para: </Text>

            <Stack spacing='1'>
              <Input
                w='100%'
                h='48px'
                borderRadius='full'
                bg='#ffffff11'
                p='2'
                color='white'
              />
              <Text color='gray.400' fontSize='12px'>**Informe carteira BSC que recebera a quantia</Text>
            </Stack>

          </Stack>

          <Divider mt='auto' mb='auto' />
          <Button
            borderRadius='full'
            h='48px'
            colorScheme='blue'
            w='100%'
            mb='auto'
          >
            Enviar
          </Button>

        </Flex>

      </Flex>

    </Flex>
  )

}

export default App
