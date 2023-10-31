import { Button, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

function addproduct() {
    const [addData, setAddData] = useState({ title: "", category: "", price: "", description: "", image: "" })
    const toast = useToast()

    const newProduct = (e) => {
        setAddData({ ...addData, [e.target.name]: e.target.value })
    }
    const checkCredintals = async () => {

        let res = await fetch('https://anishapi.onrender.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addData)
        })

        let data = await res.json()


        if (data.success ) {
            toast({
                title: "Product added successfully",
                status: "success",
                duration: 9000,
                isClosable: true
            })
            setAddData({ title: "", category: "", price: "", description: "", image: "" })
        } else {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 9000,
                isClosable: true
            })
        }
    }
    return (

        <div>
            <h1 className='font-bold text-3xl p-4 text-center max-[w] bg-green-500'>Add product</h1>
            <div className="maw-[w] mt-8 mb-8 ml-8 mr-8 border border-gray-200 p-4 shadow-xl rounded-xl">
                <div className="mt-8 ml-4 gap-4 ">
                    <label className="font-bold mb-4">Title</label>
                    <Input onChange={newProduct} type="text" placeholder="Enter product title" name="title" />
                </div>
                <div className="mt-4 ml-4 gap-4 ">
                    <label className="font-bold mb-4">Category</label>
                    <Input onChange={newProduct} type="text" placeholder="Enter product category" name="category" />
                </div>
                <div className="mt-4 ml-4 gap-4 ">
                    <label className="font-bold mb-4">Price</label>
                    <Input onChange={newProduct} type="number" placeholder="Enter product price" name="price" />
                </div>
                <div className="mt-4 ml-4 gap-4 ">
                    <label className="font-bold mb-4">Description</label>
                    <Input onChange={newProduct} type="text" placeholder="Enter product description" name="description" />
                </div>
                <div className="mt-4 ml-4 gap-4 ">
                    <label className="font-bold mb-4">Images</label>
                    <Input onChange={newProduct} type="text" placeholder="Enter product image" name="image" />
                </div>
                <Button onClick={checkCredintals} colorScheme="green" mt="4" ml="4" rounded="xl" mr="4">Add Product</Button>
            </div>
        </div>
    )
}


export default addproduct