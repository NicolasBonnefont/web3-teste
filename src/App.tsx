import { Button, Divider, Flex, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { ethers } from 'ethers';
import { useEffect, useState } from "react"
import fundo from './assets/fundo.jpg'
import { IoWalletOutline } from "react-icons/io5";

function App() {
  const [error, setError] = useState('')
  const [wallet, setWallet] = useState('')
  const [balance, setBalance] = useState('')

  const toast = useToast()

  useEffect(() => {

    const wallet_storage = localStorage.getItem('wallet')

    signInMetamask()

  }, [])

  useEffect(() => {

    if (error !== '') {
      toast({
        description: `${error} 😢`,
        position: "top",
        status: 'warning'
      })
      setError('')
    }

  }, [error])

  window.ethereum.on('accountsChanged', async () => {
    localStorage.clear()
    setWallet('')
    setBalance('')
    signInMetamask()
  });

  async function signInMetamask() {

    if (!window.ethereum) {
      setError('Metamesk não localizada')
    }
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      const balance = await provider.getBalance(accounts[0]);

      setBalance(ethers.utils.formatEther(balance.toString()));

      if (!accounts || !accounts.length) {
        toast({
          description: 'Carteira não encontrada / Permitida 😢',
          position: 'top',
          status: 'warning'

        })
        setError('Wallet not found/allowed!');
        setError('')
        return
      }

      localStorage.setItem('wallet', accounts[0]);

      setWallet(accounts[0]);


    } catch (err: any) {
      setError(err.message);
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
          onClick={signInMetamask}
        >
          <Stack direction='row' alignItems='center'>
            {
              wallet ? <Text>Carteira: {wallet}</Text> : <Text>Conectar Carteira</Text>
            }
            <IoWalletOutline size='24px' />
          </Stack>


        </Button>
      </Flex>

      <Flex
        w='380px'
        h={wallet ? '60vh' : '20vh'}
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

        <Stack textAlign='center' spacing='1'>

          {wallet &&
            <Text color='white'> Saldo atual da conta:</Text>
          }

          {
            wallet ?
              <Heading fontSize='22px' color='white'>$ {balance}</Heading>
              :
              null
          }

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

          {
            wallet ?
              <>

                <Text color='#fff'>Enviar fundos para outra carteira 😎</Text>
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

                  <Text color='white'>Para endereço: </Text>

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
              </>

              :

              <Heading fontSize='18px' color='white'>Conecte a carteira para continuar !</Heading>
          }


        </Flex>

      </Flex>

    </Flex>
  )

}

export default App
