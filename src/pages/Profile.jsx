import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { prefix } from "../apiconfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdShareAlt } from "react-icons/io";
import Feed from "../components/Feed";
// background: linear-gradient(to right, #e1eec3, #f05053)

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${prefix}users?username=${username}`);
      console.log();
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <Flex w={{ base: "95%", lg: "90%" }} gap="1rem" m="1.5rem auto">
      {/* left */}
      <Box w="60%">
        {/* user info */}
        <Flex mb="30px" flexDir="column" boxShadow="md" rounded="15px">
          <Box
            h="150px"
            borderTopLeftRadius="15px"
            borderTopRightRadius="15px"
            bg="linear-gradient(to right, #FFBFA9, #F8CBA6, #FFACAC)"
          ></Box>
          <Box
            position="relative"
            borderBottomLeftRadius="15px"
            borderBottomRightRadius="15px"
          >
            <Image
              src={
                user.profilePicture
                  ? user.profilePicture
                  : `${prefix}images/person/user.png`
              }
              alt="profileImage"
              position="absolute"
              top="-50px"
              left="30px"
              border="5px solid #fff"
              w="100px"
              h="100px"
              objectFit="cover"
              rounded="full"
            />
            <Text
              fontSize="lg"
              fontWeight="bold"
              textAlign="left"
              mt="50px"
              ml="35px"
            >
              {user.fullName}
            </Text>
            <Text fontSize="16px" textAlign="left" ml="35px" mb="10px">
              @{user.username} - {user.email}
            </Text>
            <Flex gap="15px" ml="30px" justifyContent="left" mb="20px">
              <Button colorScheme="gray" variant="outline">
                Message
              </Button>
              <Button
                colorScheme="messenger"
                leftIcon={<IoMdShareAlt size="1.2rem" />}
              >
                Share profile
              </Button>
            </Flex>
          </Box>
        </Flex>
        {/* user posts */}
        <Heading textAlign="left">{user.fullName}'s Posts</Heading>
        <Feed username={username} />
      </Box>
      {/* right */}
      <Box w="40%"></Box>
    </Flex>
  );
};

export default Profile;
