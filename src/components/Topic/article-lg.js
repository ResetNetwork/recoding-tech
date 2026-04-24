import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import { Box, Link, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import Badge from "../Badge";

// util
import urlFor from "../../utils/imageBuilder";

const useStyles = makeStyles((theme) => ({
  article: {
    marginBottom: 20,
    paddingBottom: 20,
    paddingTop: "0px!important",
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
  articleGrid: {
    flexDirection: "column",
    flexWrap: "nowrap",
    columnGap: "16px",
    rowGap: "8px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
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
    marginTop: 20,
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

const ArticleLg = (props) => {
  const { article } = props;
  const classes = useStyles();

  return (
    <Grid key={article._id} item xs={3} sm={3} className={classes.article}>
      <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <Link href={`/${article.slug.current}`} style={{ display: "block" }}>
          <img
            src={urlFor(article.featuredImage).width(965).url()}
            style={{ width: "100%", display: "block", verticalAlign: "bottom" }}
          />
        </Link>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: { sm: "50%", xs: "100%" },
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 1) 100%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: { sm: "40px", xs: "0px" },
            mx: "auto",
            maxWidth: 670,
            p: { sm: 0, xs: 2 },
            zIndex: 1,
          }}
        >
          {article.badge && <Badge badge={article.badge} />}
          <Link
            href={`/${article.slug.current}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              gutterBottom
              component="div"
              variant="h2_article"
              color={article.featuredImage ? "#FFF" : "#000"}
              mb="0"
              sx={{
                fontSize: { sm: "27px", xs: "16px" },
                lineHeight: "1.5",
              }}
            >
              {article.title}
            </Typography>
          </Link>
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: "#a7a7a7",
              fontSize: 14,
              fontWeight: 400,
              marginTop: "8px",
              textTransform: "uppercase",
              lineHeight: 1.5,
              display: "inline-block",
            }}
          >
            {DateTime.fromISO(article.date)
              .setZone("America/New_York")
              .setLocale("en-us")
              .toLocaleString(DateTime.DATE_FULL)}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

ArticleLg.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleLg;
