import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
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
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const Links = ["Home", "Feed", "About"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Box fontWeight="bold" fontSize="18px" mr={{ base: "0", md: "20px" }}>
            {"<Assignment />"}
          </Box>
          <HStack
            as={"nav"}
            spacing={4}
            color="#666666"
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link} endPoint={link.toLowerCase()}>
                {link}
              </NavLink>
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
              {/* {!user && !user.data.user.photoURL ? ( */}
              <Avatar
                size="sm"
                src="https://ik.imagekit.io/1place/Notes/user_nWSGLM3AGj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677957308998"
              />
              {/* ) : (
                  <Avatar size={"md"} src={user.data.user.photoURL} />
                )} */}
            </MenuButton>
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
                {link}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
