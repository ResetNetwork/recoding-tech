// base imports
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Badge from "../Badge";

// util
import urlFor from "../../utils/imageBuilder";
import client from "../../utils/sanityClient";

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

const query = `*[_type == "featured_posts" && title == "Homepage - Spotlight"] { posts[]->{_id, title, author, badge, date, featuredImage, category, date, type, slug, stackbit_model_type} }`;

function SpotlightArticles() {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    client.fetch(query).then((recents) => {
      setArticles(recents[0].posts);
    });
  }, []);

  return (
    <Grid container className={classes.grid}>
      <Grid item className={classes.gridTitle}>
        <Typography component="h2" variant="h4" sx={{ marginBottom: 1 }}>
          Spotlight
        </Typography>
      </Grid>
      <Grid container item flexDirection="column">
        {articles && articles.length > 0
          ? articles.map((article, index) => (
              <Grid key={article._id} item className={classes.article}>
                <Grid container className={classes.articleGrid}>
                  {index === 0 && article.featuredImage && (
                    <Grid item>
                      <Link href={`/${article.slug.current}`}>
                        <img
                          src={urlFor(article.featuredImage).width(400).url()}
                          style={{ maxWidth: "100%" }}
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
            ))
          : null}
        <Grid item>
          <Link
            href="/search"
            sx={{
              height: 24,
              textDecoration: "none",
              display: "inline-block",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                backgroundColor: "#ffe5eaFF",
                borderRadius: "4px",
                color: "#FF0033",
                fontWeight: 500,
                paddingX: "10px",
                paddingY: "6px",
                boxShadow: "0px 2px 2px 0px #0000001F",
                "&:active, & :focus, &:hover": {
                  color: "#FF0033",
                  textDecoration: "underline",
                },
                marginBottom: "7px",
              }}
            >
              View more
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

SpotlightArticles.propTypes = {};

export default SpotlightArticles;
