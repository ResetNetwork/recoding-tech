import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import { Grid, Link, Typography, Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// components
import CarouselRow from "../CarouselRow";

//utils
import urlFor from "../../utils/imageBuilder";
import client from "../../utils/sanityClient";

const useStyles = makeStyles(() => ({
  hero: {
    paddingTop: "40px",
    paddingBottom: "40px",
    color: "#FFF",
  },
  articleTitleRecent: {
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: 700,
    color: "#FFF !important",
  },
}));

const ArticleCard = ({ article }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={0} wrap="nowrap" direction="column">
      <Grid item xs="auto">
        <Link href={`/${article.slug.current}`} className={classes.link}>
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
      <Grid item xs sx={{ marginTop: "12px" }}>
        {article.badge && (
          <Typography
            variant="body1"
            sx={{
              color: "#FFF",
              marginBottom: "8px",
              textTransform: "uppercase",
              fontFamily: "Lexend",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: 1.75,
            }}
          >
            {article.badge}
          </Typography>
        )}
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
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

const Series = (props) => {
  const [articles, setArticles] = useState([]);
  const { id, topics } = props;
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [slideIndex, setSlideIndex] = useState(0);
  const n = articles.length;
  const VISIBLE = isLgUp ? 3 : isMdUp ? 2 : 1;
  const maxSlide = Math.max(0, n - VISIBLE);

  if (!Array.isArray(topics) || !topics.length) return null;

  const seriesTopic = topics.find((topic) => topic.topicType === "series");

  if (!seriesTopic) return null;

  const query = `*[!(_id in path("drafts.**")) && _type == "post" && references("${seriesTopic._id}") && _id != "${id}"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...6]`;

  useEffect(() => {
    if (seriesTopic._id) {
      client.fetch(query).then((articles) => {
        if (Array.isArray(articles) && articles.length) {
          setArticles(articles);
        }
      });
    }
  }, [seriesTopic._id]);

  return (
    <section
      className="block block-hero"
      style={{
        marginTop: "40px",
        marginBottom: "40px",
        padding: "20px",
        backgroundColor: "#000",
      }}
    >
      <Box
        style={{
          position: "relative",
          paddingBottom: "17px",
          borderBottom: "2px solid #505050",
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item>
            <Typography
              variant="h2"
              sx={{
                color: "#FFF",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: 1.5,
                m: 0,
              }}
            >
              Read other aticles in this series
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Previous articles"
              onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
              disabled={slideIndex <= 0}
              sx={{
                color: "#fff",
                "&.Mui-disabled": { color: "rgba(255,255,255,0.35)" },
                padding: 0,
              }}
              size="large"
            >
              <ChevronLeftIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton
              aria-label="Next articles"
              onClick={() => setSlideIndex((i) => Math.min(maxSlide, i + 1))}
              disabled={slideIndex >= maxSlide}
              sx={{
                color: "#fff",
                "&.Mui-disabled": { color: "rgba(255,255,255,0.35)" },
                padding: 0,
              }}
              size="large"
            >
              <ChevronRightIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          backgroundColor: "#000",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, padding: "20px 0 0 0" }}>
          <CarouselRow
            items={articles}
            slideIndex={slideIndex}
            onSlideIndexChange={setSlideIndex}
            visibleCount={VISIBLE}
            getItemKey={(article) => article._id}
            renderItem={(article) => <ArticleCard article={article} />}
          />
        </Box>
      </Box>
    </section>
  );
};

Series.propTypes = {
  id: PropTypes.string.isRequired,
  topics: PropTypes.array.isRequired,
};

export default Series;
