import { Link } from "react-router-dom";
import Share from "./components/Share";
import Feed from "./components/Feed";
import { Box, Heading } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Box
      display="flex"
      gap={4}
      className="App"
      // border="2px solid red"
      w={{ base: "full", lg: "90%" }}
      margin="1rem auto"
    >
      <Box w={{ base: "full", lg: "60%" }}>
        <Share />
        <Feed />
      </Box>
      <Box
        border="2px solid #000"
        w="40%"
        display={{ base: "none", lg: "block" }}
      >
        <Heading>Right componenet here</Heading>
      </Box>
    </Box>
  );
}

export default App;
