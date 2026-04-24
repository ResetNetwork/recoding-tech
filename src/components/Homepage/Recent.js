// base imports
import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

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
    padding: "0 30px",
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

const RecentArticles = (props) => {
  const { articles } = props;
  const classes = useStyles();

  return (
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
                marginBottom: "30px",
                textTransform: "none",
                fontSize: "28px",
              }}
            >
              Recent
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
          </Grid>
        </Grid>
      </Grid>
      <Grid container item flexDirection="row" xs={12} columnSpacing={"30px"}>
        {articles &&
          articles.length &&
          [0, 1, 2, 3].map((item) => (
            <Grid item key={item} className={classes.article} xs={12} md={3}>
              <Grid container spacing={0} flexDirection="column">
                <Grid
                  item
                  xs={12}
                  sx={{ flexShrink: 0, minWidth: 0, width: "100%", mb: "20px" }}
                >
                  <Link
                    href={`/${articles[item * 2].slug.current}`}
                    className={classes.link}
                    sx={{ display: "block", width: "100%", lineHeight: 0 }}
                  >
                    <img
                      src={
                        articles[item * 2].featuredImage
                          ? urlFor(articles[item * 2].featuredImage)
                              .width(300)
                              .url()
                          : null
                      }
                      alt={articles[item * 2].title}
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Link>
                </Grid>
                {articles
                  .slice(item * 2, (item + 1) * 2)
                  .map((article, index) => (
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
                            borderBottom:
                              index == 0 ? "1px solid #DCDCDC" : "none",
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
                  ))}
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

RecentArticles.propTypes = {
  articles: PropTypes.array,
};

export default RecentArticles;
