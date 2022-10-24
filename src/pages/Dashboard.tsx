import { Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import votacaoService from "../services/votacaoService";
import VotosPorCandidato from "../models/votosPorCandidato";

export default function Dashboard() {
  const [votos, setVotos] = useState<VotosPorCandidato[]>();

  function getVotos() {
    votacaoService
      .getVotos()
      .then((response) => {
        setVotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getVotos();
    setTimeout(() => {
      getVotos();
    }, 30000);
  }, []);

  let votos22 = 0;
  let votos13 = 0;
  let votos10 = 0;
  let votos20 = 0;

  votos?.map(async function (a) {
    let atualNumero = Number(a.votos?.toString());

    if (a.numero === "22") {
      votos22 += atualNumero;
    } else if (a.numero === "13") {
      votos13 += atualNumero;
    } else if (a.numero === "10") {
      votos10 += atualNumero;
    } else {
      votos20 += atualNumero;
    }
  });

  return (
    <Flex alignItems={"center"} justifyContent={"center"} w={"full"} h={"full"}>
      <Stack
        boxShadow={"lg"}
        backdropFilter={"auto"}
        backgroundColor={"blackAlpha.300"}
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
        <Chart
          options={{
            legend: {
              labels: {
                colors: ["#FFFFFF"],
              },
            },
            chart: { animations: { easing: "easeinout", enabled: true } },
            dataLabels: {
              style: {
                colors: ["#FFFFFF"],
              },
            },
            colors: ["#44EB36", "#D74141", "#272727", "#A9A9A9"],
            labels: ["Bolsonaro", "Lula", "Nulo", "Branco"],
          }}
          series={[votos22, votos13, votos10, votos20]}
          width={"400px"}
          type={"pie"}></Chart>
      </Stack>
    </Flex>
  );
}
