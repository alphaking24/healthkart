import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { Box,  useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Products from '@/components/Products'

function ProductMain() {
    const toast = useToast()
    
    const [productData, setProductData] = useState([])

    const productClick =() => {
        
    }
    
    const getProduct = async () => {
        const res = await fetch('https://anishapi.onrender.com/products')
        const data = await res.json()
        setProductData(data.products)
    }

    

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <div>
        <Header />
        <Navbar />
        <Box mt='4'>

        <Products  products={productData}  />

            

        </Box>
        <Footer />
        </div>
    )
}

export default ProductMain