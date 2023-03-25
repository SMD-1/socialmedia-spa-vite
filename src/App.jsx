import Feed from "./components/Feed";
import Rightside from "./components/Rightside";
import { Box } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <Box
      display="flex"
      gap={6}
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
        <Rightside />
      </Box>
    </Box>
  );
}

export default App;
