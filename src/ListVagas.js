import React, { useState, useEffect } from "react";
import { useMyContext } from "./MyContext";
import { firestore } from "./db";
import {
  collection,
  getDocsFromServer,
  query,
  where,
  orderBy
} from "firebase/firestore";

import { Box, Typography, Chip } from "@mui/material";

const ListVagas = () => {
  const [{ user, data }] = useMyContext();

  const [list, setList] = useState([]);
  useEffect(() => {
    let amanha = new Date(data);
    amanha.setDate(data.getDate() + 1);
    amanha.setHours(0,0,0,0);
    const docRef = collection(firestore, "reservas");
    console.log("hoje:", data, "amanha:", amanha);
    getDocsFromServer(
      query(docRef, where("data", ">=", data), where("data", "<", amanha)),
      orderBy("nome")
    ).then((docs) => {
      const l = [];

      docs.forEach((doc) => {
        l.push({ id: doc.id, ...doc.data(), data: doc.data().data.toDate() });
      });
      setList(l);
    });
  }, [data]);

  return (
    <div style={{ height: 400 }}>
      <Box sx={{ my: 4 }}>
        {list.map((item) => (
          <Box
            key={item.id}
            sx={{
              mt: 3
            }}
          >
            <Typography>{item.nome} </Typography>
            <Chip
              label={
                item.vaga === "P" || item.vaga === "nan"
                  ? "Sem reserva"
                  : item.vaga
              }
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default ListVagas;
