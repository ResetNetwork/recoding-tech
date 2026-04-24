// base imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// components
import ArticleLg from "../Topic/article-lg";
import ArticleSm from "../Topic/article-sm";

// util
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
    marginTop: "80px!important",
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

const query = `*[!(_id in path("drafts.**")) && references("11f11842-a05b-452c-b1ea-a8268c4ce2f2") && date != null]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...20]`;

function AroundGlobe({ exclude }) {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    client.fetch(query).then((recents) => {
      const posts = recents.filter((post) => !exclude.includes(post._id));
      setArticles(posts);
    });
  }, [exclude]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1010, mx: "auto" }}>
      <Grid container className={classes.grid}>
        <Grid item className={classes.gridTitle}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              color: "#202020",
              fontSize: "28px",
              textTransform: "none",
              m: 0,
            }}
          >
            Around the globe
          </Typography>
        </Grid>
        <Grid container columns={3} spacing={"30px"} mt="40px">
          {articles?.length > 0 && (
            <>
              <ArticleLg key={articles[0]._id} article={articles[0]} />
              {articles.slice(1, 4).map((article) => (
                <ArticleSm key={article._id} article={article} />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

AroundGlobe.propTypes = {
  exclude: PropTypes.array,
};

export default AroundGlobe;
