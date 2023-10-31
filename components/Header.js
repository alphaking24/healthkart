import { Box, Button, Divider, Flex, Image, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsCart3, BsSearch } from 'react-icons/bs'
import Login from './Login'
import { CiShoppingCart, CiLocationOn, CiCreditCard1 } from 'react-icons/ci'
import { BsCheck2 } from 'react-icons/bs'


function Header({ type,cart }) {
  console.log(type?.status)




  return (
    <Box  borderBottom='1px' borderColor='gray.300'>

      <Flex mx='auto' p='2' alignItems="center" maxW='1000px'>
        <Link href={'/'}><Image width='140px' src="https://img10.hkrtcdn.com/10848/bnr_1084799_o.png" /></Link>
        {
          type?.name === 'cart' ? <Box width='full'>
            <Flex width='300px' mx='auto' alignItems='center'>

              <Box onClick={()=>{type.setActive('cart')}} p='1' width='35px' rounded='full' className={type.status === 'cart' ? 'border bg-blue-100 border-solid border-blue-400' :'bg-blue-500'}>
                {
                  type.status != 'cart' ? <BsCheck2 color='white' size='24' /> : <CiShoppingCart size='24'  />
                }
              </Box>

              <Box bg={type.status==='location' || type.status==='card'?'blue.500':'gray.100'} width='100px' color='blue.400' height='3px' />

              <Box onClick={()=>{type.setActive('location')}} p='1' width='35px' rounded='full' className={type.status === 'location' ? 'border bg-blue-100 border-solid border-blue-400' : type.status==='cart'?'bg-gray-100':'bg-blue-500'}>
                {
                  type.status != 'location' || type.status!='cart'? type.status==='card'?<BsCheck2 color='white' size='24' />:<CiLocationOn size='24' /> :null
                }
              </Box>

              <Box bg={type.status==='card'?'blue.500':'gray.100'} width='100px' color='blue.400' height='3px' />

              <Box p='1' width='35px' rounded='full' className={type.status === 'card' ? 'border bg-blue-100 border-solid border-blue-400' : 'bg-gray-100'}>
                <CiCreditCard1 size='24' />
              </Box>


            </Flex>
            <Flex width='320px' mx='auto' justifyContent='space-between'>
              <Text ml='3'>Cart</Text>
              <Text ml='4'>Location</Text>
              <Text>Payment</Text>
            </Flex>
          </Box> : <Flex mx='auto' p='2' alignItems="center" w='full'>


            <InputGroup mx='8' h='36px' border='none' bg='gray.50'>
              <InputLeftAddon color='gray' bg='gray.50' border='none' h='32px' children={<BsSearch />} _hover={{ bg: 'white' }} />
              <Input fontSize='xs' h='36px' bg='gray.50' border='none' placeholder='Search for products & brands' _hover={{ bg: 'white' }} />
            </InputGroup>
            <Login />
            <Button>
              <Link href={'./cart'}>
                <Box mr='2'>
                  <Text position='absolute' fontSize='sm' ml='4' mt='-2' fontStyle='bold' bg='orange' p='1' px='2' rounded='full'>{cart.length}</Text>
                  <BsCart3 size={24} />
                </Box>
              </Link>
            </Button>
          </Flex>
        }
      </Flex>



    </Box>
  )
}

export default Header