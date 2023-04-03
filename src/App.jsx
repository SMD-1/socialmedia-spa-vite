import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Box className="App">
      <Heading>Hello world</Heading>
      <Button>
        <Link to="/register">Signup</Link>
      </Button>
      <Button>
        <Link to="/login">Login</Link>
      </Button>
    </Box>
  );
}

export default App;
