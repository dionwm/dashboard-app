import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function Details() {
  const { run_id } = useParams();
  const [runData, setRunData] = useState({});

  useEffect(() => {
    axios.get(`/api/runs/${run_id}`).then((response) => {
      console.log(response.data.run);
      setRunData(response.data.run);
    });
  }, []);

  return (
    <Box>
      <NavBar />

      <Box>
        <Card>
          <Box
            className="list-title"
            py={6}
            fontSize="24px"
            fontWeight="600"
            textAlign="center"
          >
            Run Information
          </Box>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Name
                </Heading>
                <Text pt="2" fontSize="sm">
                  {runData.name}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
}
