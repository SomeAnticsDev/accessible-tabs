import * as React from "react";
import { Box, Flex, Container } from "./Layout";

const YEAR = new Date().getFullYear().toString();

function Footer({ year = YEAR }) {
  return (
    <Flex as="footer" justifyContent="center" className="Footer">
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>© {YEAR} Zero Rights Reserved, Create Cool Stuff LLC</Box>
        </Flex>
      </Container>
    </Flex>
  );
}

export { Footer };
