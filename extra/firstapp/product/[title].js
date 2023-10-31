import Header from '@/components/firstapp/Header'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function page() {
  const router = useRouter()
  const { title } = router.query
  const [product, setProduct] = useState({})
  const [cart, setCart] = useState([])

  const getProduct = async () => {
    let data = await fetch(`https://fakestoreapi.com/products/${title}`)
    let res = await data.json()
    setProduct(res)
  }



  const addToCart = (product) => {
    let updatedCart = [product, ...cart]

    setCart(updatedCart)
    alert('Added to Cart')

  }


  useEffect(() => {
    if (title) {
      getProduct()
    }
  }, [router.isReady])


  return (
    <div>
      <Header total={cart.length} name={'Anish'} />
      <div className=' bg-yellow-400 text-2xl font-bold text-black mt-6 p-4'>
        <h1>Today Hot Deals</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mx-2 md:mx-8 lg:mx-16 xl:mx-32'>


        <div className='mt-8 justify-between border border-gray-200 rounded-xl p-4 shadow-xl hover:scale-105'>
          <img src={product.image} alt='' />
          <h2 className='font-bold mt-2'>{product.price}</h2>
          <p>{product.title}</p>
          <div className='flex justify-between'>
            <button onClick={() => addToCart(product)} className='bg-blue-500 rounded-xl p-2 text-white font-bold mt-2'>Buy Now</button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default page