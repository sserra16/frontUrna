import { Flex, VStack } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <VStack
      p={5}
      h="full"
      backgroundImage={"https://wallpapercave.com/wp/wp2665743.jpg"}
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
