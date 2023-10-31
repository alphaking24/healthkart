import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { Box, Button, Center, Flex, Grid, GridItem, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Products from '@/components/Products'
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1// optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

function index() {
  const { data: session, status } = useSession()
  
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [cart, setCart] = useState([])


  const getCart = async () => {

    if (status == 'authenticated') {
      let res = await fetch(`https://anishapi.onrender.com/cart/${session?.user?.image}`)
      let data = await res.json()
      setCart(data.cart)
    }
  }

  const loadMore = () => {
    setPage(page + 1)
  }
  const loadLess = () => {
    if (page > 1) {
      setPage(page - 1)

    }
  }
  console.log(page)

  let links = [
    { src: "https://img8.hkrtcdn.com/30284/bnr_3028347_o.jpg", href: "/sale" },
    { src: "https://img10.hkrtcdn.com/30289/bnr_3028889_o.jpg", href: "/kapiva" },
    { src: "https://img4.hkrtcdn.com/30262/bnr_3026173_o.jpg", href: "/protien" },
    { src: "https://img6.hkrtcdn.com/30048/bnr_3004765_o.jpg", href: "/gritzo" },
    { src: "https://img8.hkrtcdn.com/30230/bnr_3022927_o.jpg", href: "/gnc" },
    { src: "https://img2.hkrtcdn.com/30297/bnr_3029651_o.jpg", href: "/hkvitals" }
  ]

  const getProduct = async () => {
    const res = await fetch(`https://anishapi.onrender.com/products?page=${page}&limit=12`)
    const data = await res.json()
    setData(data.products)

  }



  useEffect(() => {

    getCart()


  }, [status])

  useEffect(() => {
    getProduct()



  }, [page])

  const increaseCart=(product)=>{
    console.log(product)
    setCart([...cart, product])
  }
  console.log(cart)

  return (
    <Box>
      <Header cart={cart} />
      <Navbar />
      <Carousel mt='2' p='4' mx='auto' alignItems='center' autoPlay={true} autoPlaySpeed={5000} infinite={true} showDots={false} removeArrowOnDeviceType={["tablet", "mobile"]} ssr={true} responsive={responsive}>
        {
          links.map((e, index) => {
            return <div key={index}><a href={e.href}><img src={e.src} alt='' /></a></div>

          })
        }
      </Carousel>;
      <Products products={data} increaseCart={increaseCart} />
      <Button onClick={loadLess} >
        Previous Page
      </Button>
      <Button onClick={loadMore}>
        Next Page
      </Button>
      <Footer />
    </Box>
  )
}

export default index