import * as React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Container } from "./Layout";

function Header() {
  return (
    <Flex as="header" justifyContent="center" className="Header">
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Box as="p" reset="paragraph" className="Header__page-title">
            Joke Store
          </Box>
          <nav aria-label="App navigation">
            <Flex as="ul" reset="list" alignItems="center" gap={1}>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/jokes">Jokes</NavLink>
              </li>
            </Flex>
          </nav>
        </Flex>
      </Container>
    </Flex>
  );
}

export { Header };
