// base imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import { Box, Grid, Typography, Link } from "@mui/material";

//utils
import urlFor from "../../utils/imageBuilder";
import client from "../../utils/sanityClient";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none !important",
  },
  articleTitleRecent: {
    fontSize: "18px",
    lineHeight: "1.5",
    fontWeight: 700,
    color: "#FFF !important",
  },
}));

const query = `*[!(_id in path("drafts.**")) && _type == "post" && badge == "podcast"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...3]`;

const ArticleCard = ({ article }) => {
  const classes = useStyles();

  const imageUrl = article.featuredImage
    ? urlFor(article.featuredImage).width(200).url()
    : null;

  return (
    <Grid item key={article._id} className={classes.article} xs={12} md={4}>
      <Box
        sx={(theme) => ({
          position: "relative",
          ...(imageUrl
            ? {
                [theme.breakpoints.down("sm")]: {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  minHeight: 150,
                  p: 1,
                  pt: 2,
                  mt: 2,
                  overflow: "hidden",
                  borderRadius: 1,
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.2) 100%), url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                },
              }
            : {}),
        })}
      >
        <Grid container spacing={"10px"} wrap="nowrap">
          <Grid
            item
            xs="auto"
            sx={{
              display: { xs: "none", sm: "flex" },
              paddingTop: "5px!important",
            }}
          >
            <Link href={`/${article.slug.current}`} className={classes.link}>
              <img
                src={imageUrl}
                alt={article.title}
                style={{
                  width: "164px",
                  minWidth: "164px",
                  minHeight: "93px",
                }}
              />
            </Link>
          </Grid>
          <Grid item xs sx={{ paddingTop: "0px!important" }}>
            <Link href={`/${article.slug.current}`} className={classes.link}>
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
                lineHeight: 1.75,
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
      </Box>
    </Grid>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

function Podcast() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(query).then((articles) => {
      if (Array.isArray(articles) && articles.length) {
        setPosts(articles);
      }
    });
  }, []);

  const heroUrl =
    posts.length > 0 &&
    posts[0].featuredImage &&
    urlFor(posts[0].featuredImage).width(1920).url();

  return (
    <section className="block block-hero" style={{ marginTop: "60px" }}>
      <Box
        style={{
          position: "relative",
          backgroundColor: "#343434FF",
          ...(heroUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0.7) 22%,rgba(0, 0, 0, 1) 100%), url(${heroUrl})`,
                backgroundSize: "100% 100%, cover",
                backgroundPosition: "center, center",
                backgroundRepeat: "no-repeat",
              }
            : {}),
        }}
        sx={{
          padding: { xs: "40px 20px", md: "60px 40px" },
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: 700,
                mb: 0,
                ml: "15px",
              }}
            >
              Podcast
            </Typography>
          </Grid>
          <Grid item>
            <Link
              href="/podcast"
              sx={{
                height: 24,
                textDecoration: "none",
                width: 162,
                verticalAlign: "middle",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              <Typography
                component="div"
                variant="h5"
                sx={{
                  borderRadius: "12px",
                  border: "1px solid #fff",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 400,
                  paddingX: "12px",
                  paddingY: "4px",
                  boxShadow: "0px 2px 2px 0px #0000001F",
                  textTransform: "none",
                  marginBottom: "20px",
                  "&:hover": {
                    backgroundColor: "#222",
                  },
                }}
              >
                View more
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid container columnSpacing={"20px"} sx={{ mt: "30px" }}>
          {posts && posts.length
            ? posts.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))
            : null}
        </Grid>
      </Box>
    </section>
  );
}

Podcast.propTypes = {
  articles: PropTypes.array,
};

export default Podcast;
