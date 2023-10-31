import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import app from "./firebase/firebase";
import { signIn, signOut, useSession } from 'next-auth/react';
import { BsDatabase } from 'react-icons/bs';



function Login() {
    const { data: session, status } = useSession()



    const auth = getAuth(app);
    const [user, setUser] = useState({ name: '', email: '', phone: '' })
    const [otp, setOtp] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userFound, setUserFound] = useState(true)
    const [otpVerified, setOtpVerified] = useState(false)
    const toast = useToast()

    const { isOpen, onClose, onOpen } = useDisclosure()


    const handleChange = (e) => {
        setUser({ ...user, phone: e.target.value })
    }

    const sendOtp = async () => {
        setLoading(true)

        const phoneNumber = "+91" + user.phone;


        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
        appVerifier.render();
        return signInWithPhoneNumber(
            auth,
            phoneNumber,
            appVerifier
        )
            .then((res) => {
                setAuthenticated(res);
                setOtpSent(true);
                toast({
                    title: `OTP Sent`,
                    position: "top",
                    isClosable: true,
                    status: "success",
                });
                setLoading(false)
            })
            .catch((error) => {


                toast({
                    title: `Try Again`,
                    position: "top",
                    isClosable: true,
                    status: "error",
                })
                setLoading(false)
            });
    };

    const verifyCode = async () => {


        if (otp.length !== 6) {
            return;
        }
        setLoading(true);
        let code = otp * 1;

        await authenticated.confirm(code)
            .then(async (result) => {
                toast({
                    title: `OTP Verified`,
                    position: "top",
                    isClosable: true,
                    status: "success",
                });




                let data = await fetch('https://anishapi.onrender.com/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ phone: user.phone })
                })
                let response = await data.json()


                if (response.success) {
                    onClose()
                    setOtpVerified(true)
                    await signIn("credentials", response.user);

                } else {
                    setUserFound(response.success)
                    setOtpVerified(true)
                }
                setLoading(false)


            })
            .catch((error) => {
                toast({
                    title: `Wrong OTP`,
                    position: "top",
                    isClosable: true,
                    status: "error",

                });
                setLoading(false);



            });
    };
    const signUpUser = async () => {
        let res = await fetch('https://anishapi.onrender.com/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        })
        let data = await res.json()
        onClose()
        await signIn("credentials", data.user);

        toast({
            title: `Signup Successfull`,
            position: "top",
            isClosable: true,
            status: "success",

        });
    }

    // if (status === 'loading') {
    //     return <Text>Loading...</Text>
    // } 
    // else if (status === 'authenticated') {
    //     return <Text fontSize='sm'>{session.user.name.split(' ')[0]}</Text>
    // } else {
    return (
        <Box>
            {
                status === 'authenticated' ? <Flex gap='2' alignItems='center' >
                    <Text>{session.user.name.split(' ')[0]}</Text>
                    <Button fontSize='sm' h='32px' ml='2' rounded='3px' mr='8' width='126px' colorScheme='red' color='white' onClick={signOut}>Logout</Button>
                </Flex> :
                    <Button fontSize='sm' h='32px' ml='2' rounded='3px' mr='8' width='126px' bg="#00b5b7" _hover={{ bg: '#00b5b7' }} color='white' onClick={onOpen}>Login</Button>
            }
            <div id="recaptcha-container"></div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login or Signup</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* {
                            otpSent ? <label htmlFor="email">Otp</label> : <label htmlFor="email">Mobile No.</label>
                        }

                        {
                            otpSent ? <Input placeholder='Enter your Otp' value={otp} mb='4' mt='1' onChange={(e) => setOtp(e.target.value)} /> : null
                        }
                        {
                            !otpSent ? <Input placeholder='Enter your Phone Number' value={user.phone} mb='4' mt='1' onChange={handleChange} name='Mobile number' /> : null
                        } */}

                        {
                            !userFound && <Box>
                                <label>Name</label>
                                <Input placeholder='Enter your Name' value={user.name} mb='4' mt='1' onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            </Box>
                        }
                        {
                            !userFound && <Box>
                                <label>Email</label>
                                <Input placeholder='Enter your Email' value={user.email} mb='4' mt='1' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </Box>
                        }
                        {
                            !otpSent && !otpVerified && <Box>
                                <label>Phone</label>
                                <Input placeholder='Enter your Phone' value={user.phone} mb='4' mt='1' onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            </Box>
                        }
                        {
                            otpVerified && <Box>
                                <label>Phone</label>
                                <Input placeholder='Enter your Phone' value={user.phone} mb='4' mt='1' onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            </Box>
                        }
                        {
                            otpSent && userFound && <Box>
                                <label>Otp</label>
                                <Input placeholder='Enter your Name' value={otp} mb='4' mt='1' onChange={(e) => setOtp(e.target.value)} />
                            </Box>
                        }




                    </ModalBody>


                    <ModalFooter>
                        {
                            !userFound ? <Button className='w-full bg-green-500' mb='4' color='' onClick={signUpUser} isLoading={loading} disabled={loading}>
                                Register
                            </Button> : <Box>
                                {
                                    otpSent ? <Button className='w-full bg-green-500' mb='4' color='' onClick={verifyCode} isLoading={loading} disabled={loading}>
                                        Verify Otp
                                    </Button> : <Button className='w-full' mb='4' color='bg-gray-800' onClick={sendOtp} isLoading={loading} disabled={loading}>
                                        Get Otp
                                    </Button>
                                }

                            </Box>
                        }


                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Login