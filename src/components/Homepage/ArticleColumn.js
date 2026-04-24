import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { Grid, Link, Typography, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";

// utils
import client from "../../utils/sanityClient";
import urlFor from "../../utils/imageBuilder";

const useStyles = makeStyles(() => ({
  articleTitleRecent: {
    color: "#000 !important",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "1.5",
    "&:hover": {
      color: "#225C9D !important",
      textDecoration: "none",
    },
  },
  grid: {
    marginTop: "60px",
    background: "#fff",
    padding: "0 30px",
  },
  gridTitle: {
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "1.4",
    marginBottom: "30px",
    width: "100%",
  },
  link: {
    textDecoration: "none !important",
  },
}));

const ArticleColumn = (props) => {
  const { topicRef, title, slug } = props;
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const query = `*[!(_id in path("drafts.**")) && _type == "post" && references("${topicRef}")]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...6]`;

  useEffect(() => {
    client.fetch(query).then((articles) => {
      if (Array.isArray(articles) && articles.length) {
        setPosts(articles);
      }
    });
  }, []);

  return (
    <>
      {posts.length > 0 && (
        <Grid item className={classes.article} xs={12} md={4}>
          <Typography variant="h2" className={classes.gridTitle}>
            {title}
          </Typography>
          <Grid container spacing={0} flexDirection="column">
            <Grid
              item
              xs={12}
              sx={{ flexShrink: 0, minWidth: 0, width: "100%", mb: "20px" }}
            >
              <Link
                href={`/${posts[0].slug.current}`}
                className={classes.link}
                sx={{ display: "block", width: "100%", lineHeight: 0 }}
              >
                <img
                  src={
                    posts[0].featuredImage
                      ? urlFor(posts[0].featuredImage).width(300).url()
                      : null
                  }
                  alt={posts[0].title}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Link>
            </Grid>
            {posts.map((article) => (
              <Grid item key={article._id} className={classes.article}>
                <Grid
                  container
                  spacing={0}
                  wrap="nowrap"
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  <Grid
                    item
                    xs
                    sx={{
                      borderBottom: "1px solid #DCDCDC",
                      paddingBottom: "20px",
                    }}
                  >
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
                        className={classes.articleTitleRecent}
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
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item>
              <div style={{ display: "inline-block" }}>
                <Link
                  href={`/topic/${slug}`}
                  sx={{
                    height: 24,
                    textDecoration: "none",
                    width: 162,
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{
                      backgroundColor: "#FFF",
                      borderRadius: "12px",
                      border: "1px solid #000",
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: 400,
                      paddingX: "16px",
                      paddingY: "8px",
                      boxShadow: "0px 2px 2px 0px #0000001F",
                      textTransform: "none",
                      marginBottom: "30px",
                      "&:hover": {
                        backgroundColor: "#EEE",
                      },
                    }}
                  >
                    View more
                  </Typography>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

ArticleColumn.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  topicRef: PropTypes.string.isRequired,
};

export default ArticleColumn;
