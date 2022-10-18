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
} from "@chakra-ui/react";

import {
  InfoOutlineIcon,
  UnlockIcon,
  AttachmentIcon,
  CheckIcon,
} from "@chakra-ui/icons";

import { useEffect, useState } from "react";

import Logo from "../assets/logo.png";

import { useNavigate } from "react-router";
import registerService from "../services/registerService";

export default function Login() {
  useEffect(() => registerService.removeToken(), []);

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
  const [pass, setPass] = useState("");
  const [turma, setTurma] = useState("");

  const [errorMat, setErrorMat] = useState(false);

  async function logar() {
    await registerService
      .create({ matricula, senha: pass, turma })
      .then((response) => {
        console.log(response.data.usuario.matricula);
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
        /* bg={useColorModeValue("gray.50", "gray.800")} */
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
          py={12}
          px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} display="flex" w="full">
              <Image alignSelf={"flex-start"} boxSize={12} src={Logo} />
              <Box>
                Urna{" "}
                <Text display={"inline"} color={"green.300"}>
                  Cotemig
                </Text>
              </Box>
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
                    type="text"
                    value={matricula}
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
                    children={<InfoOutlineIcon color="gray.300" />}
                  />
                  <Input
                    type="text"
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"green.400"}
                  color={"white"}
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
                  <ModalContent>
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
