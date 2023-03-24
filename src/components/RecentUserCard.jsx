import { Avatar, Card, CardBody, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

const RecentUserCard = ({ fiveRecent }) => {
  return (
    <Flex gap={4} flexWrap="wrap">
      {fiveRecent.map((user, index) => {
        return (
          <Card w="150px" key={index}>
            <CardBody p={2} w="100%" textAlign="center" cursor="pointer">
              <Avatar />
              <Tooltip hasArrow label={user.username}>
                <Text isTruncated>{user.username}</Text>
              </Tooltip>
              <Text opacity="0.5" fontSize="10px">
                Joined on {user.createdAt.substr(0, 10)}
              </Text>
            </CardBody>
          </Card>
        );
      })}
    </Flex>
  );
};

export default RecentUserCard;
