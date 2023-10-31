import { Box, Button, Flex, Grid, GridItem, Image, Text, useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiSolidCartAdd } from 'react-icons/bi'

function Products({ products,increaseCart }) {
    const { data: session, status } = useSession()
    const toast=useToast()


    const addToCart = async (product) => {
        const res = await fetch('https://anishapi.onrender.com/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: session.user.image, product: product._id, quantity: 1 })
        })
        const data = await res.json()
        increaseCart(data.cart)
        console.log(data.cart)

        toast({
            title: product.title + " Added to Cart",
            position: "top",
            isClosable: true,
            status: "success",
        })

    }
    return (
        <Box mt='4'>
            <Grid gridTemplateColumns='repeat(4, 1fr)' maxW='1000px' gap='2' mx='auto'>
                {
                    products.map((product) => (
                        <GridItem key={product._id} border='1px' borderColor='gray.200' rounded={'xl'} colSpan={{ sm: 2, md: 1 }}>
                            <Link  href={`/products/${product.slug}`}>
                                <Flex justify='flex-end' p='2'>
                                    <AiOutlineHeart size={24} />
                                </Flex>
                                <Image w='60%' my='6' mx='auto' src={product.image} height='200px' objectFit='contain' />
                                <Grid p='2' borderTop='1px' borderColor='gray.200'>
                                    <Text mt='4' fontSize='xs'>{product.title}</Text>
                                    <Flex gap='2' alignItems='center' mt='2' mb='8'>
                                        <Text fontSize='sm' fontWeight='bold'>₹{product.price}</Text>
                                        <Text fontSize='xs' fontWeight='semibold' textDecoration='line-through' color='gray' >₹6,198</Text>
                                        <Text fontSize='xs' fontWeight='semibold' color='green' >35% off</Text>
                                    </Flex>
                                </Grid>
                            </Link>
                            <Button onClick={() => { addToCart(product) }} mt='auto' height='30px' fontSize='sm' color='orange' w='full' border='1px' bg='orange.50' borderColor='orange' _hover={{ bg: "orange", color: "white" }}> <BiSolidCartAdd /> &nbsp;Add To Cart</Button>
                        </GridItem>
                    ))
                }

            </Grid>
        </Box>
    )
}

export default Products
