import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { prefix } from "../apiconfig.js";
import * as MaterialIcon from "react-icons/md";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { Box, Flex, Divider, Image, Text } from "@chakra-ui/react";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${prefix}users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = () => {
    try {
      axios.put(prefix + "posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <Box
      display="flex"
      flexDir="column"
      m="10px auto"
      p="20px"
      rounded="10px"
      style={{
        boxShadow:
          "5px 5px 5px rgb(182 181 181 / 20%), inset 5px 5px 5px rgb(216 240 255 / 51%)",
      }}
    >
      {/* top */}
      <Flex alignItems="center" justifyContent="space-between" mb="10px">
        {/* top-left */}
        <Box display="flex" alignItems="center">
          <Link to={`/profile/${user.username}`}>
            <Image
              w="40px"
              h="40px"
              rounded="full"
              mr="15px"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : `${prefix}images/person/user.png`
              }
              alt="user-profile"
            />
          </Link>
          <Box>
            <Text fontWeight="bold" textAlign="left" fontSize="16px">
              {user.username}
            </Text>
            <Text>{format(post.createdAt)}</Text>
          </Box>
        </Box>
        {/* top-right */}
        <Box>
          <MaterialIcon.MdMoreVert cursor="pointer" size="1.5rem" />
        </Box>
      </Flex>
      <Divider />
      {/* center */}
      <Box w="90%" m={"10px auto"}>
        <Text mb="10px" fontSize="16px" fontWeight="500" textAlign="left">
          {post?.description}
        </Text>
        {post.img ? (
          <Image
            src={post.img}
            alt="post"
            m="10px auto "
            rounded="10px"
            w="100%"
            maxH="450px"
            objectFit="contain"
            bg="rgb(115, 115, 115)"
          />
        ) : (
          ``
        )}
      </Box>
      {/* bottom */}
      <Flex w="90%" m="5px auto" justifyContent="space-between">
        {/* bottom-left */}
        <Box display="flex" alignItems="center">
          {isLiked ? (
            <MaterialIcon.MdThumbUp
              color="#1D4ED8"
              onClick={likeHandler}
              cursor="pointer"
              size="1.5rem"
            />
          ) : (
            <MaterialIcon.MdThumbUp
              onClick={likeHandler}
              cursor="pointer"
              size="1.5rem"
            />
          )}
          <Text ml="10px">{like} people liked it</Text>
        </Box>
        {/* bottom-right */}
        <Box>
          <Text>{post.comment} Comments</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
