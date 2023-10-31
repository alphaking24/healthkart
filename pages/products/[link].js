import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { Box, Button, Flex, Grid, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiCurrentLocation, BiSolidCartAdd } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'
import { PiArrowsLeftRightDuotone } from 'react-icons/pi'
import { GiReceiveMoney } from 'react-icons/gi'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import Link from 'next/link'

function path() {
  const [value, setValue] = useState(0);
  const [productData, setProductData] = useState({})
  const [cart, setCart] = useState()

  const router = useRouter()
 console.log(router)
  const {link} = router.query


  const getProduct = async () => {
    const res = await fetch(`https://anishapi.onrender.com/products/${link}`)
    const data = await res.json()

   setProductData(data.product)
  }

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0)
      setValue(value - 1);
  };

  
  useEffect(() => {
    if (link){
        
        getProduct()
    }
}, [router.isReady])

  return (
    <div>
      <Header />
      <Navbar />
      <Box mt='8'>
        <Grid gridTemplateColumns='repeat(2, 1fr)' maxW='1000px' gap='8' mx='auto' >
          <Image src={productData.image} alt='' shadow='xl' mt='2' height='350px' width='350px' />
          <Box>
            <Text fontWeight='bold' fontSize='xl'>{productData.title}
            </Text>
            <Text>By <span className='text-blue-400 font-bold'><Link href='/'>HealthKart</Link></span></Text>
            <Box>
              <Flex gap='2' alignItems='center' mt='2' mb='8'>
                <Text fontSize='sm' fontWeight='bold'>₹ {productData.price}</Text>
                <Text fontSize='xs' fontWeight='semibold' textDecoration='line-through' color='gray' >₹6,198</Text>
                <Text fontSize='xs' fontWeight='semibold' color='green' >35% off</Text>
              </Flex>
              <Flex gap='2' mt='4'>
                <Box>
                  <Flex alignItems='center'>
                    <Button width='1px' onClick={handleDecrement}>-</Button>
                    <Box color='#00b5b7' width='10px' alignItems='center'>
                      <input type="number" value={value} readOnly />
                    </Box>
                    <Button width='1px' onClick={handleIncrement}>+</Button>
                  </Flex>
                </Box>
                <Button mt='auto' padding='4' height='30px' fontSize='sm' fontWeight='bold' color='orange' w='145px' border='1px' bg='orange.50' borderColor='orange' _hover={{ bg: "orange", color: "white" }}> <BiSolidCartAdd /> &nbsp;Add To Cart</Button>
                <Button mt='auto' padding='4' height='30px' fontSize='sm' fontWeight='bold' color='white' w='145px' border='1px' bg='orange' borderColor='orange'>Quick Buy</Button>
              </Flex>
              <Box shadow='sm' mt='8' bgColor={'gray.50'} padding='4' border='1px' borderColor='gray.200' gap='1'>
                <label fontSize='md' fontWeight='bold' color='black' htmlFor="pincode">Delivery & Services</label>
                <Input placeholder='Enter pincode' mb='2' mt='2' name='pincode' />
                <Flex alignItems={'center'} mt=''>
                  <BiCurrentLocation />&nbsp;
                  <label fontSize='md' fontWeight='bold' color='#00b5b7'> Use my Location</label>
                </Flex>
                <Flex alignItems={'center'} mt='1'>
                  <TbTruckDelivery />&nbsp;
                  <label fontSize='md' color='black'> Free Shipping</label>
                </Flex>
                <Flex alignItems={'center'} mt='1'>
                  <GiReceiveMoney />&nbsp;
                  <label fontSize='md' color='black'> Cash on Delivery Available</label>
                </Flex>
                <Flex alignItems={'center'} mt='1'>
                  <PiArrowsLeftRightDuotone />&nbsp;
                  <label fontSize='md' color='black'> 14 days Return policy</label>
                </Flex>

              </Box>
            </Box>
          </Box>
        </Grid>

      </Box>
      <Footer />
    </div>
  )
}

export default path