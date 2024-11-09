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
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [runs, setRuns] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const [runLimit, setRunLimit] = useState(12);
  const [runSkip, setRunSkip] = useState(0);
  const [runTotalCount, setRunTotalCount] = useState(0);

  function handlePageSelect(selectedPage) {
    if (
      selectedPage < 1 ||
      selectedPage > Math.ceil(runTotalCount / runLimit)
    ) {
      return;
    }

    setPage(selectedPage);
    setRunSkip(runLimit * selectedPage - runLimit);
  }

  useEffect(() => {
    axios
      .get(`/api/runs?limit=${runLimit}&skip=${runSkip}`)
      .then((response) => {
        setRuns(response.data.runs);
        setRunTotalCount(response.data.totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching runs:", error);
        setIsLoading(false);
      });
  }, [runSkip]);

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
          <>
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
                  {runs?.map((run) => (
                    <Tr
                      key={run.id}
                      cursor="pointer"
                      _hover={{ background: "#EEF1F6" }}
                      onClick={() => {
                        navigate(`/run/${run.id}`);
                      }}
                    >
                      <Td>{run.name}</Td>
                      <Td>{new Date(run.date).toLocaleDateString()}</Td>
                      <Td>
                        <Box color={getStatusColor(run.status)}>
                          {run.status}
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            {runs?.length > 0 && (
              <Box
                className="list-pagination"
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding={6}
              >
                <Box
                  cursor="pointer"
                  mx="4px"
                  onClick={() => handlePageSelect(page - 1)}
                >
                  Previous
                </Box>

                {[...new Array(Math.ceil(runTotalCount / runLimit))].map(
                  (_, index) => {
                    return (
                      <Box
                        key={index}
                        cursor="pointer"
                        px="6px"
                        className={
                          page === index + 1 ? "page selected-page" : "page"
                        }
                        onClick={() => handlePageSelect(index + 1)}
                      >
                        {index + 1}
                      </Box>
                    );
                  }
                )}

                <Box
                  cursor="pointer"
                  mx="4px"
                  onClick={() => handlePageSelect(page + 1)}
                >
                  Next
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </div>
  );
}
