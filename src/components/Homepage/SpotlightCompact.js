import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// components
import ArticleLg from "../Topic/article-lg";
import ArticleSm from "../Topic/article-sm";

//utils
import client from "../../utils/sanityClient";

const useStyles = makeStyles(() => ({
  hero: {
    maxWidth: "981px!important",
    color: "#FFF",
  },
  articleTitleRecent: {
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: 700,
    color: "#FFF !important",
  },
}));

const SpotlightCompact = (props) => {
  const { page } = props;
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const query = `*[!(_id in path("drafts.**")) && _type == "post" && references("${page?.topic?._ref}")]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...6]`;

  useEffect(() => {
    if (page?.topic?._ref) {
      client.fetch(query).then((articles) => {
        if (Array.isArray(articles) && articles.length) {
          setPosts(articles);
        }
      });
    }
  }, [page?.topic?._ref]);

  if (!page || posts.length === 0) return <></>;

  return (
    <section
      className="block block-hero"
      style={{ marginTop: isMdUp ? "80px" : "40px" }}
    >
      <Container maxWidth="lg" className={classes.hero}>
        <Typography variant="h2" sx={{ color: "#000" }}>
          {page.title}
        </Typography>

        <Grid container columns={3} spacing={"30px"} mt="30px">
          {isMdUp ? (
            <ArticleLg article={posts[0]} />
          ) : (
            <ArticleSm article={posts[0]} />
          )}
          {posts && posts.length
            ? posts
                .slice(1, 4)
                .map((article) => (
                  <ArticleSm key={article._id} article={article} />
                ))
            : null}
        </Grid>
      </Container>
    </section>
  );
};

SpotlightCompact.propTypes = {
  page: PropTypes.object,
};

export default SpotlightCompact;
