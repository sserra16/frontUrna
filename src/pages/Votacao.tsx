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
  Spinner,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  CloseIcon,
  CheckIcon,
  CheckCircleIcon,
  InfoIcon,
} from "@chakra-ui/icons";
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
  const [load, setLoad] = useState(true);

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

    if (candNum !== "22" && candNum !== "13" && candNum !== "20") {
      numFinal = "10";
    } else {
      numFinal = candNum;
    }

    await votacaoService
      .votar({ candNum: numFinal, matricula: state.state.matricula })
      .then((res) => {
        console.log(res);
        setLoad(true);
      })
      .catch((err: AxiosError) => {
        console.log(err);
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
                  backgroundColor={"blackAlpha.500"}
                  _hover={{ backgroundColor: "blackAlpha.300" }}
                  color={"white"}
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
              backgroundColor={"blackAlpha.500"}
              _hover={{ backgroundColor: "blackAlpha.300" }}
              color={"white"}
              backdropFilter={"auto"}
              onClick={() => setCandNum(candNum ? candNum + "0" : "0")}
              gridColumn={2}>
              0
            </Button>
          </SimpleGrid>

          <Input
            borderColor={candNum.length !== 2 ? "red.300" : "green.400"}
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
              textColor={"black"}
              onClick={() => {
                setCandNum("20");
                onOpen();
              }}>
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
              onClick={() => {
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
        <ModalContent
          backgroundColor={"#3F3D42"}
          color={"white"}
          p={!load ? "14" : ""}
          alignItems={!load ? "center" : ""}
          justifyContent={!load ? "center" : ""}>
          {!votou ? (
            <>
              {" "}
              <ModalHeader>
                {!votou ? (
                  <InfoIcon rounded={"full"} w={6} h={6} />
                ) : (
                  <CheckCircleIcon
                    backgroundColor={"green.400"}
                    rounded={"full"}
                    w={6}
                    h={6}
                  />
                )}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {candNum === "13"
                    ? "Deseja votar no Lula?"
                    : candNum === "22"
                    ? "Deseja votar no Bolsonaro?"
                    : candNum !== "13" &&
                      candNum !== "22" &&
                      candNum !== "20" &&
                      candNum
                    ? "Deseja votar Nulo?"
                    : candNum === "20"
                    ? "Deseja votar em Branco?"
                    : "Digite um número ou clique no botão de votar em branco."}
                </Text>
              </ModalBody>
              <ModalFooter display={"flex"} gap={4}>
                {!candNum ? (
                  <Button
                  backgroundColor={"orange.400"}
                  _hover={{ backgroundColor: "orange.500" }}
                    onClick={() => {
                      onClose();
                    }}>
                    Voltar
                  </Button>
                ) : (
                  <>
                    <Button
                      backgroundColor={"orange.400"}
                      _hover={{ backgroundColor: "orange.500" }}
                      onClick={() => {
                        onClose();
                      }}>
                      Não
                    </Button>
                    <Button
                      backgroundColor={"green.400"}
                      _hover={{ backgroundColor: "green.500" }}
                      onClick={async () => {
                        setVotou(true);
                        setLoad(false);
                        await votar();
                      }}>
                      Sim
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          ) : (
            <>
              {load ? (
                <>
                  <ModalHeader></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text display={"flex"} gap={3} alignItems={"center"}>
                      Você votou!
                    </Text>
                  </ModalBody>
                  <ModalFooter display={"flex"} gap={4}>
                    <Button
                      onClick={() => {
                        history("/");
                      }}>
                      Fechar
                    </Button>
                  </ModalFooter>{" "}
                </>
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="green.400"
                  size="xl"
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
