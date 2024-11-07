import React from "react";
import { Box } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        className="nav-container"
        position="sticky"
        display="flex"
        w="100%"
        p="6px 18px"
        alignItems="center"
        justifyContent="space-between"
        backdropFilter="auto"
        backdropBlur="8px"
        borderBottom="1px solid #EEF1F6"
      >
        <Box fontSize="28px" fontWeight="600">
          Dash.
        </Box>
        <Box display="flex" alignItems="center"></Box>
      </Box>
    </div>
  );
}
