import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Header from "../src/Header";
import { useMyContext } from "../src/MyContext";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

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
  React.useEffect(() => {

    const docRef = collection(firestore, "user");

    getDocsFromServer(docRef).then((docs) => {
      const l = [];

      docs.forEach((doc) => {

        l.push({ ...doc.data(), id: doc.id });
      });
      setList(l);
    });
  }, []);

  const trocaCartao= async(id)=>{
    
    const docRef = doc(firestore,"user", id );
    console.log(docRef.document);
    await updateDoc(docRef, {cartao:true})
  

  }

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Typography variant="h4">Distribuição de cartões </Typography>
        <Box sx={{ my: 4 }}>
          {list.map((item) => (
            <Stack direction="row" spacing={2}  alignContent={'center'}>
              <Typography>{item.nome} </Typography>
              <IconButton variant="outlined" onClick={()=>trocaCartao(item.id)}>
                {item.cartao ?
                  <BadgeOutlinedIcon />
                  : <DoNotDisturbOnIcon />
                }
              </IconButton >



            </Stack>
          ))}
        </Box>

      </Container>
    </>
  );
}
