import { Box, Button, Card, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RecentUserCard from "./RecentUserCard";
import axios from "axios";

const Rightside = () => {
  const [fiveMostrecent, setFiveMostRecent] = useState([]);
  useEffect(() => {
    const fetchFiveMostRecent = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4100/users/fiveMostrecent"
        );
        console.log(res.data);
        setFiveMostRecent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiveMostRecent();
  }, []);
  return (
    <Card p={4} textAlign="left">
      <Heading mb={4}>MOST RECENT USER</Heading>
      <RecentUserCard fiveRecent={fiveMostrecent} />
      <Button colorScheme="blue" mt={4}>
        View All
      </Button>
    </Card>
  );
};

export default Rightside;
