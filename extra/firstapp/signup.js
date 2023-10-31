import Header from '@/components/firstapp/Header'
import { Button, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

function signup() {
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" })
  const toast = useToast()

  const changeData = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
  }

  const checkCredintals = async () => {
    console.log(signUpData)
    let res = await fetch('https://anishapi.onrender.com/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData)
    })
  
    let data = await res.json()
   if (data.message === "User Signup Successful"){
    toast({
      title: data.message,
      status: "success",
      duration: 9000,
      isClosable: true
    })
    window.location.href = "/login"
   }else {
    toast({
      title: data.message,
      status: "error",
      duration: 9000,
      isClosable: true
    })
   }
  }

  return (

    <div>
    <Header />
      <h1 className='font-bold text-3xl mt-4 text-center max-[w]'>Sign up</h1>

      <div className="mt-8 ml-4 gap-4 ">
        <label className="font-bold mb-4">Name</label>
        <Input onChange={changeData} type="name" placeholder="Enter your name" name="name" />
      </div>
      <div className="mt-4 ml-4 gap-4 ">
        <label className="font-bold mb-4">Email Id</label>
        <Input onChange={changeData} type="email" placeholder="Enter your email" name="email" />
      </div>
      <div className="mt-4 ml-4 gap-4">
        <label className="font-bold ">Password</label>
        <Input onChange={changeData} type="password" placeholder="Enter your password" name="password" />
      </div>
      <Button onClick={checkCredintals} colorScheme="green" mt="2" rounded="xl" ml="4">SignUp</Button>
      <p>Already have an Account? <a href="/login">Login</a></p>
    </div>
  )
}

export default signup