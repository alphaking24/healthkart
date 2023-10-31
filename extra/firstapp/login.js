import Header from '@/components/firstapp/Header'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'


function test() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const toast = useToast()

    const changeData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const checkCredintals = async () => {

        let res = await fetch('https://anishapi.onrender.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        let data = await res.json()


        if (data.message === "Login Successful") {
            toast({
                title: "Login Successful",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            window.location.href = "/product"
            localStorage.setItem("user", JSON.stringify(data.user))
        } else {
            toast({
                title: "Invalid Credentials",
                status: "error",
                duration: 9000,
                isClosable: true,
            })

        }


    }
    return (
        <div>
        <Header />
            <h1>Login page</h1>

            <Input onChange={changeData} type="email" placeholder="Enter your Email" name="email" />
            <Input onChange={changeData} type="password" placeholder="Enter your Password" name="password" />

            <Button onClick={checkCredintals} colorScheme="green" mt="2">Login</Button>
            <p>Dont have an Account? <a href="/signup">Register</a></p>
        </div>
    )
}

export default test
