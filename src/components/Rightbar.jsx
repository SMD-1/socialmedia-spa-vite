import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { prefix } from "../apiconfig";
import { Link } from "react-router-dom";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${prefix}users/friends/${user._id}`
        );
        console.log("Friend List", friendList.data);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (user.followings?.length > 0) getFriends();
  }, [user]);
  return (
    <Flex flexDir="column">
      <Box>
        <Heading textAlign="left" mb={4}>
          User Info
        </Heading>
        <Stack direction={"column"}>
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="lg" fontWeight="600">
              Email :
            </Text>
            <Text ml={1} fontSize="lg">
              {user.email}
            </Text>
          </Flex>
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="lg" fontWeight="600">
              From :
            </Text>
            <Text ml={1} fontSize="lg">
              {user.location}
            </Text>
          </Flex>
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="lg" fontWeight="600">
              Department :
            </Text>
            <Text ml={1} fontSize="lg">
              {user.department}
            </Text>
          </Flex>
        </Stack>

        <Heading mt={8} textAlign="left">
          Following
        </Heading>
        <Box textAlign="left" display="flex" flexWrap="wrap" gap={4}>
          {friends.map((friend, index) => (
            <Link key={friend._id} to={`${prefix}profile/${friend.username}`}>
              <Flex
                _hover={{
                  bg: "gray.100",
                }}
                cursor="pointer"
                mt={3}
                p="5px 12px"
                alignItems="center"
                boxShadow="md"
                rounded="md"
              >
                <Avatar src={friend.profilePicture} w="40px" h="40px" />
                <Box display="flex" flexDir="column">
                  <Text ml={2} fontWeight="bold">
                    {friend.fullName}
                  </Text>
                  <Text ml={2} fontSize="14px">
                    {friend.username}
                  </Text>
                </Box>
              </Flex>
            </Link>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default Rightbar;
