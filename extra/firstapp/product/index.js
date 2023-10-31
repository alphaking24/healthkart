import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'

function blog() {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
 



  const getProducts = async () => {
    let data = await fetch('https://anishapi.onrender.com/products')
    let res = await data.json()
    setProducts(res.products)
  }
  const deleteProduct = (id) => {
    let filteredProducts = products.filter(p => p.id != id)
    setProducts(filteredProducts)

  }
  const addToCart = (product) => {
    let updatedCart = [product, ...cart]

    setCart(updatedCart)
    console.log(cart)
    alert('Added to Cart')

  }


  console.log(cart)
  useEffect(() => {
    getProducts()
    let getUser = JSON.parse(localStorage.getItem('user'))
    console.log(getUser)
    if (!getUser) {
      window.location.href = "/login"
    }
  }, [])


  return (
    <div>
      <Header />
      <div className=' bg-yellow-400 text-2xl font-bold text-black mt-6 p-4'>
        <h1>Today Hot Deals</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mx-2 md:mx-8 lg:mx-16 xl:mx-32'>

        {
          products.map((product, i) => {
            return <div key={i} className='mt-8 justify-between border border-gray-200 rounded-xl p-4 shadow-xl hover:scale-105'>
              <img src={product.image} alt='' />
              <h2 className='font-bold mt-2'>{product.price}</h2>
              <p>{product.title}</p>
              <div className='flex justify-between'>
                <a href={`./product/${product.id}`}><button className='bg-blue-500 rounded-xl p-2 text-white font-bold mt-2'>Buy Now</button></a>
                <button onClick={() => deleteProduct(product.id)} className='bg-red-500 rounded-xl p-2 text-white font-bold mt-2'>Delete</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default blog