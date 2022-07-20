
import React, {useEffect, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
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
import {auth} from "../../../firebase";
import {useAuth} from "../../../contexts/AuthContext";
import useMounted from "../../../hooks/useMounted";
import {RiEyeCloseLine} from "react-icons/ri";
import {MdOutlineRemoveRedEye} from "react-icons/md";

function useQuery(){
    const location = useLocation();
    return new URLSearchParams(location.search)
}
function ResetPasswordPage() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const history = useHistory();
    const [newPassword, setNewPassword] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const toast = useToast();

    const { resetPassword } = useAuth();
    const mounted = useMounted();
    const query = useQuery()
    console.log(query.get('mode'))
    console.log(query.get('oobCode'))
    console.log(query.get('continueUrl'))

    const handleReset = () => {
        if(!newPassword){
            toast({
                description: 'Debe ingresar un password!',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
        setIsSubmiting(true);
        resetPassword(query.get('oobCode'), newPassword)
            .then((response) => {
                console.log(response);
                toast({
                    description: 'Tu clave ha sido cambiada, intenta loguearte.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                })
                history.push('/singUp')
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
                        Restablecer contraseña
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
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Nueva clave<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='Min. 8 caracteres'
                                mb='24px'
                                value={newPassword}
                                onChange={(e)=> setNewPassword(e.target.value)}
                                size='lg'
                                type={"password"}
                                variant='auth'
                            />
                        </InputGroup>
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
                            onClick={handleReset}
                            w='100%'
                            h='50'

                            mb='24px'>
                            Reset password
                        </Button>
                    </FormControl>

                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default ResetPasswordPage;
