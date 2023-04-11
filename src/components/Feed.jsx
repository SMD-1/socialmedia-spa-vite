import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { prefix } from "../apiconfig";
import Share from "./Share";
import Post from "./Post";
import { AuthContext } from "../context/AuthContext";
import NoPosts from "./NoPosts";
import { useParams } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setpostsCount] = useState(0);
  const { user: loggedInUser } = useContext(AuthContext);
  const { _id: id } = loggedInUser;
  const username = useParams().username;

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(prefix + "posts/profile/" + username)
        : await axios.get(prefix + "posts/timeline/" + id);
      setpostsCount(res.data.length);
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPost();
  }, [id, username]);
  return (
    <Box>
      {(!username || username === loggedInUser.username) && <Share />}
      {postsCount ? (
        posts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <NoPosts />
      )}
    </Box>
  );
};

export default Feed;
