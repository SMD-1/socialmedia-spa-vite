import { useRef, useState, useContext, useEffect } from "react";
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
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { loginCall } from "../apiCall";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { user, dispatch, isFetching } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const loginHandler = () => {
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if (password.length > 6) {
      console.log("length", password.length);
    }
    if (password.current.value.length > 6) {
      console.log("current value", password.current.value.length);
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
          Welcome Back
        </Heading>
        <Center letterSpacing="1px">Login into Account</Center>
      </Box>
      {/* email */}
      <Input
        placeholder="Enter your email *"
        size="lg"
        type={"email"}
        variant="outline"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        mt={"40px"}
        outline={"none"}
        borderColor={"gray.400"}
        required
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
          minLength="6"
          required
          ref={password}
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
        onClick={loginHandler}
        isDisabled={isFetching}
      >
        {isFetching ? "Loading..." : "Login"}
      </Button>
      {/* Don't have an account */}
      <Flex
        justifyContent="center"
        w={{ base: "90%", sm: "70%", md: "400px" }}
        alignItems="center"
        mt={"30px"}
      >
        <Box>Don't Have an Account?</Box>
        <Link to="/register">
          <Button colorScheme="blue" ml={2} variant="ghost">
            Signup
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Login;
