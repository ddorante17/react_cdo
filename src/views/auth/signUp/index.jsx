import React, {useState} from "react";
import {useHistory} from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
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
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";
import db from "../../../firebase";
import {useAuth} from "../../../contexts/AuthContext";
import useMounted from "../../../hooks/useMounted";
import {ref, set} from "firebase/database"

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const { register } = useAuth();
  const mounted = useMounted();
  const handleSignUp = () => {
    if(!confPassword || !password){
      toast({
        description: 'Debe definir una contraseña',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    setIsSubmiting(true);
    register(email, password)
        .then((response) => {
          console.log(response);
          console.log(response.user.uid);
          const userRef = ref(db, "users/" + response.user.uid);
          //const newUserRef = push(userRef);
          set(userRef, {
            userUid: response.user.uid,
            firstName: name,
            lastName: lastname,
            phone: phone,
            email: email
          })
          history.push("/admin/default");
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
            Registrar Usuario
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Ingresa tus datos en el formulario!
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
              Nombre<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                ms={{ base: "0px", md: "0px" }}
                type='text'
                placeholder='maria'
                mb='24px'
                fontWeight='500'
                size='lg'
            />
            <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
              Apellido<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                value={lastname}
                onChange={(e)=> setLastname(e.target.value)}
                ms={{ base: "0px", md: "0px" }}
                type='text'
                placeholder='Aguilar'
                mb='24px'
                fontWeight='500'
                size='lg'
            />
            <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
              Telefono<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                value={phone}
                onChange={(e)=> setPhone(e.target.value)}
                ms={{ base: "0px", md: "0px" }}
                type='text'
                placeholder='0212-2661075'
                mb='24px'
                fontWeight='500'
                size='lg'
            />
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
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Clave<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 caracteres'
                mb='24px'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />

              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
              Confirma tu clave<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Min. 8 caracteres'
                  mb='24px'
                  value={confPassword}
                  onChange={(e)=> setConfPassword(e.target.value)}
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
              />

              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>

            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              onClick={handleSignUp}
              w='100%'
              h='50'
              isLoading={isSubmiting}
              mb='24px'>
              Registrar usuario
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}
export default SignUp;
