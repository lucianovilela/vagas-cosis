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

  const [listaVagas, setListaVagas] = useState([]);
  const tmp = [];

  const loadData = async () => {
    let ontem = new Date(data);
    ontem.setDate(data.getDate() - 1);
    ontem.setHours(0, 0, 0, 0);
    const docRef = collection(firestore, "reservas");
    const docs = await getDocsFromServer(
      query(docRef, where("data", ">=", ontem), where("data", "<", data)),
      orderBy("nome")
    );
    docs.forEach(doc2 => {
      console.log('meio', doc2);
      getDoc(doc2.data().user).then(infoUser => {
        const obj = {
          nome: doc2.data().nome,
          vaga: doc2.data().vaga,
          data: doc2.data().data.toDate(),
          id: doc2.id,
          cartao: infoUser.data().cartao
        };


        setListaVagas(current => [...current, obj])
      });
    })
  }

  useEffect(() => {
    setListaVagas([]);
    const load = async () => await loadData()

    load().catch(console.error);
  }, [data]);

  return (
    <>
      <Box sx={{ my: 4 }}>
        {listaVagas.map((item) => (
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
    </>
  );
};

export default ListVagas;
