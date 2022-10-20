import {
  Box,
  Flex,
  Button,
  SimpleGrid,
  Text,
  Icon,
  Input,
  Stack,
  Skeleton,
  SkeletonCircle,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";

import mito from "../assets/mito.jpeg";
import lula from "../assets/lula.jpg";
import { AxiosError } from "axios";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import votacaoService from "../services/votacaoService";

export default function Votacao() {
  /* Modal */
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="0%"
      backdropBlur="4px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  /* ------ */

  const history = useNavigate();
  const state = useLocation();
  const [candNum, setCandNum] = useState("");
  const [votou, setVotou] = useState(false);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    api.get("/votacao").catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        history("/");
      }
    });
  }, [history]);

  async function votar() {
    let numFinal = "";
    if (candNum !== "22" && candNum !== "13" && candNum) {
      numFinal = "10";
    } else if (!candNum) {
      numFinal = "20";
    } else {
      numFinal = candNum;
    }

    await votacaoService
      .votar({ candNum: numFinal, matricula: state.state.matricula })
      .then((res) => console.log(res))
      .catch((err: AxiosError) => {
        if (err.response?.status === 400) {
          setVotou(true);
        }
      });
  }

  return (
    <>
      <Flex gap={16}>
        <Box
          gap={10}
          display="flex"
          flexDirection={"column"}
          p={4}
          width={"2xl"}
          backdropFilter="auto"
          backdropBlur={"100px"}
          bg="blackAlpha.300"
          h={"md"}
          rounded="xl">
          {candNum !== "22" && candNum !== "13" ? (
            <SkeletonCircle boxSize={150} />
          ) : (
            <Box
              boxSize={150}
              rounded="full"
              bgSize={"cover"}
              bgPos="center"
              bgImage={
                candNum === "22" ? mito : candNum === "13" ? lula : ""
              }></Box>
          )}

          <Box display={"flex"} flexDirection="column" gap={5}>
            {candNum === "22" ? (
              <Text fontWeight={"bold"} fontSize={"3xl"} color={"whitesmoke"}>
                Jair Messias Bolsonaro
              </Text>
            ) : candNum === "13" ? (
              <Text fontWeight={"bold"} fontSize={"3xl"} color={"whitesmoke"}>
                Luiz Inácio Lula da Silva
              </Text>
            ) : (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}

            {candNum === "22" ? (
              <Text textAlign={"justify"} color={"whiteAlpha.700"}>
                Jair Messias Bolsonaro GOMM é um militar reformado e político
                brasileiro, filiado ao Partido Liberal. É o 38º presidente do
                Brasil desde 1º de janeiro de 2019, tendo sido eleito pelo
                Partido Social Liberal.
              </Text>
            ) : candNum === "13" ? (
              <Text textAlign={"justify"} color={"whiteAlpha.700"}>
                Luiz Inácio Lula da Silva GColL • GCTE • GCMM, mais conhecido
                como Lula, é um ex-sindicalista, ex-metalúrgico e político
                brasileiro, filiado ao Partido dos Trabalhadores. Foi o 35.º
                presidente do Brasil entre 1 de janeiro de 2003 e 1 de janeiro
                de 2011.
              </Text>
            ) : (
              <Text></Text>
            )}
          </Box>
        </Box>

        <Box
          w={1 / 3}
          h="md"
          backdropFilter={"auto"}
          backdropBlur="20px"
          bg="blackAlpha.300"
          rounded={"xl"}
          p={8}
          pb={4}
          display={"flex"}
          flexDirection="column"
          justifyContent={"space-between"}>
          <SimpleGrid columns={3} spacingY="6" spacingX={"5"}>
            {numbers.map((i) => {
              return (
                <Button
                  backdropBlur={"20px"}
                  backdropFilter={"auto"}
                  onClick={() =>
                    setCandNum(candNum ? candNum + `${i}` : `${i}`)
                  }>
                  {i}
                </Button>
              );
            })}

            <Button
              backdropBlur={"20px"}
              color={"gray.100"}
              _hover={{ opacity: 0.8 }}
              backdropFilter={"auto"}
              onClick={() => setCandNum(candNum ? candNum + "0" : "0")}
              gridColumn={2}>
              0
            </Button>
          </SimpleGrid>

          <Input
            borderColor={candNum.length > 2 ? "red.300" : ""}
            type={"text"}
            focusBorderColor="green.400"
            readOnly
            value={candNum}
            onChange={(e) => setCandNum(e.target.value)}
          />

          <Flex w={"fill"} justifyContent="space-between" gap={5}>
            <Button
              leftIcon={<Icon />}
              _hover={{ bg: "whiteAlpha.700" }}
              bg={"white"}
              textColor={"black"}>
              Branco
            </Button>
            <Button
              bg={"orange.400"}
              _hover={{
                bg: "orange.500",
              }}
              display="flex"
              alignItems="center"
              gap={1}
              leftIcon={<CloseIcon color={"white"} boxSize={3} />}
              onClick={() => setCandNum(candNum.slice(0, candNum.length - 1))}>
              <Text>Corrige</Text>
            </Button>
            <Button
              bg={"green.400"}
              _hover={{
                bg: "green.500",
              }}
              leftIcon={<CheckIcon color={"white"} boxSize={4} />}
              onClick={async () => {
                await votar();
                setOverlay(<OverlayOne />);
                onOpen();
              }}>
              <Text>Confirma</Text>
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {votou ? <Text>Você já votou!</Text> : <Text>Você votou!</Text>}
          </ModalBody>
          <ModalFooter display={"flex"} gap={4}>
            <Button
              onClick={() => {
                history("/");
              }}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
