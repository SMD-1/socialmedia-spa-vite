import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import { IoMdPhotos } from "react-icons/io";
import { BiVideoPlus } from "react-icons/bi";
import { GoSmiley } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { prefix } from "../apiconfig";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const profilePicture = user?.profilePicture;
  const username = user?.username;
  const id = user?._id;

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (event.target.value.trim() === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file?.name);
    formData.append("userId", id);
    formData.append("description", description);
    try {
      const res = await axios.post(`${prefix}posts`, formData);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex
      flexDir="column"
      gap={4}
      style={{
        boxShadow:
          "5px 5px 5px rgb(182 181 181 / 20%), inset 5px 5px 5px rgb(216 240 255 / 51%)",
      }}
      p={4}
      rounded="10px"
    >
      {/* top */}
      <Box display="flex" alignItems="center">
        <Avatar src={profilePicture} />
        <Input
          rounded="full"
          ml={4}
          bg="gray.200"
          placeholder={`What's on your mind ${username}`}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Box>
      <Divider />
      {/* image preview */}
      {file && (
        <Box position="relative">
          <Image
            src={URL.createObjectURL(file)}
            className="shareImg"
            alt="postImage"
            w="100%"
            objectFit="cover"
          />
          <Box position="absolute" top="10px" right="10px">
            <MdCancel
              size="2rem"
              cursor="pointer"
              onClick={() => setFile(null)}
            />
          </Box>
        </Box>
      )}
      {/* Bottom */}
      <form onSubmit={submitHandler}>
        <Flex
          gap={4}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Button p="8px" display="flex" variant="outline">
            <FormLabel
              display="flex"
              cursor="pointer"
              htmlFor="file"
              fontWeight="bold"
              mt={"10px"}
            >
              <IoMdPhotos
                color="#19376D"
                size="20px"
                style={{ marginRight: "8px" }}
              />
              Photo
              <Input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FormLabel>

            {/* <Text>Photo</Text> */}
          </Button>
          <Button p="8px 16px" display="flex" variant="outline">
            <BiVideoPlus
              color="#4f46e5"
              size="20px"
              style={{ marginRight: "8px" }}
            />
            <FormLabel
              cursor="pointer"
              htmlFor="file"
              fontWeight="bold"
              mt={"10px"}
            >
              Room
              <Input
                style={{ display: "none" }}
                name="room"
                id="room"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FormLabel>
          </Button>
          <Button variant="outline" p="8px 16px" display="flex">
            <GoSmiley
              color="#E21818"
              size="20px"
              style={{ marginRight: "8px" }}
            />
            <FormLabel
              cursor="pointer"
              htmlFor="file"
              fontWeight="bold"
              mt={"10px"}
            >
              Emoticon
              <Input style={{ display: "none" }} name="emoji" id="emoji" />
            </FormLabel>
          </Button>
          <Button
            colorScheme="messenger"
            p="8px 24px"
            type="submit"
            isDisabled={isDisabled}
          >
            Share
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default Share;
