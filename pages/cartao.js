import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../src/Header";
import { useMyContext } from "../src/MyContext";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { red, blue, green } from '@mui/material/colors';

import { firestore } from "../src/db";
import {
  collection,
  getDocsFromServer,
  query,
  where,
  updateDoc, doc
} from "firebase/firestore";
import { ConstructionOutlined } from "@mui/icons-material";
import { async } from "@firebase/util";
export default function Index() {
  const [{ user }] = useMyContext();

  const [list, setList] = React.useState([]);

  const loadList = () => {
    const docRef = collection(firestore, "user");

    getDocsFromServer(docRef).then((docs) => {
      const l = [];

      docs.forEach((doc) => {

        l.push({ ...doc.data(), id: doc.id });
      });
      setList(l);
    });
  }

  React.useEffect(() => {
    loadList();

  }, []);

  const trocaCartao = async ({ id, cartao }) => {

    const docRef = doc(firestore, "user", id);
    console.log(docRef.document);
    await updateDoc(docRef, { cartao: !cartao })
    loadList();

  }

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Typography variant="primary" >Distribuição de cartões </Typography>
        <br/>
        {list.length!==0 ?

          <Box sx={{ my: 4 }}>
            {list.map((item) => (
              <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'left'}>
                <Typography>{item.nome} </Typography>
                <IconButton variant="outlined" onClick={() => trocaCartao(item)}>
                  {item.cartao ?
                    <BadgeOutlinedIcon sx={{ color: blue[500] }}/>
                    : <DoNotDisturbOnIcon sx={{ color: red[500] }}/>
                  }
                </IconButton >



              </Stack>
            ))}
          </Box>
          : <CircularProgress />
        }
      </Container>
    </>
  );
}
