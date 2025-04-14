// base imports
import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.5,
    display: "flex",
    flexDirection: "column",
    "&>a:hover": {
      textDecoration: "underline",
    },
    "&:not(:last-child)": {
      borderBottom: "1px solid #E2D7BB77",
      paddingBottom: "10px",
    },
  },
}));

const RelatedArticles = (props) => {
  const classes = useStyles();
  const { articles } = props;

  if (!Array.isArray(articles) || !articles.length) return null;

  return (
    <section>
      <Grid container>
        <Grid container item justifyContent="space-between">
          <Grid item xs={12}>
            <Typography component="h2" variant="h4">
              Related
            </Typography>
          </Grid>
          <Box
            mb={4}
            pt={2}
            sx={{ borderTop: "1px solid #8AA29D", width: "100%" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {articles.map((article, i) => (
                <div key={i} className={classes.title}>
                  {article.badge && (
                    <Badge badge={article.badge} variant={"link"} />
                  )}
                  <Link
                    href={`/${article.slug.current}`}
                    sx={{ textDecoration: "none" }}
                  >
                    {article.title}
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
                    }}
                  >
                    {DateTime.fromISO(article.date)
                      .setLocale("en-us")
                      .toLocaleString(DateTime.DATE_FULL)}
                  </Typography>
                </div>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

RelatedArticles.propTypes = {
  section: PropTypes.object,
  articles: PropTypes.array,
};

export default RelatedArticles;
