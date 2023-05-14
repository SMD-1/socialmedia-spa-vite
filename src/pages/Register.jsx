import { useContext, useEffect, useRef, useState } from "react";
import {
  Input,
  Box,
  Flex,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
  Center,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { registerCall } from "../apiCall";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const { user, isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const registerHandler = async () => {
    if (
      username.current.value.trim() === "" ||
      email.current.value.trim() === "" ||
      password.current.value.trim() === "" ||
      passwordAgain.current.value.trim() === ""
    ) {
      toast("Please fill required details", {
        position: "top-right",
        type: "warning",
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (passwordAgain.current.value !== password.current.value) {
      return toast("Password and Confirm password doesn't match", {
        position: "top-right",
        type: "warning",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      registerCall(
        {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
    }
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
      <FormControl
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"40px"}
        isRequired
      >
        <FormLabel fontWeight="bold">Username : </FormLabel>
        <Input
          placeholder="Enter your username *"
          size="lg"
          type={"text"}
          variant="outline"
          outline={"none"}
          borderColor={"gray.400"}
          ref={username}
        />
      </FormControl>
      {/* email */}
      <FormControl
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"20px"}
        isRequired
      >
        <FormLabel fontWeight="bold">Email : </FormLabel>
        <Input
          placeholder="Enter your email *"
          size="lg"
          type={"email"}
          variant="outline"
          outline={"none"}
          borderColor={"gray.400"}
          ref={email}
        />
      </FormControl>
      {/* password */}
      <FormControl
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"20px"}
        isRequired
      >
        <FormLabel fontWeight="bold">Password : </FormLabel>
        <InputGroup
          size="lg"
          w={{ base: "90%", sm: "70%", md: "400px" }}
          borderColor={"gray.400"}
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
      </FormControl>
      {/* password Again */}
      <FormControl
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"20px"}
        isRequired
      >
        <FormLabel fontWeight="bold">Password Again : </FormLabel>
        <InputGroup
          size="lg"
          w={{ base: "90%", sm: "70%", md: "400px" }}
          borderColor={"gray.400"}
        >
          <Input
            outline={"none"}
            pr="4.5rem"
            variant="outline"
            type={show ? "text" : "password"}
            placeholder="Confirm password *"
            ref={passwordAgain}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* register button */}
      <Button
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt="40px"
        size={"lg"}
        border="2px solid rgba(255, 255, 255, 0.1)"
        colorScheme={"blue"}
        onClick={registerHandler}
        isDisabled={isFetching}
      >
        Register
      </Button>
      {/* Already have an account */}
      <Flex
        justifyContent="center"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        alignItems="center"
        mt={"30px"}
      >
        <Box>Already have an account?</Box>
        <Link to="/login">
          <Button colorScheme="blue" ml={2} variant="ghost">
            Login
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Register;
