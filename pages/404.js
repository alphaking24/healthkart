import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { Text } from '@chakra-ui/react'
import React from 'react'

function notFound() {
  return (
    <div>
    <Header />
    <Navbar />
    <Text> Sorry page not Found</Text>
    <Footer /> 
    </div>
  )
}

export default notFound