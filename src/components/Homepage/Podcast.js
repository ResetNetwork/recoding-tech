// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() => ({
  article: {
    borderBottom: "1px solid",
    borderBottomColor: "#DCDCDC",
    marginBottom: 20,
    paddingBottom: 20,
  },
  lastArticle: {
    marginBottom: 20,
  },
  articleTitle: {
    color: "#000 !important",
    fontSize: "1em",
    fontWeight: "700",
    "&:hover": {
      color: "#225C9D !important",
      textDecoration: "none",
    },
  },
  articlePublication: {
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 25,
    marginBottom: 8,
    position: "relative",
  },
  em: {
    fontSize: "0.81em",
    fontStyle: "italic",
  },
  authors: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Lexend",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  grid: {
    marginTop: 32,
    paddingRight: "20px",
  },
  gridTitle: {
    borderBottom: "1px solid #000",
    marginBottom: 32,
    width: "100%",
  },
  link: {
    textDecoration: "none !important",
  },
  more: {
    textDecoration: "none",
    width: 200,
    "&:active, & :focus, &:hover": {
      color: "#FF0033",
      textDecoration: "underline",
    },
  },
  moreText: {
    backgroundColor: "#FFE5EA",
    borderRadius: 2,
    color: "#FF0033",
    fontWeight: 500,
    padding: 6,
  },
}));

function Podcast() {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid}>
      <Grid item className={classes.gridTitle}>
        <Typography component="h2" variant="h4" sx={{ marginBottom: 1 }}>
          Podcast
        </Typography>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <iframe
          src="https://player.captivate.fm/episode/d6d5d4c6-714d-47e3-b0f6-14b11ce2bab0/"
          style={{ width: "100%", height: "200px", border: "none" }}
        />
      </Grid>
    </Grid>
  );
}

Podcast.propTypes = {
  articles: PropTypes.array,
};

export default Podcast;
