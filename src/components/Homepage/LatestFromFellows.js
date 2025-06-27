// base imports
import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Badge from "../Badge";

// utils
import urlFor from "../../utils/imageBuilder";

const useStyles = makeStyles((theme) => ({
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
  articleGrid: {
    flexDirection: "row",
    flexWrap: "nowrap",
    columnGap: "16px",
    rowGap: "8px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  image: {
    maxWidth: "280px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
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
    marginTop: 32,
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

function LatestFromFellows({ articles }) {
  const classes = useStyles();

  const article = articles && articles.length > 0 ? articles[0] : null;

  return (
    <Grid container className={classes.grid}>
      <Grid item className={classes.gridTitle}>
        <Typography component="h2" variant="h4" sx={{ marginBottom: 1 }}>
          Latest From Our Fellows
        </Typography>
      </Grid>
      <Grid item>
        {article ? (
          <Grid key={article._id} item className={classes.article}>
            <Grid container className={classes.articleGrid}>
              {article.featuredImage && (
                <Grid item>
                  <Link href={`/${article.slug.current}`}>
                    <img
                      src={urlFor(article.featuredImage).width(400).url()}
                      className={classes.image}
                    />
                  </Link>
                </Grid>
              )}
              <Grid item>
                {article.badge && (
                  <Badge badge={article.badge} variant={"link"} />
                )}
                <Link
                  href={`/${article.slug.current}`}
                  className={classes.link}
                >
                  <Typography
                    component="div"
                    variant="body1"
                    className={classes.articleTitle}
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
                    lineHeight: 1.75,
                    display: "inline-block",
                  }}
                >
                  {DateTime.fromISO(article.date)
                    .setLocale("en-us")
                    .toLocaleString(DateTime.DATE_FULL)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

LatestFromFellows.propTypes = {
  articles: PropTypes.array,
};

export default LatestFromFellows;
