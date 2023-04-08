import Feed from "./components/Feed";
import { Box, Heading } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Box
      display="flex"
      gap={4}
      className="App"
      w={{ base: "full", lg: "90%" }}
      margin="1rem auto"
    >
      <Box w={{ base: "full", lg: "60%" }}>
        <Feed />
      </Box>
      <Box
        // border="2px solid #000"
        w="40%"
        display={{ base: "none", md: "block" }}
      >
        <Heading>Right componenet here</Heading>
      </Box>
    </Box>
  );
}

export default App;
