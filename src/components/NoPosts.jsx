import { Box, Text } from "@chakra-ui/react";
import React from "react";

const NoPosts = () => {
  return (
    <Box mt="10px">
      <Text fontSize="3xl" color="gray.600" fontWeight="bold">
        You have no posts
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        You and your friend's posts will be shown here.
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        Connect with people
      </Text>
    </Box>
  );
};

export default NoPosts;
