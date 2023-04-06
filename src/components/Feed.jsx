import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { prefix } from "../apiconfig";
import Share from "./Share";
import Post from "./Post";
import { AuthContext } from "../context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(prefix + "posts/timeline/" + user._id);
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPost();
  }, [user._id]);
  return (
    <Box>
      <Share />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Box>
  );
};

export default Feed;
