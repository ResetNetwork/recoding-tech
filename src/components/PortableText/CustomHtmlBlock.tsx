/* eslint-disable */

import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customDiv: {
    maxWidth: "100%",
    "& iframe": {
      maxWidth: "100%",
    }
  },
}));

export const CustomHtmlBlock = ({ value, children }) => {
  const classes = useStyles();
  const { code } = value;

  return <div className={classes.customDiv} dangerouslySetInnerHTML={{__html: code}}></div>;
};
