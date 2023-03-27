import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const RecentUserCard = ({ fiveRecent }) => {
  return (
    <Flex
      gap={4}
      flexWrap="wrap"
      alignItems={{ base: "center", md: "normal" }}
      justifyContent={{ base: "center" }}
      p={{ base: "16px", md: "0px" }}
    >
      {fiveRecent.map((user, index) => {
        return (
          <Card w={{ base: "100%", md: "150px" }} key={index}>
            <Link to={`/profile/${user?.username}`}>
              <CardBody
                p={2}
                w="100%"
                cursor="pointer"
                display="flex"
                alignItems="center"
                flexDir={{ base: "row", md: "column" }}
              >
                <Avatar />
                <Stack
                  textAlign={{ base: "left", md: "center" }}
                  ml={{ base: "8px", md: "0" }}
                >
                  <Tooltip hasArrow label={user.username}>
                    <Text isTruncated>{user.username}</Text>
                  </Tooltip>
                  <Text opacity="0.5" fontSize="10px" mt="0px">
                    Joined on {user.createdAt.substr(0, 10)}
                  </Text>
                </Stack>
              </CardBody>
            </Link>
          </Card>
        );
      })}
    </Flex>
  );
};

export default RecentUserCard;
