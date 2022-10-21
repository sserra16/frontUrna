import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputLeftElement,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Image,
  useDisclosure,
  Text,
  InputGroup,
  Spinner,
  Select,
} from "@chakra-ui/react";

import { AttachmentIcon, CheckIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";

import Logo from "../assets/logo.png";

import { useNavigate } from "react-router";
import registerService from "../services/registerService";

export default function Login() {
  useEffect(() => registerService.removeToken(), []);

  const [load, setLoad] = useState(true);

  /* MODAL */
  const OverlayOne = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="0%"
      backdropBlur="4px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  /* ----- */

  const history = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [turma, setTurma] = useState("");

  const [errorMat, setErrorMat] = useState(false);

  async function logar() {
    setLoad(false);
    await registerService
      .create({ matricula, turma })
      .then((response) => {
        registerService.setToken(response.data.token);
        history("/Votacao", {
          state: { matricula: response.data.usuario.matricula },
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data === "Esta matrícula já foi usada") {
          onClose();
          setErrorMat(true);
        }
      });
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        alignItems={"center"}
        justify={"center"}
      >
        <Stack
          boxShadow={"lg"}
          backdropFilter={"auto"}
          backdropBlur="80px"
          w={"md"}
          rounded={"3xl"}
          display="flex"
          alignItems={"center"}
          justifyContent="space-between"
          direction={"column"}
          overflow="hidden"
          spacing={2}
          py={4}
          px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} display="flex" w="full">
              <Image alignSelf={"flex-start"} boxSize={12} src={Logo} />
              <Flex gap={3}>
                <Text>Urna</Text>
                <Text display={"inline"} color={"green.300"}>
                  Cotemig
                </Text>
              </Flex>
            </Heading>
          </Stack>
          <Box p={8}>
            <Stack spacing={4} w={"sm"}>
              <FormControl id="mat" isInvalid={errorMat}>
                <FormLabel>Digite a sua matrícula</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AttachmentIcon color="gray.300" />}
                  />
                  <Input
                    type="number"
                    value={matricula}
                    
                    focusBorderColor={matricula.length !== 8 ? "red.400" : "green.400"}
                    onChange={(e) => {
                      setMatricula(e.target.value);
                    }}
                    onFocus={() => setErrorMat(false)}
                  />
                </InputGroup>

                {errorMat ? (
                  <FormErrorMessage>Matrícula já usada</FormErrorMessage>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl id="turma">
                <FormLabel>Digite a turma </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Select
                    id="turma"
                    bg="transparent"
                    value={turma}
                    color={`white`}
                    focusBorderColor={"green.400"}
                    onChange={(e) => setTurma(e.target.value)}
                    placeholder="Selecione a sua turma">
                    <option value={"2C2"}>1A2</option>
                    <option value={"2C2"}>1B2</option>
                    <option value={"2C2"}>1C2</option>
                    <option value={"2C2"}>1D2</option>
                    <option value={"2D2"}>1E2</option>
                    <option value={"2D2"}>2A2</option>
                    <option value={"2D2"}>2B2</option>
                    <option value={"2D2"}>2D2</option>
                    <option value={"2D2"}>2C2</option>
                    <option value={"2D2"}>3A2</option>
                    <option value={"2D2"}>3B2</option>
                    <option value={"2D2"}>3C2</option>
                  </Select>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  mt={5}
                  disabled={matricula.length !== 8 ? true : false}
                  _hover={{
                    bg: "green.300",
                  }}
                  onClick={() => {
                    setOverlay(<OverlayOne />);
                    onOpen();
                  }}>
                  Entrar
                </Button>
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                  {overlay}
                  <ModalContent p={!load ? "14" : ""} alignItems={!load ? "center" : ""} justifyContent={!load ? "center": ""}>
                    {!load ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="green.400"
                        size="xl"
                      />
                    ) : (
                      <>
                        <ModalHeader>Confirmar</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text>Deseja confirmar a matrícula?</Text>
                          <Text fontWeight={"bold"}>{matricula}</Text>
                        </ModalBody>
                        <ModalFooter display={"flex"} gap={4}>
                          <Button
                            bg={"green.400"}
                            color={"white"}
                            _hover={{
                              bg: "green.300",
                            }}
                            onClick={logar}
                            display={"flex"}
                            alignItems="center"
                            gap={2}>
                            <CheckIcon />
                            Sim
                          </Button>
                          <Button onClick={onClose}>Fechar</Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
