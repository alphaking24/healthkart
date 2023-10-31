import React, { use, useEffect, useState } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Stack,
    FormLabel,
    Spinner,
    Input,
    PinInput,
    PinInputField,
    HStack,
    Text,
    Box,
    Img,
    useToast,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";


import Link from "next/link";


import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import app from "../components/firebase/firebase";
import { useRouter } from "next/router";
function Login() {

    const auth = getAuth(app);

    const [Number, setNumber] = useState("0");
    const [Authinicated, setAuthinicated] = useState(false);
    const [otpSented, setOtpSented] = useState(true);
    const [Otp, setOtp] = useState("");
    const [otpVerification, setOtpVerification] = useState(false);
    const [loading1, setLoading] = useState(false);
    const [loading, setLoading1] = useState(false);
    const [error, setError] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();
    const toast = useToast();
    const router = useRouter();
    const [message, setMessage] = useState('')
        useEffect(() => {
        if (message === "User does not exist") {

            setOtpVerification(true);

        }
        if (message === "User exists") {
            //use next Auth here
            onClose();
            console.log("hI")


        }
    }, [message]);


    const sendOtp = () => {
        // signIn("credentials", { phone: Number, callbackUrl: "/" });
        if (
            Number.length > 10 ||
            Number.length < 10 ||
            Number === "" ||
            Number === undefined
        ) {
            console.log(Number + "number");

        }

        const phoneNumber = "+91" + Number;

        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {size:'invisible'})
        appVerifier.render();
        return signInWithPhoneNumber(
            auth,
            phoneNumber,
            appVerifier
        )
            .then((res) => {
                console.log(res);
                setAuthinicated(res);
                setOtpSented(false);
                toast({
                    title: `OTP Sent`,
                    position: "top",
                    isClosable: true,
                    status: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                onClose();
                setLoading(false);
                toast({
                    title: `Try Again`,
                    position: "top",
                    isClosable: true,
                    status: "error",
                });
            });
    };

    const verifyCode = async () => {
        setLoading(true);
        if (Otp.length !== 6) {
            return;
        }
        let code = Otp * 1;

        await Authinicated.confirm(code)
            .then((result) => {
                toast({
                    title: `OTP Verified`,
                    position: "top",
                    isClosable: true,
                    status: "success",
                });
                dispatch(login({ phone: Number }));
                const user = result.user;
                // setOtpVerification(true);
                setLoading(false);

            })
            .catch((error) => {
                // onClose();
                toast({
                    title: `Worng OTP`,
                    position: "top",
                    isClosable: true,
                    status: "error",

                });
                setLoading(false);
            });
    };
    const handleChange = (e) => {
        setOtp(e);
    };
    return (
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login or Signup</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label htmlFor="email">Mobile No.</label>

      <input
        type="text"
        placeholder="Phone Number"
        value={Number}
        onChange={(e) => setNumber(e.target.value)}
      />



          </ModalBody>

          <ModalFooter>
      <button onClick={sendOtp}>Send OTP</button>
    
          </ModalFooter>
        </ModalContent>
      </Modal>
      <button onClick={onOpen}>Send OTP</button>
      <div id="recaptcha-container"></div>
      {/* <input
        type="text"
        placeholder="OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      /> */}
      {/* <button onClick={handleVerifyOTP}>Verify OTP</button> */}
    </div>
    )
}




export default Login;