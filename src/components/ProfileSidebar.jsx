import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { prefix } from "../apiconfig";
import { useNavigate } from "react-router-dom";
import { IoIosShareAlt, IoMdShareAlt } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { BiEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const ProfileSidebar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const { username } = user;
  const navigate = useNavigate();

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
            left={{ base: "calc(50% - 50px)", md: "30px" }}
            border="5px solid #fff"
            w="100px"
            h="100px"
            objectFit="cover"
            rounded="full"
          />
          <Menu placement="bottom-end">
            <MenuButton
              p={1}
              position="absolute"
              top="15px"
              right="15px"
              bg="none"
              as={Button}
              _active={{
                bg: "none",
              }}
              _hover={{
                bg: "none",
              }}
              rightIcon={<SlOptionsVertical size="1.2rem" />}
            ></MenuButton>
            <MenuList placement="top-start">
              {/* if it's not your profile you can't edit */}
              <MenuItem>
                Edit Profile
                <BiEdit size="20px" style={{ marginLeft: "auto" }} />
              </MenuItem>
              <MenuItem>
                Share Profile
                <IoIosShareAlt size="20px" style={{ marginLeft: "auto" }} />
              </MenuItem>
            </MenuList>
          </Menu>

          <Text
            fontSize="lg"
            fontWeight="bold"
            mt="50px"
            ml={{ base: "0", md: "35px" }}
            textAlign={{ base: "center", md: "left" }}
          >
            {user.fullName}
          </Text>
          <Text
            textAlign={{ base: "center", md: "left" }}
            ml={{ base: "0", md: "35px" }}
          >
            @{user.username}
          </Text>

          <Flex
            ml={{ base: "0px", md: "35px" }}
            alignItems="center"
            justifyContent={{ base: "center", md: "start" }}
          >
            <Box display="flex">
              <Text mr={2}>Follower - </Text>
              <Text fontWeight="bold">{user.followers?.length}</Text>
            </Box>
            <Center height="20px">
              <Divider orientation="vertical" mx={2} borderColor="gray" />
            </Center>
            <Box display="flex">
              <Text mr={2}>Following - </Text>
              <Text fontWeight="bold">{user.followings?.length}</Text>
            </Box>
          </Flex>

          <Flex gap="15px" ml="30px" justifyContent="left" mb="20px">
            {username !== currentUser.username
              ? user.username !== currentUser.username && (
                  <>
                    <Button colorScheme="gray" variant="outline">
                      Message
                    </Button>
                    <Button
                      className="rightBarFollowButton"
                      // onClick={clickHandler}
                      rightIcon={<FaPlus />}
                    >
                      Follow
                      {/* {following ? "Unfollow" : "Follow"}
                      {following ? (
                        <FaMinus style={{ marginLeft: "5px" }} />
                      ) : (
                        <FaPlus style={{ marginLeft: "5px" }} />
                      )} */}
                    </Button>
                  </>
                )
              : ``}
          </Flex>
        </Box>
      </Flex>
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
          <Flex
            key={friend._id}
            _hover={{
              bg: "gray.100",
            }}
            cursor="pointer"
            flexDir="column"
            mt={3}
            p="5px 12px"
            alignItems="center"
            boxShadow="md"
            rounded="md"
            onClick={() => {
              navigate(`/profile/${friend.username}`);
            }}
          >
            <Avatar src={friend.profilePicture} w="40px" h="40px" />
            <Box>
              <Text fontWeight="bold">{friend.fullName}</Text>
              <Text fontSize="14px" textAlign="center">
                {friend.username}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default ProfileSidebar;
