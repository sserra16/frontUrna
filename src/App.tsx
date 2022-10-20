import { Flex, VStack } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./global.css";

function App() {
  return (
    <VStack
      p={5}
      h="full"
      backgroundImage={
        "linear-gradient(to right top, #292929, #242424, #1f1f1f, #1b1b1b, #161616);"
      }
      bgPos="top"
      w={"full"}
      bgSize={"cover"}>
      <Flex h="full" w={"full"} justifyContent={"center"} alignItems="center">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Flex>
    </VStack>
  );
}

export default App;
