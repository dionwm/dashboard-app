import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import axios from "axios";
import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";
import LoadingMessage from "../components/LoadingMessage/LoadingMessage";

export default function Home() {
  const [runs, setRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/runs")
      .then((response) => {
        setRuns(response.data.runs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching runs:", error);
        setIsLoading(false);
      });
  }, []);

  function getStatusColor(status) {
    switch (status) {
      case "Success":
        return "green.500";
      case "Failed":
        return "#c74129";
      default:
        return "gray.500";
    }
  }

  return (
    <div>
      <NavBar />

      <Box className="list-container" height="100%" padding={4}>
        <Box
          className="list-title"
          py={6}
          fontSize="24px"
          fontWeight="600"
          textAlign="center"
        >
          <RepeatClockIcon mx="4px" /> Runs History
        </Box>

        {isLoading ? (
          <LoadingMessage />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Date of Run</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {runs.map((run) => (
                  <Tr
                    key={run.id}
                    cursor="pointer"
                    _hover={{ background: "#EEF1F6" }}
                  >
                    <Td>{run.name}</Td>
                    <Td>{new Date(run.date).toLocaleDateString()}</Td>
                    <Td>
                      <Box color={getStatusColor(run.status)}>{run.status}</Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
}
