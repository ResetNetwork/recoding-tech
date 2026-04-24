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
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: 700,
    color: "#FFF !important",
  },
}));

const query = `*[!(_id in path("drafts.**")) && _type == "post" && badge == "podcast"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...3]`;

function Podcast() {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

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
          padding: "60px 40px",
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
      >
        <Grid
          container
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <svg
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              id="screenshot-7a28f8dc-0874-8024-8007-b8ae30417fa2"
              viewBox="734 3550.455 30 30"
              fill="none"
              version="1.1"
            >
              <g id="shape-7a28f8dc-0874-8024-8007-b8ae30417fa2">
                <defs></defs>
                <g
                  className="fills"
                  id="fills-7a28f8dc-0874-8024-8007-b8ae30417fa2"
                >
                  <path
                    d="M744,3580.455078125L737.33349609375,3580.455078125C736.41650390625,3580.455078125,735.6318359375,3580.1279296875,734.9794921875,3579.4755859375C734.326171875,3578.8232421875,734,3578.0380859375,734,3577.12109375L734,3565.455078125C734,3563.37109375,734.39599609375,3561.42041015625,735.1875,3559.6005859375C735.97900390625,3557.7822265625,737.048828125,3556.1982421875,738.3955078125,3554.85107421875C739.7431640625,3553.50439453125,741.326171875,3552.43359375,743.14599609375,3551.64208984375C744.9658203125,3550.8505859375,746.91650390625,3550.455078125,749,3550.455078125C751.08349609375,3550.455078125,753.0341796875,3550.8505859375,754.85400390625,3551.64208984375C756.673828125,3552.43359375,758.2568359375,3553.50439453125,759.6044921875,3554.85107421875C760.951171875,3556.1982421875,762.02099609375,3557.7822265625,762.8125,3559.6005859375C763.60400390625,3561.42041015625,764,3563.37109375,764,3565.455078125L764,3577.12109375C764,3578.0380859375,763.673828125,3578.8232421875,763.0205078125,3579.4755859375C762.3681640625,3580.1279296875,761.58349609375,3580.455078125,760.66650390625,3580.455078125L754,3580.455078125L754,3567.12109375L760.66650390625,3567.12109375L760.66650390625,3565.455078125C760.66650390625,3562.20556640625,759.53466796875,3559.4482421875,757.2705078125,3557.1845703125C755.0068359375,3554.9208984375,752.25,3553.7890625,749,3553.7890625C745.75,3553.7890625,742.9931640625,3554.9208984375,740.7294921875,3557.1845703125C738.46533203125,3559.4482421875,737.33349609375,3562.20556640625,737.33349609375,3565.455078125L737.33349609375,3567.12109375L744,3567.12109375L744,3580.455078125ZM740.66650390625,3570.455078125L737.33349609375,3570.455078125L737.33349609375,3577.12109375L740.66650390625,3577.12109375L740.66650390625,3570.455078125ZM757.33349609375,3570.455078125L757.33349609375,3577.12109375L760.66650390625,3577.12109375L760.66650390625,3570.455078125L757.33349609375,3570.455078125ZM740.66650390625,3570.455078125L737.33349609375,3570.455078125L740.66650390625,3570.455078125ZM757.33349609375,3570.455078125L760.66650390625,3570.455078125L757.33349609375,3570.455078125Z"
                    style={{ fill: "#ffffff" }}
                  ></path>
                </g>
              </g>
            </svg>
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
                  paddingX: "16px",
                  paddingY: "6px",
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
                <Grid
                  item
                  key={article._id}
                  className={classes.article}
                  xs={12}
                  md={4}
                >
                  <Grid container spacing={"10px"} wrap="nowrap">
                    <Grid item xs="auto">
                      <Link
                        href={`/${article.slug.current}`}
                        className={classes.link}
                      >
                        <img
                          src={
                            article.featuredImage
                              ? urlFor(article.featuredImage).width(200).url()
                              : null
                          }
                          alt={article.title}
                          style={{
                            width: "164px",
                            minWidth: "164px",
                            minHeight: "93px",
                          }}
                        />
                      </Link>
                    </Grid>
                    <Grid item xs>
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
                </Grid>
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
