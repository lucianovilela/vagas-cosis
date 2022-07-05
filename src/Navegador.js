import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMyContext } from "./MyContext";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export default function Navegador() {
  const [{ user, data }, { addDate, minusDate }] = useMyContext();

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton onClick={() => minusDate()} size="large">
          <ArrowLeftIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItens: "center" }}>
          <Typography>{formatDate(data)}</Typography>
        </Box>
        <IconButton onClick={() => addDate()}>
          <ArrowRightIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
