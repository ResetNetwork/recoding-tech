// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { titleCase } from "title-case";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import FancyTitle from "./FancyTitle";

const useStyles = makeStyles((theme) => ({
  alsoFeatured: {},
  alsoFeaturedTag: {
    color: theme.palette.error.main,
    marginBottom: 5,
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
  },
  authors: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Lexend",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  em: {
    fontSize: "0.95em",
    fontStyle: "italic",
  },
  featured: {
    height: 370,
    position: "relative",
  },
  featuredContent: {
    bottom: 0,
    paddingRight: 20,
    position: "absolute",
  },
  featuredTag: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.light,
    paddingLeft: 10,
    paddingRight: 10,
    width: 76,
  },
  tracker: {
    backgroundColor: theme.palette.policy.main,
  },
}));

function SectionArticle(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    section: { featuredArticle, alsoFeatured },
  } = props;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    setArticle(featuredArticle);
    console.log("article ->", article);
    console.log("alsoFeatured ->", alsoFeatured);
  }, []);

  const articleClick = (url) => {
    router.push({ pathname: "/" + url });
  };

  return (
    <Container>
      <Box my={4} mb={10}>
        {article ? (
          <>
            <Box mb={10}>
              <Card
                variant="outlined"
                className={`${classes.box} ${classes.featured}`}
                sx={{
                  backgroundImage: article.featuredImage
                    ? `url(${article.featuredImage})`
                    : "",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <CardActionArea
                  onClick={(e) => {
                    e.preventDefault();
                    articleClick(article.slug.current);
                  }}
                  className={classes.featuredContent}
                >
                  <CardContent>
                    <Typography
                      className={classes.featuredTag}
                      component="span"
                      variant="subtitle1"
                    >
                      Featured
                    </Typography>
                    <Typography
                      gutterBottom
                      component="div"
                      variant="h2_article"
                    >
                      {titleCase(article.title)}
                    </Typography>
                    <Typography gutterBottom component="div" variant="h5_card">
                      {article.author.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </>
        ) : null}
        {alsoFeatured && alsoFeatured.length ? (
          <>
            <FancyTitle title={"Most recent from Tech Policy Press"} />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              spacing={{ xs: 2, md: 3 }}
              mb={10}
            >
              {alsoFeatured.map((article, idx) => (
                <Grid item key={idx} xs={12} sm={4} mt={2}>
                  <Card
                    variant="outlined"
                    className={`${classes.box} ${classes.alsoFeatured}`}
                  >
                    <CardActionArea
                      onClick={() => articleClick(article.slug.current)}
                    >
                      <CardContent>
                        <Typography
                          gutterBottom
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {titleCase(article.title)}
                        </Typography>
                        <Typography className={classes.authors}>
                          {article.author.map((author) => {
                            return author.name;
                          })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : null}
      </Box>
    </Container>
  );
}

SectionArticle.propTypes = {
  section: PropTypes.object,
};

export default SectionArticle;
