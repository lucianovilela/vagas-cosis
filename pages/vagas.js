import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Header from "../src/Header";
import Navegador from "../src/Navegador";
import ListVagas from "../src/ListVagas";
import { useMyContext } from "../src/MyContext";

import { firestore } from "../src/db";
import {
  collection,
  getDocsFromServer,
  query,
  where,
  orderBy
} from "firebase/firestore";
export default function Index() {

  const [list, setList] = React.useState([]);
  React.useEffect(() => {

    const docRef = collection(firestore, "vagas");

    getDocsFromServer(docRef, orderBy('vaga')).then((docs) => {
      const l = [];

      docs.forEach((doc) => {
        l.push({ id: doc.id, ...doc.data() });
      });
      setList(l);
    });
  }, []);


  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          {list.map((item) => (
            <Box
              key={item.id}
              sx={{
                mt: 2
              }}
            >
              <Chip label={item.vaga}/> 

            </Box>
          ))}
        </Box>

      </Container>
    </>
  );
}
