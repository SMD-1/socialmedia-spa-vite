import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";

const Links = ["Home", "Feed", "About"];

const NavLink = ({ children, endPoint }) => (
  <Link
    px={4}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={endPoint == "home" ? "/" : `/${endPoint}`}
  >
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(AuthContext);

  return (
    <Box
      // bg={useColorModeValue("gray.100", "blue.900")}
      bg="gray.100"
      px="2rem"
      w="full"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <GrClose /> : <GiHamburgerMenu />}
          aria-label={"Open Menu"}
          display={{ base: "flex", md: "none" }}
          justifyContent="center"
          alignItems="center"
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Heading fontSize="25px" mr={{ base: "0", md: "20px" }}>
            LOGO
          </Heading>
          <HStack
            as={"nav"}
            spacing={4}
            color="#666666"
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <Button
                variant="ghost"
                colorScheme="gray"
                px={2}
                rounded="none"
                _hover={{
                  // bg: useColorModeValue("gray.200", "gray.700"),
                  borderBottom: "2px solid red",
                }}
                key={link}
              >
                <NavLink endPoint={link.toLowerCase()}>{link}</NavLink>
              </Button>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              mr={2}
              // onClick={isModalOpen ? onModalClose : onModalOpen}
            >
              {user && user.profilePicture ? (
                <Avatar
                  size="sm"
                  src="https://ik.imagekit.io/1place/Notes/user_nWSGLM3AGj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677957308998"
                />
              ) : (
                <Avatar size={"md"} src={user.profilePicture} />
              )}
            </MenuButton>
            <MenuList>
              <Link to="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuDivider />
              <Link to="/login">
                <MenuItem onClick={logout}>
                  Signout
                  <TbLogout size="20px" style={{ marginLeft: "auto" }} />
                </MenuItem>
              </Link>
            </MenuList>
            {/* <ThemeToggler /> */}
          </Menu>
        </Flex>
      </Flex>

      {/* {isModalOpen && (
          <ProfileEditor
            isModalOpen={isModalOpen}
            onModalClose={onModalClose}
            user={user}
          />
        )} */}

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link} endPoint={link.toLocaleLowerCase()}>
                <Box _hover={{ bg: "gray.200" }} p={1}>
                  {link}
                </Box>
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
