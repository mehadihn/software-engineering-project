/**
 * Defined SignUp functionality.
 */
import React, { useState } from "react";
import { useRouter } from 'next/router'
import Head from "next/head"
import { InputGroup, Card, Select,InputRightElement, InputLeftElement, Input, 
        Center, IconButton,FormControl, useToast,  } from "@chakra-ui/react";
import { LockIcon, EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Box,useColorModeValue,SimpleGrid,Button,Image,chakra,Stack } from "@chakra-ui/react";
import { MdSupervisorAccount, MdPerson, MdAppRegistration } from 'react-icons/md'
import type { NextPage } from "next";

/**
 * Creates a User interface for Sign up.
 * A form will appear asking for user input i.e. full name, email, password, confirm password and role.
 * If success it will direct to the login page.
*/

const signUp: NextPage = () => {
// export default function signUp() {
    const cardStyle = {
        opacity: 0.95
    }

    const [showPass, setShowPass] = useState(false);
    const handleShowPass = () => setShowPass(!showPass);
    const toast = useToast();

    const router = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        toast({
            title: "Success",
            description: "The Backend Integration will be done in next sprint!!",
            status: "success",
            duration: 3000,
            isClosable: true,
            colorScheme: "gray",
          });
        router.replace("/")
    }
    return (
        <>
            <Box mx="auto" h={"100vh"} bg={"yellow.100"}>
                <Head>
                    <title>Quiz | Home</title>
                </Head>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={0}
                    _after={{
                        opacity: 0.95,
                        pos: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: -1,
                        content: '" "',
                    }}
                    bg={"yellow.100"}
                >
                    <Box
                        textAlign="center"
                        w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
                        m="auto"
                    >
                        <chakra.h1
                            fontSize={{ base: "4xl", sm: "3xl", md: "4xl" }}
                            letterSpacing="tight"
                            lineHeight="short"
                            fontWeight="extrabold"
                            color={useColorModeValue("gray.300", "gray.300")}
                        >
                            <chakra.span
                                display={{ base: "block", xl: "inline" }}
                                color={"gray.300"}
                            >
                                Sign Up{" "}
                            </chakra.span>
                        </chakra.h1>

                        <Card bgColor='#E7DEEA'
                            maxWidth='80vw' minHeight="68vh"
                            borderRadius={'30px'} sx={cardStyle}
                            marginStart={20}
                            mt={10}
                        >
                        <form action="" method="post" onSubmit={handleSubmit}>

                        <Stack spacing={6} mt={14} marginStart={8} marginEnd={8}
                        >
                            <FormControl id="name" isRequired>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='yellow.400'
                                        fontSize='1.4em'
                                        children={<MdPerson color='yellow.400' />}
                                    />
                                    <Input id="name" bg='yellow.400' marginLeft={10} marginEnd={10} type='text' placeholder='Full Name' textColor={'white'} required/>
                                </InputGroup>
                           </FormControl>

                           <FormControl id="email" isRequired>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.4em'
                                        children={<EmailIcon color='yellow.400' />}
                                    />
                                    <Input id="email" bg='yellow.400' marginLeft={10} marginEnd={10} type='email' placeholder='Email ID' textColor={'white'} required/>
                                </InputGroup>
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children={<LockIcon color='yellow.400' />}
                                    />
                                    <Input  id="password" bg='yellow.400' marginLeft={10} marginEnd={10} type={showPass ? "text" : "password"} placeholder='Password' textColor={'white'} required/>
                                    <InputRightElement>
                                        <IconButton
                                            size={"sm"}
                                            aria-label={"password"}
                                            marginEnd={20}
                                            icon={
                                                showPass ? <ViewIcon /> : <ViewOffIcon />
                                            }
                                            _hover={{
                                                bg: "gray.800",
                                            }}
                                            color='gray.500'
                                            isRound
                                            onClick={handleShowPass}
                                            bg={'yellow.400'}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <FormControl id="confirmPassword" isRequired>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children={<LockIcon color='yellow.400' />}
                                    />
                                    <Input id="confirmPassword" bg='yellow.400' marginLeft={10} marginEnd={10} type={showPass ? "text" : "password"} placeholder='Confirm Password' textColor={'white'} required/>
                                    <InputRightElement>
                                        <IconButton
                                            size={"sm"}
                                            aria-label={"password"}
                                            marginEnd={20}
                                            icon={
                                                showPass ? <ViewIcon /> : <ViewOffIcon />
                                            }
                                            _hover={{
                                                bg: "gray.800",
                                            }}
                                            color='gray.500'
                                            isRound
                                            onClick={handleShowPass}
                                            bg={'yellow.400'}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                        <FormControl id="role" isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='yellow.400'
                                    fontSize='1.2em'
                                    children={<MdSupervisorAccount color='yellow.400' />}
                                />
                                <Select id="role" bg='yellow.400' marginLeft={10} marginEnd={10} textColor={'gray.500'} placeholder='Select Role' required>
                                <option value='option1'>Student</option>
                                <option value='option2'>Admin</option>
                                </Select>
                            </InputGroup>
                        </FormControl>

                            <Center h='50px' color='white'>
                            <Button width={40} height={10} bg={useColorModeValue("yellow.400", "yellow.400") } 
                                textColor={"white"}  size="lg"  marginBottom={6} marginTop={4}
                                leftIcon={<MdAppRegistration />}
                                type="submit"

                                // onClick={() => router.replace("/")}
                                _hover={{
                                    bg: "gray.500",
                                  }}
                            >
                                {" "}
                                Sign Up
                            </Button>
                            </Center>
                        </Stack>
                        </form>

                    </Card>

                    </Box>
                    <Box>

                        <Image
                            src="/img/mind_start.jpeg"
                            alt="quiz"
                            fit="cover"
                            h={"100vh"}
                            bg="gray.100"
                            loading="lazy"
                        />
                    </Box>
                </SimpleGrid>
            </Box>
        </>
    )
}
export default signUp;
