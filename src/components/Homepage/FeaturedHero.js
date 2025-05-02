// base imports
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { titleCase } from "title-case";

import { makeStyles } from "@mui/styles";
import { CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Badge from "../Badge";

// util
import urlFor from "../../utils/imageBuilder";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: "0!important",
    [theme.breakpoints.down("md")]: {
      paddingRight: "0!important",
    },
  },
  box: {
    padding: 10,
    backgroundColor: theme.palette.footer.main,
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
    "&::before": {
      backgroundColor: "#fff",
      border: "1px solid #000",
      content: "''",
      height: "100%",
      left: "-8px",
      position: "absolute",
      top: 5,
      transition: "left 250ms, top 250ms",
      width: "100%",
      zIndex: "-1",
    },
    "&:active, &:focus, &:hover": {
      "&::before": {
        left: "-14px",
        top: 10,
        transition: "left 250ms, top 250ms",
      },
    },
    height: 370,
  },
  featuredCard: {
    bottom: 0,
    paddingRight: 20,
    position: "absolute",
    zIndex: 2,
  },
}));

function FeaturedHero({ article }) {
  const classes = useStyles();
  const router = useRouter();

  const articleClick = (url) => {
    router.push({ pathname: "/" + url });
  };

  return (
    <Container className={classes.container}>
      <Box my={4} mb={10}>
        {article ? (
          <Box mb={10}>
            <Card
              variant="outlined"
              className={classes.box}
              sx={{
                backgroundImage: article.featuredImage
                  ? `url(${urlFor(article.featuredImage).url()})`
                  : "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
                "&:after": {
                  background:
                    "linear-gradient(180deg,rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.9) 100%)",
                  bottom: 0,
                  content: "''",
                  height: "100%",
                  left: 0,
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "100%",
                  zIndex: 1,
                },
              }}
            >
              <CardActionArea
                onClick={(e) => {
                  e.preventDefault();
                  articleClick(article.slug.current);
                }}
                className={classes.featuredCard}
              >
                <CardContent>
                  {article.badge && <Badge badge={article.badge} />}
                  <Typography
                    gutterBottom
                    component="div"
                    variant="h2_article"
                    color={article.featuredImage ? "#FFF" : "#000"}
                  >
                    {titleCase(article.title)}
                  </Typography>
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
                      .setLocale("en-us")
                      .toLocaleString(DateTime.DATE_FULL)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}

FeaturedHero.propTypes = {
  article: PropTypes.object,
};

export default FeaturedHero;
