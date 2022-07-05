import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../src/Header";
import Navegador from "../src/Navegador";
import ListVagas from "../src/ListVagas";
import { useMyContext } from "../src/MyContext";
export default function Index() {
  const [{ user, data }] = useMyContext();
  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Navegador />
        <ListVagas />
      </Container>
    </>
  );
}
