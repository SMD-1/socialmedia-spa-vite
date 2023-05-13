import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../apiCall";
import { useNavigate } from "react-router-dom";

const CompleteSignup = () => {
  const [fullName, setFullname] = useState("");
  const [city, setCity] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.fullName) {
      navigate("/");
    }
  }, [user]);

  const id = user?._id;
  const fullNameChangeHandler = (e) => {
    setFullname(e.target.value);
    if (e.target.value.trim() === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const completeSignupHandler = () => {
    updateUser(
      {
        userId: id,
        fullName: fullName,
        location: city,
      },
      dispatch
    );
  };
  return (
    <Box>
      <Navbar />
      <Heading>One step away</Heading>
      <Text size="sm">Complete your sign-up</Text>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormControl
          w={{ base: "90%", sm: "70%", md: "400px" }}
          mt={"40px"}
          isRequired
        >
          <FormLabel>Full Name:</FormLabel>
          <Input
            onChange={fullNameChangeHandler}
            placeholder="Enter your FullName"
            type={"text"}
            value={fullName}
            variant="outline"
            outline={"none"}
            borderColor={"gray.400"}
            size="lg"
            required
          />
        </FormControl>
        <FormControl w={{ base: "90%", sm: "70%", md: "400px" }} mt={"20px"}>
          <FormLabel>City:</FormLabel>
          <Input
            onChange={(e) => setCity(e.target.value)}
            placeholder="Where are you from?"
            type={"text"}
            value={city}
            variant="outline"
            outline={"none"}
            size="lg"
            borderColor={"gray.400"}
          />
        </FormControl>
        <Button
          mt="40px"
          size="lg"
          colorScheme="blue"
          w={{ base: "90%", sm: "70%", md: "400px" }}
          onClick={completeSignupHandler}
          isDisabled={isDisabled}
        >
          Complete signup
        </Button>
      </form>
    </Box>
  );
};

export default CompleteSignup;
