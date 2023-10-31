import Header from '@/components/Header'
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Grid, Image, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GrNext } from 'react-icons/gr'
import { CiDiscount1 } from 'react-icons/ci'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSession } from 'next-auth/react'

function cart() {
    const { data: session, status } = useSession()
    const [active, setActive] = useState('cart')
    const [payment, setPayment] = useState('upi')
    const [banks, setBanks] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState('right')
    const [cartData, setCartData] = useState([])
    const toast = useToast()

    const handleIncrement = async (cartItem) => {

        let res = await fetch(`https://anishapi.onrender.com/cart/${cartItem._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: cartItem.quantity + 1 })
        })
        let data = await res.json()
        setCartData(cartData.map((cartDetail) => cartDetail._id === cartItem._id ? { ...cartDetail, quantity: cartItem.quantity + 1 } : cartDetail))

    };

    const handleDecrement = async (cartItem) => {
        if (cartItem.quantity > 1) {
            let response = await fetch(`https://anishapi.onrender.com/cart/${cartItem._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: cartItem.quantity - 1 })
            })
            let data = await response.json()
            setCartData(cartData.map((cartDetail) => {
                if (cartDetail._id === cartItem._id) {
                    let updatedCart = {
                        ...cartDetail,
                        quantity: cartItem.quantity - 1

                    }

                    return updatedCart
                } else {
                    return cartDetail
                }
            }))
        }else{
            deleteCart(cartItem._id)
        }
    };

    const deleteCart = async (cartId) => {
        let res = await fetch(`https://anishapi.onrender.com/cart/${cartId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        let data = await res.json()
        setCartData(cartData.filter((cartItem) => cartItem._id != cartId))

        toast({
            title: "Product Removed",
            status: "info",
            duration: 3000,
            isClosable: true,

        })

    }

    const getCart = async () => {


        let res = await fetch(`https://anishapi.onrender.com/cart/${session?.user?.image}`)
        let data = await res.json()
        setCartData(data.cart)



    }

    useEffect(() => {
        if (status == "authenticated") {
            getCart()

        }
    }, [status])


    return (






        <Box >
            <Header type={{ name: 'cart', status: active, setActive }} />

            <Box bgColor='gray.200 bg=full' >
                <Grid gap='12' gridTemplateColumns={'repeat(2,1fr)'}>
                    <Box>
                        {
                            active === 'cart' ? <Box>
                                <Text ml='12' mt='' fontSize='xl' fontWeight='semibold'>Shopping Cart ({cartData.length} item)</Text>
                                {
                                    cartData.map((cart) => (
                                        <Box key={cart._id} mt='4' ml='12' border='1px' borderColor='gray.200' rounded='md'>
                                            <Flex gap='4' mt='3'>
                                                <Box >
                                                    <Image src={cart.product.image} alt='' height='120px' width='120px' />
                                                </Box>
                                                <Box>
                                                    <Text>{cart.product.title} </Text>
                                                    <Box alignContent='center'>
                                                        <Flex gap='2'>
                                                            <Text >₹ {cart.product.price}</Text>
                                                            <Text color='green' fontSize='xs'>25% OFF</Text>
                                                        </Flex>
                                                    </Box>
                                                    <Text textDecoration='line-through' >MRP: ₹5,499</Text>
                                                </Box>
                                                <Box>
                                                    <Flex alignItems='center'>
                                                        <Button width='1px' onClick={() => { handleDecrement(cart) }}>-</Button>
                                                        <Box color='#00b5b7' width='20px' alignItems='center'>
                                                            <input width='20px' type="number" value={cart.quantity} readOnly />
                                                        </Box>
                                                        <Button width='1px' onClick={() => { handleIncrement(cart) }}>+</Button>
                                                    </Flex>
                                                </Box>
                                                <Box>
                                                    <Button onClick={() => { deleteCart(cart._id) }} bgColor='white' ><RiDeleteBin6Line /></Button>
                                                </Box>
                                            </Flex>
                                            <Text fontSize='sm' rounded='md' bgColor='gray.50' width='200px'>Delivery Expected on 6 Nov</Text>
                                        </Box>

                                    ))
                                }



                            </Box> : active === 'location' ? <Box ml='16' rounded='md' padding='2' mt='8' mb='8' boxShadow='xl' bgColor='white'><Grid gap='4' gridTemplateColumns={'repeat(2,1fr)'}> <Box><label fontSize='md' fontWeight='bold' color='black'>Name</label>
                                <Input placeholder='Enter your Name' mb='1' mt='1' name='Name' />
                            </Box>
                                <Box>
                                    <label fontSize='md' fontWeight='bold' color='black'>Mobile No.</label>
                                    <Input placeholder='Enter your Number' mb='1' mt='1' name='Number' />
                                </Box>
                            </Grid>
                                <label fontSize='md' fontWeight='bold' color='black'>Address</label>
                                <Input placeholder='Enter your Address' mb='1' mt='1' name='Address' />
                                <label fontSize='md' fontWeight='bold' color='black'>Pincode</label>
                                <Input placeholder='Enter your PIN' mb='1' mt='1' name='code' />
                                <Button onClick={() => { setActive('card') }} colorScheme='blue' rounded='xl' mt='2' mb='2'>Save & Deliver</Button></Box> :
                                <Box>
                                    <Grid gap='12' gridTemplateColumns={'repeat(2,1fr)'}>
                                        <Box>
                                            <Box>
                                                <Button onClick={() => { setPayment('upi') }} mt='4' mb='2' shadow='xl' rounded='lg' bgColor='white' width='150px' p='3' mx='auto'>Pay using UPI</Button>
                                            </Box>
                                            <Box>
                                                <Button onClick={() => { setPayment('debit') }} mt='4' mb='2' shadow='xl' rounded='lg' bgColor='white' width='150px' p='3' mx='auto'>Debit Card</Button>
                                            </Box>
                                            <Box>
                                                <Button onClick={() => { setPayment('debit') }} mt='4' mb='2' shadow='xl' rounded='lg' bgColor='white' width='150px' p='3' mx='auto'>Credit Card</Button>
                                            </Box>
                                            <Box>
                                                <Button onClick={() => { setPayment('netBanking') }} mt='4' mb='2' shadow='xl' rounded='lg' bgColor='white' width='150px' p='3' mx='auto'>Net Banking</Button>
                                            </Box>
                                        </Box>

                                        <Box mt='4' mb='2'>
                                            {
                                                payment === 'upi' && <Box>
                                                    <label fontSize='lg' fontWeight='bold' color='black'>Pay through your UPI</label>
                                                    <Flex gap='4' alignItems='center'>
                                                        <Input placeholder='Enter your UPI' mb='1' mt='1' name='upi' bgColor='white' />
                                                        <Button colorScheme='orange' rounded='xl' width='auto'>Verify</Button>
                                                    </Flex>
                                                </Box>
                                            }

                                            {
                                                payment === 'debit' && <Box>
                                                    <label fontSize='lg' fontWeight='bold' color='black'>Add a New Card</label>
                                                    <Input placeholder='Please Enter Name on Card' mb='1' mt='1' name='name' bgColor='white' />
                                                    <Input placeholder='Please Enter Card No.' mb='1' mt='1' name='number' bgColor='white' />
                                                    <Input placeholder='Please Enter Card Expiry' mb='1' mt='1' name='number' bgColor='white' />
                                                    <Input placeholder='CVV' mb='1' mt='1' name='number' bgColor='white' />
                                                </Box>
                                            }
                                            {
                                                payment === 'netBanking' && <Box>
                                                    <Button onClick={() => { setBanks('anyBanks') }} rounded='full'><Image src='https://portal.tradebrains.in/_next/image?url=https%3A%2F%2Ftradebrains-portal.s3.ap-south-1.amazonaws.com%2FNIFTY50%2FSBIN.png&w=384&q=75' alt='' h='70px' w='70px' /></Button>
                                                    <Button onClick={() => { setBanks('anyBanks') }} rounded='full'><Image src='https://startinup.up.gov.in/wp-content/uploads/2022/12/hdfc-logo.png' alt='' h='30px' w='30px' /></Button>
                                                    <Button onClick={() => { setBanks('anyBanks') }} rounded='full'><Image src='https://www.liblogo.com/img-logo/ax6638a05f-axis-bank-logo-axis-bank-logo-png-images-free-png-images-vector-psd-clipart.png' alt='' h='30px' w='30px' /></Button>
                                                    <Button onClick={() => { setBanks('anyBanks') }} rounded='full'><Image src='https://e7.pngegg.com/pngimages/72/678/png-clipart-bank-of-baroda-logo-bank-logos.png' alt='' h='30px' w='30px' /></Button>
                                                    <Button onClick={() => { setBanks('anyBanks') }} rounded='full'><Image src='https://e7.pngegg.com/pngimages/805/809/png-clipart-icici-bank-credit-card-logo-loan-bank-text-logo-thumbnail.png' alt='' h='30px' w='30px' /></Button>
                                                    <Button onClick={() => { setBanks('anyBanks') }} rounded='full'><Image src='https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/092014/logo_0.jpg?itok=VgOP01kU' alt='' h='30px' w='30px' /></Button>
                                                    {
                                                        banks === 'anyBanks' && <Box><label fontSize='lg' fontWeight='bold' color='black'>Username</label>
                                                            <Input placeholder=' Enter your Username' mb='1' mt='1' name='name' bgColor='white' />
                                                            <label fontSize='lg' fontWeight='bold' color='black'>Password</label>
                                                            <Input placeholder=' Enter your Password' mb='1' mt='1' name='name' bgColor='white' /></Box>
                                                    }
                                                </Box>

                                            }

                                        </Box>
                                    </Grid>
                                </Box>
                        }
                    </Box>



                    <Box>
                        <Box>
                            <Flex rounded='md' padding='3' mt='8' boxShadow='xl' bgColor='white' width='500px' justify='space-between'>
                                <Text >Delivery to 831015, EAST SINGHBHUM </Text>
                                <Text color='blue.400' onClick={() => { setActive('location') }}>Change</Text>
                            </Flex>
                        </Box>
                        <Box>
                            <Button onClick={onOpen} justify='space-between' rounded='md' padding='3' mt='4' boxShadow='xl' bgColor='white' width='500px'>Apply Coupon<GrNext gap='24px' /></Button>
                            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader borderBottomWidth='1px'>Apply Coupon</DrawerHeader>
                                    <DrawerBody>
                                        <Input placeholder=' Enter your Coupon Code' mb='1' mt='1' name='name' bgColor='white' />
                                        <Text fontSize='lg' fontWeight='bold' bgColor='gray.100' maxW='full' mt='3' mb='3' p='4'>Available Coupons</Text>
                                        <Box border='1px' borderColor='gray.200' p='3'><Flex gap='2' alignItems='center'><CiDiscount1 /><Text fontSize='lg' fontWeight='bold'>Free gym Bag</Text></Flex>
                                            <Text fontSize='sm'>Free Gym Bag | Offer valid on 4 kg & above proteins</Text>
                                            <Button p='2' colorScheme='blue' fontSize='md' mt='4' mb='4' h='32px' ml='2' rounded='md' mr='auto' >Apply</Button>
                                        </Box>
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </Box>

                        {
                            active === 'cart' && <Button onClick={() => { setActive('location') }} fontSize='sm' mt='4' mb='4' h='32px' ml='2' rounded='md' mr='auto' width='500px' bg="#00b5b7" _hover={{ bg: '#00b5b7' }} color='white'>
                                Proceed to Pay
                            </Button>
                        }
                        <Box rounded='md' padding='2' mt='4' mb='4' boxShadow='xl' bgColor='white' width='500px'>
                            <Text fontWeight='bold'>Order Summary ({cartData.length} Item)</Text>
                            <Grid gridTemplateColumns={'repeat(2,1fr)'} >
                                <Box>
                                    <Text mt='4px'>Total MRP</Text>
                                    <Text mt='4px'>Total Discounts</Text>
                                    <Text mt='4px'>Loyalty Discount</Text>
                                    <Text mt='4px' mb='2'>Shipping Charges</Text>
                                </Box>
                                <Box alignItems='center' ml='40px'>
                                    <Text mt='4px'>₹ {cartData.length>0 ? cartData.reduce((acc,el)=>acc+(el.quantity*el.product.price),0):0}</Text>
                                    <Text mt='4px'>-₹1,198</Text>
                                    <Text mt='4px' color='green.400'>(₹299)</Text>
                                    <Text mt='4px'>Free</Text>
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default cart