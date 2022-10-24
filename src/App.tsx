import { Flex, VStack, Text } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./global.css";

function App() {
  return (
    <VStack
      p={5}
      h="full"
      backgroundImage={
        "linear-gradient(to right top, #051937, #002039, #002531, #002821, #00290d);"
      }
      bgPos="top"
      w={"full"}
      bgSize={"cover"}>
      <Flex h="full" w={"full"} justifyContent={"center"} alignItems="center">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          position={"fixed"}
          bottom={0}
          w={"full"}
          roundedTop="xl"
          bg="blackAlpha.500"
          h={"10"}
          backdropBlur="10px">
            <Text fontSize={12}>Urna eletrônica feita por Samuel Serra 2D2, Floresta</Text>
          </Flex>
      </Flex>
    </VStack>
  );
}

export default App;
