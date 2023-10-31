import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import Products from '@/components/Products'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'


function kapiva() {
    const [products, setProducts] = useState([])


    const router = useRouter()
   
    const {category} = router.query
    console.log(router.query)
  

    const getProduct = async () => {
        const res = await fetch(`https://anishapi.onrender.com/products?category=${category}`)
        const data = await res.json()
    
       if (data.products.length === 0){
        router.push('/404')
       }
        setProducts(data.products)
    }

    useEffect(() => {
        if (category){
            
            getProduct()
        }
    }, [router.isReady])
    return (

        <div>
            <Header />
            <Navbar />
            <Products products={products} />
            <Footer />
        </div>
    )
}

export default kapiva