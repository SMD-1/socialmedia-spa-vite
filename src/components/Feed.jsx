import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { prefix } from "../apiconfig";
import Share from "./Share";
import Post from "./Post";
import { AuthContext } from "../context/AuthContext";
import NoPosts from "./NoPosts";
import { useParams } from "react-router-dom";
import Rightside from "./Rightside";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setpostsCount] = useState(0);
  const { user: loggedInUser } = useContext(AuthContext);
  // console.log(loggedInUser);
  if (loggedInUser && loggedInUser._id) {
    const { _id } = loggedInUser;
    console.log(_id);
  }
  // console.log(id);
  const username = useParams().username;

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(prefix + "posts/profile/" + username)
        : await axios.get(prefix + "posts/timeline/" + loggedInUser._id);
      setpostsCount(res.data.length);
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    if (loggedInUser?._id) {
      fetchPost();
    }
  }, [loggedInUser, username]);
  return (
    <Box>
      {(!username || username === loggedInUser.username) && <Share />}
      <Box display={{ md: "none" }}>
        <Rightside />
      </Box>
      {postsCount ? (
        posts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <NoPosts />
      )}
    </Box>
  );
};

export default Feed;
