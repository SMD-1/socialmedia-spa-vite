import { useRef, useState } from "react";
import {
  Input,
  Box,
  Flex,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  //   const navigate = useNavigate();

  const registerHandler = () => {
    console.log(
      username.current.value,
      email.current.value,
      password.current.value,
      passwordAgain.current.value
    );
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Box display="flex" flexDir="column" textAlign="center">
        <Heading as="h1" size="xl">
          Welcome Aboard
        </Heading>
        <Center letterSpacing="1px">Create Your Account</Center>
      </Box>
      {/* username */}
      <Input
        placeholder="Enter your username *"
        size="lg"
        type={"text"}
        variant="outline"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"40px"}
        outline={"none"}
        borderColor={"gray.400"}
        ref={username}
      />
      {/* email */}
      <Input
        placeholder="Enter your email *"
        size="lg"
        type={"email"}
        variant="outline"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"20px"}
        outline={"none"}
        borderColor={"gray.400"}
        ref={email}
      />
      {/* password */}
      <InputGroup
        size="lg"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        borderColor={"gray.400"}
        mt={"20px"}
      >
        <Input
          outline={"none"}
          pr="4.5rem"
          variant="outline"
          type={show ? "text" : "password"}
          placeholder="Enter your password *"
          ref={password}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* password Again */}
      <InputGroup
        size="lg"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        borderColor={"gray.400"}
        mt={"20px"}
      >
        <Input
          outline={"none"}
          pr="4.5rem"
          variant="outline"
          type={show ? "text" : "password"}
          placeholder="Enter your password *"
          ref={passwordAgain}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* login button */}
      <Button
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt="40px"
        size={"lg"}
        border="2px solid rgba(255, 255, 255, 0.1)"
        colorScheme={"blue"}
        onClick={registerHandler}
      >
        LOGIN
      </Button>
      {/* Don't have an account */}
      <Flex
        justifyContent="center"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        alignItems="center"
        mt={"30px"}
      >
        <Box>Already have an account?</Box>
        <Link to="/login">
          <Button colorScheme="blue" ml={2} variant="ghost">
            Signup
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Register;
