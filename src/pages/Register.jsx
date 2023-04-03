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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { prefix } from "../apiconfig";
import { loginCall } from "../apiCall";

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
    console.log(
      username.current.value,
      email.current.value,
      password.current.value,
      passwordAgain.current.value
    );
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
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const newUser = await axios.post(prefix + "auth/register", user);
        console.log(newUser);
        loginCall(
          {
            email: email.current.value,
            password: password.current.value,
          },
          dispatch
        );
        toast("Registered Successfully!", {
          position: "top-right",
          type: "success",
          theme: "dark",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        // yahan ayega error aur hoga toastify
        toast(err.message, {
          position: "top-right",
          type: "error",
          theme: "dark",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // console.log(err.message);
      }
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
          placeholder="Confirm password *"
          ref={passwordAgain}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
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
