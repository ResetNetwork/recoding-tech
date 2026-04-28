// base imports
import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// components
import Badge from "../Badge";

// utils
import urlFor from "../../utils/imageBuilder";

const useStyles = makeStyles(() => ({
  articleTitleRecent: {
    color: "#000 !important",
    fontSize: "18px",
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
    padding: "0",
  },
  gridTitle: {
    borderBottom: "1px solid #dcdcdcFF;",
    marginBottom: 32,
    width: "100%",
  },
  link: {
    textDecoration: "none !important",
  },
}));

function isBottomRow(idx, length, isMdUp) {
  if (length === 0) return false;
  if (!isMdUp) return idx === length - 1;
  const first = (Math.ceil(length / 2) - 1) * 2;
  return idx >= first;
}

const LatestArticles = (props) => {
  const { articles } = props;
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.grid}>
        <Grid item className={classes.gridTitle}>
          <Grid
            container
            alignItems={"flex-end"}
            sx={{ justifyContent: "space-between" }}
          >
            <Grid item>
              <Typography
                component="h2"
                variant="h3"
                sx={{
                  marginBottom: "20px",
                  textTransform: "none",
                  fontSize: "28px",
                }}
              >
                Latest
              </Typography>
            </Grid>
            <Grid item>
              <Link
                href="/search"
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
                    paddingX: "12px",
                    paddingY: "4px",
                    boxShadow: "0px 2px 2px 0px #0000001F",
                    textTransform: "none",
                    marginBottom: "20px",
                    "&:hover": {
                      backgroundColor: "#EEE",
                    },
                  }}
                >
                  View more
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item flexDirection="row" xs={12} columnSpacing={5}>
          {articles && articles.length
            ? articles.map((article, idx) => (
                <Grid
                  item
                  key={article._id}
                  className={classes.article}
                  xs={12}
                  md={6}
                >
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
                      xs="auto"
                      sx={{
                        borderBottom: isBottomRow(idx, articles.length, isMdUp)
                          ? "none"
                          : "1px solid #DCDCDC",
                        paddingBottom: "20px",
                        paddingTop: "6px",
                      }}
                    >
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
                    <Grid
                      item
                      xs
                      sx={{
                        borderBottom: isBottomRow(idx, articles.length, isMdUp)
                          ? "none"
                          : "1px solid #DCDCDC",
                        paddingLeft: "10px",
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
      </Grid>
    </Container>
  );
};

LatestArticles.propTypes = {
  articles: PropTypes.array,
};

export default LatestArticles;
