import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { toPlainText } from "@portabletext/react";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

// components
import Badge from "../Badge";

// utils
import urlFor from "../../utils/imageBuilder";

const useStyles = makeStyles((theme) => ({
  article: {
    width: "100%",
    borderBottom: "1px solid #626262FF",
    marginBottom: 20,
    paddingBottom: 20,
    "&:last-child": {
      borderBottom: "none",
      marginBottom: 0,
      paddingBottom: 0,
    },
  },
  articleTitle: {
    color: "#FFF !important",
    fontSize: "1em",
    fontWeight: "700",
    lineHeight: 1.5,
    "&:hover": {
      color: "#FFF !important",
      textDecoration: "none",
    },
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
  link: {
    textDecoration: "none !important",
  },
}));

const FeaturedPosts = ({ featured }) => {
  const classes = useStyles();

  const [main, ...rest] = featured;

  const bgUrl =
    main.featuredImage && urlFor(main.featuredImage).width(1200).url();

  const articles = (
    <>
      <Grid item className={classes.article}>
        <Typography
          gutterBottom
          component="div"
          variant="h2"
          color={"#FFF"}
          mb={0}
          fontSize="28px"
          fontWeight="700"
          lineHeight="1.2"
        >
          Featured
        </Typography>
      </Grid>
      {rest && rest.length
        ? rest.map((article) => (
            <Grid key={article._id} item className={classes.article}>
              <Grid container className={classes.articleGrid}>
                <Grid item>
                  {article.badge && (
                    <Badge badge={article.badge} marginBottom="8px" />
                  )}
                  <Link
                    href={`/${article.slug.current}`}
                    className={classes.link}
                  >
                    <Typography
                      component="div"
                      variant="body1"
                      className={classes.articleTitle}
                      sx={{
                        fontFamily: "Lexend!important",
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
                      fontSize: 16,
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
    </>
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 320, md: 700 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 1) 100%)",
              zIndex: 0,
            },
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: { xs: 320, md: 590 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "stretch" },
            p: { xs: 2, md: 7 },
            pr: { md: 60 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              color: "#fff",
              minWidth: 0,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {main.badge && (
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Badge badge={main.badge} />
                </Box>
              )}
              <Link href={`/${main.slug.current}`} className={classes.link}>
                <Typography
                  gutterBottom
                  component="div"
                  variant="h2_article"
                  fontSize="36px"
                  color={main.featuredImage ? "#FFF" : "#000"}
                >
                  {main.title}
                </Typography>
              </Link>
              {main.body && (
                <Link href={`/${main.slug.current}`} className={classes.link}>
                  <Typography
                    component="div"
                    variant="body1"
                    fontSize="14px"
                    fontWeight="300"
                    lineHeight="1.5"
                    color={main.featuredImage ? "#FFF" : "#000"}
                    sx={{
                      fontFamily: "Lexend!important",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {toPlainText(main.body).substring(0, 300)}
                  </Typography>
                </Link>
              )}
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: "#a7a7a7",
                  fontSize: 18,
                  fontWeight: 400,
                  marginTop: "8px",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                  display: "inline-block",
                }}
              >
                {DateTime.fromISO(main.date)
                  .setZone("America/New_York")
                  .setLocale("en-us")
                  .toLocaleString(DateTime.DATE_FULL)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              top: (t) => t.spacing(4),
              bottom: "auto",
              right: (t) => t.spacing(5),
              width: "min(320px, 32vw)",
              flexDirection: "column",
              background: "#343434FF",
              p: 3,
              boxShadow: 3,
            }}
          >
            <Grid container>{articles}</Grid>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          bgcolor: "rgba(30,30,30,0.9)",
          p: 2,
        }}
      >
        {articles}
      </Box>
    </Box>
  );
};

FeaturedPosts.propTypes = {
  featured: PropTypes.array,
};

export default FeaturedPosts;
