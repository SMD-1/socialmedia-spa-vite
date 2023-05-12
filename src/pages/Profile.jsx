import { Box, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { prefix } from "../apiconfig";
import axios from "axios";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import ProfileSidebar from "../components/ProfileSidebar";
// background: linear-gradient(to right, #e1eec3, #f05053)

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${prefix}users?username=${username}`);
      // console.log("from profile", res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <Box
      w={{ base: "95%", lg: "90%" }}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      gap="2rem"
      m="1.5rem auto"
    >
      {/* left */}
      <Box w={{ base: "100%", md: "40%" }}>
        <ProfileSidebar user={user} />
      </Box>
      {/* right */}
      <Box w={{ base: "100", md: "60%" }}>
        {/* user posts */}
        <Heading textAlign="left">{user.fullName}'s Posts</Heading>
        <Feed />
      </Box>
    </Box>
  );
};

export default Profile;
