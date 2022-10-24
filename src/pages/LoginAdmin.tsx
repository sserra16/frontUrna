import {
  Flex,
  InputLeftElement,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Image,
  Text,
  InputGroup,
} from "@chakra-ui/react";

import { AttachmentIcon } from "@chakra-ui/icons";

import React, { useState } from "react";

import Logo from "../assets/logo.png";

import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { codigoCorreto } from "../services/secret";

export default function LoginAdmin() {
  /* ----- */
  const history = useNavigate();

  const [codigo, setCodigo] = useState("");

  return (
    <>
      <Flex minH={"100vh"} alignItems={"center"} justify={"center"}>
        <motion.div initial={{ y: -400 }} animate={{ y: 0 }}>
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
                <FormControl id="mat">
                  <FormLabel>Digite o código</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<AttachmentIcon color="gray.300" />}
                    />
                    <Input
                      required
                      autoComplete={"off"}
                      onChange={(e) => {
                        setCodigo(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    disabled={codigo === codigoCorreto ? false : true}
                    bg={"green.400"}
                    color={"white"}
                    mt={2}
                    onClick={() => {
                      localStorage.setItem("admin", "pode");
                      history("/dashboard");
                    }}
                    _hover={{
                      bg: "green.300",
                    }}>
                    Entrar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </motion.div>
      </Flex>
    </>
  );
}
