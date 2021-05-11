/* eslint-disable jsx-a11y/role-supports-aria-props */
import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Flex, Container } from "./Layout";
import { Dashboard } from "./Dashboard";

function App() {
  return (
    <Flex direction="column" className="App">
      <Header />
      <Flex flexGrow={1} justifyContent="center">
        <Container className="App__content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jokes" element={<Jokes />} />
            <Navigate to="/dashboard" replace />
          </Routes>
        </Container>
      </Flex>
      <Footer />
    </Flex>
  );
}

function Jokes() {
  return (
    <main>
      <h1>Jokes</h1>
    </main>
  );
}

export { App };
