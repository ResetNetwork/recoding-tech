/* eslint-disable */

import React from "react";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%'
  },
  tableHeaderRow: {
    "&:active, &:focus, &:hover": {
      backgroundColor: "#FFF !important",
    },
  },
  tableRow: {
    fontFamily: "'Lexend', sans-serif!important",
    fontSize: "1em",
    fontWeight: 400,
    lineHeight: 1.4,
    textTransform: "none",
  }
}));

export const CustomTable = ({ value, children }) => {
  const classes = useStyles();

  const [headers, ...rows] = value.rows;

  return (
    <TableContainer>
      <Table sx={{ overflowX: "auto" }}>
        <TableHead>
          <TableRow className={classes.tableHeaderRow}>
            {headers.cells.map((cell, index) => (
              <TableCell key={index}>
                <Typography component="span" variant="tableHeader">
                  {cell}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow hover role="checkbox" key={index}>
              {row.cells.map((cell, index) => (
                <TableCell key={index}>
                  <Typography component="span" className={classes.tableRow}>
                    {cell}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
