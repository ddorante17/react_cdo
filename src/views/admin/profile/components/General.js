// Chakra imports
import {
  Box, Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, {useRef, useState} from "react";
import "../../../../assets/css/Upload.css";
import Information from "views/admin/profile/components/Information";
import {RiEyeCloseLine} from "react-icons/ri";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {child, get, ref} from "firebase/database";
import {useAuth} from "../../../../contexts/AuthContext";
import db from "../../../../firebase";
import uploadImg from '../../../../assets/img/profile/cloud-upload-regular-240.png'
import { ref as ref_storage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../../firebase'

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorSecondary = "gray.400";
  const textColor = useColorModeValue("navy.700", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [midleName, setMidleName] = useState('');
  const [lastname, setLastname] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photoImg, setPhotoImg] = useState('');
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {currentUser} = useAuth();
  const refDb = ref(db);

  get(child(refDb, "person/" + currentUser.person_uid)).then((snapshot) => {
    const person = snapshot.val();
    console.log(person);
    setEmail(person.email);
    setName(person.firstName);
    setMidleName(person.midleName ? person.midleName : '');
    setLastname(person.lastName);
    setSurname(person.surname ? person.surname : '');
    setPhone(person.phone);
    setAddress(person.address ? person.address : '');
    setPhotoImg(person.urlPhoto ? person.urlPhoto : uploadImg)
  });
  const save = () => {

  }
  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile == null) return;

    let fileName = "profile" + currentUser.person_uid;
    const imageRef = ref_storage(storage, `images/profile/${fileName}`);
    uploadBytes(imageRef, newFile).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setPhotoImg(url);
      });
    })
    //setPhotoImg(URL.createObjectURL(newFile));
  }
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
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
          mt={{ base: "40px", md: "1vh" }}
          flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Mis datos
          </Heading>
          <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'>
            Ingresa tus datos en el formulario para actualizar!
          </Text>
        </Box>
        <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "650px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>

          <FormControl>
            <SimpleGrid
                columns={{ base: 1, md: 2}}
                gap='20px'
                mb='20px'>
              <div>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                  Primer nombre<Text color={brandStars}>*</Text>
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
              </div>
              <div>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                  Segundo nombre<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    value={midleName}
                    onChange={(e)=> setMidleName(e.target.value)}
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Aguilar'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                />
              </div>
              <div>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                  Primer apellido<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    value={lastname}
                    onChange={(e)=> setLastname(e.target.value)}
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='maria'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                />
              </div>
              <div>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                  Segundo apellido<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    value={surname}
                    onChange={(e)=> setSurname(e.target.value)}
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Aguilar'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                />
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
                <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}>
                  <div className="drop-file-input__label">
                    <img src={photoImg} alt="" />
                    <p>Drag & Drop your files here</p>
                  </div>
                  <input type="file" value="" onChange={onFileDrop}/>
                </div>
              </div>
           {/*   <div>
                photoImg ? (
                {
                      <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                          Ready to upload
                        </p>
                        <div className="drop-file-preview__item">
                          <img src={photoImg} alt="" />
                        </div>
                      </div>
                  ) : null
                }
              </div>*/}
            </SimpleGrid>

            <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
              Dirección
            </FormLabel>
            <InputGroup size='md'>
              <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Calle, Avenida, zona, edificio/casa'
                  mb='24px'
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}
                  size='lg'
                  type={"text"}
                  variant='auth'
              />
            </InputGroup>

            <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                onClick={save}
                w='100%'
                h='50'
                isLoading={isSubmiting}
                mb='24px'>
              Guardar
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </Card>
  );
}
