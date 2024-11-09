import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Spinner,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import LoadingMessage from "../components/LoadingMessage/LoadingMessage";

export default function Details() {
  const navigate = useNavigate();
  const { run_id } = useParams();
  const [runData, setRunData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/runs/${run_id}`)
      .then((response) => {
        setRunData(response.data.run);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [run_id]);

  useEffect(() => {
    if (!isLoading && iframeLoaded) {
      const iframe = document.getElementById("babylonIframe");
      if (iframe) {
        iframe.contentWindow.postMessage(runData.name, window.location.origin);
      }
    }
  }, [isLoading, iframeLoaded]);

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

  function changeColor(color) {
    const iframe = document.getElementById("babylonIframe");
    if (iframe && iframeLoaded) {
      iframe.contentWindow.changeTextColor(color);
    }
  }

  return (
    <>
      <NavBar />
      <Box
        margin={4}
        width="70%"
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <Card width="100%" boxShadow="base">
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
                    Description
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {runData.description}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Duration of Run
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {runData.duration} minutes
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Date of Run
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {runData.date
                      ? new Date(runData.date).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Status of Run
                  </Heading>
                  <Text
                    pt="2"
                    fontSize="sm"
                    color={getStatusColor(runData.status)}
                  >
                    {runData.status}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        )}

        <Box width="100%" height="500px" margin={4}>
          <iframe
            id="babylonIframe"
            src="/babylon.html"
            width="100%"
            height="400px"
            style={{ border: "none" }}
            onLoad={() => setIframeLoaded(true)}
          ></iframe>

          <Box
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            <Button colorScheme="green" onClick={() => changeColor("#00FF00")}>
              Green
            </Button>
            <Button colorScheme="yellow" onClick={() => changeColor("#FFFF00")}>
              Yellow
            </Button>
            <Button colorScheme="red" onClick={() => changeColor("#FF0000")}>
              Red
            </Button>
          </Box>
        </Box>

        <Button onClick={() => navigate("/")} margin={4}>
          Back
        </Button>
      </Box>
    </>
  );
}
