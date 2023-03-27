import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RecentUserCard from "./RecentUserCard";
import axios from "axios";
import { prefix } from "../apiconfig";

const Rightside = () => {
  const [fiveMostrecent, setFiveMostRecent] = useState([]);
  const [recent, setRecent] = useState([]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  useEffect(() => {
    const mostRecent = async () => {
      try {
        const res = await axios.get(`${prefix}users/mostrecent`);
        setRecent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchFiveMostRecent = async () => {
      try {
        const res = await axios.get(`${prefix}users/fiveMostrecent`);
        setFiveMostRecent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiveMostRecent();
    mostRecent();
  }, []);
  return (
    <Card p={{ base: "0", md: "16px" }} textAlign="left">
      <Heading
        mb={{ base: "0px", md: "16px" }}
        p={{ base: "16px 16px 0px", md: "0px" }}
      >
        MOST RECENT USER
      </Heading>
      <RecentUserCard fiveRecent={fiveMostrecent} />
      <Button
        colorScheme="blue"
        mt={4}
        onClick={isModalOpen ? onModalClose : onModalOpen}
      >
        View All
      </Button>
      {isModalOpen && (
        <Modal
          size="sm"
          isOpen={isModalOpen}
          onClose={onModalClose}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>All Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {recent.map((user) => {
                return (
                  <Flex
                    justifyContent="left"
                    alignItems="center"
                    mb={3}
                    key={user.email}
                    boxShadow="md"
                    p="5px 10px"
                    rounded="md"
                  >
                    <Avatar />
                    <Box ml={3}>
                      <Text fontWeight="bold">{user.username}</Text>
                      <Text opacity="0.5" fontSize="10px">
                        Joined on {user.createdAt.substr(0, 10)}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default Rightside;
