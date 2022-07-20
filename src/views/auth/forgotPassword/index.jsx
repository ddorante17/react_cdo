
import React, {useEffect, useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {auth} from "../../../firebase";
import {useAuth} from "../../../contexts/AuthContext";
import useMounted from "../../../hooks/useMounted";

function ForgotPassword() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
        { bg: "gray.200" },
        { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.200" }
    );
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const toast = useToast();

    const { forgotPassword } = useAuth();
    const mounted = useMounted();

    const handleForgot = () => {
        if(!email){
            toast({
                description: 'Debe ingresar su email!',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
        setIsSubmiting(true);
        forgotPassword(email)
            .then((response) => {
                console.log(response);
                toast({
                    description: 'Correo enviado, chequea tu correo.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                })
            })
            .catch((error) => {
                console.log(error.message);
                toast({
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            }).finally(()=> {
            mounted.current && setIsSubmiting(false);
        });
    };
    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                w='100%'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "14vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Recuperar clave
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Ingresa tu correo para recuperar tu clave!
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "420px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>

                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Correo<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='mail@gmail.com'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                        />
                        <Flex justifyContent='space-between' align='center' mb='24px'>
                            <NavLink to='/auth/signIn'>
                                <Text
                                    color={textColorBrand}
                                    fontSize='sm'
                                    w='124px'
                                    fontWeight='500'>
                                    Login
                                </Text>
                            </NavLink>
                        </Flex>
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            onClick={handleForgot}
                            w='100%'
                            h='50'

                            mb='24px'>
                            Sign In
                        </Button>
                    </FormControl>

                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default ForgotPassword;
