import React, { useState, useEffect } from "react";
import { useMyContext } from "./MyContext";
import { firestore } from "./db";
import {
  collection,
  getDocsFromServer,
  query,
  where,
  orderBy,
  getDoc
} from "firebase/firestore";

import { Box, Typography, Chip } from "@mui/material";
import { red } from '@mui/material/colors'

const ListVagas = () => {
  const [{ user, data, debug }] = useMyContext();

  const [list, setList] = useState([]);
  useEffect( () => {
    let ontem = new Date(data);
    ontem.setDate(data.getDate() - 1);
    ontem.setHours(0, 0, 0, 0);
    const docRef = collection(firestore, "reservas");

    getDocsFromServer(
      query(docRef, where("data", ">=", ontem), where("data", "<", data)),
      orderBy("nome")
    ).then((docs) => {
      const temp =[];
      docs.forEach(async (doc2) => {
        const infoUser = await getDoc(doc2.data().user)
        temp.push({ ...doc2.data(), data: doc2.data().data.toDate(), id: doc2.id, ...infoUser.data() })
      });

      setList(temp);
    });
  }, [data]);

  return (

    <Box sx={{ my: 4 }}>
      {list.map((item) => (
        <Box

          sx={{
            mt: 3
          }}
        >
          <Typography>{item.nome} </Typography>
          <Typography sx={{ display: debug ? 'flex' : 'none' }}>{JSON.stringify(item.data)} </Typography>
          <Chip
            label={
              item.vaga === "P" || item.vaga === "nan"
                ? "Sem reserva"
                : item.vaga
            }
          />
          {!item.cartao ? <Chip sx={{ color: red[600] }} label={'Sem cartão'} /> : ''}
        </Box>
      ))}
    </Box>

  );
};

export default ListVagas;
