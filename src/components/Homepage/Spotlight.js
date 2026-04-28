import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// components
import { CustomPortableText } from "../PortableText";
import Badge from "../Badge";
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
    <Grid container spacing={0} wrap="nowrap">
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
      <Grid
        item
        xs
        sx={{
          paddingLeft: "12px",
        }}
      >
        {article.badge && <Badge badge={article.badge} marginBottom="8px" />}
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

const Spotlight = (props) => {
  const { name, page } = props;
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [slideIndex, setSlideIndex] = useState(0);
  const n = posts.length;
  const VISIBLE = isLgUp ? 3 : isMdUp ? 2 : 1;
  const maxSlide = Math.max(0, n - VISIBLE);
  const canScroll = n > VISIBLE;

  const query = `*[!(_id in path("drafts.**")) && _type == "post" && references("${page?.topic?._ref}")]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...6]`;

  useEffect(() => {
    if (page?.topic?._ref) {
      client.fetch(query).then((articles) => {
        if (Array.isArray(articles) && articles.length) {
          setPosts(articles);
        }
      });
    }
  }, [page?.topic?._ref]);

  useEffect(() => {
    setSlideIndex(0);
  }, [posts]);

  if (!page) return <></>;

  const heroUrl =
    page.heroBackground && urlFor(page.heroBackground).width(1920).url();

  return (
    <section className="block block-hero" style={{ marginTop: "60px" }}>
      <Box
        style={{
          position: "relative",
          backgroundColor: "#343434",
          ...(heroUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 34%, rgba(0, 0, 0, 1) 100%), url(${heroUrl})`,
                backgroundSize: "100% 100%, cover",
                backgroundPosition: "center, center",
                backgroundRepeat: "no-repeat",
              }
            : {}),
        }}
      >
        <Container maxWidth="sm" className={classes.hero}>
          <Typography
            component="h4"
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "capitalize",
              justifySelf: "center!important",
              mb: 0,
            }}
          >
            {name}
          </Typography>
          <Typography
            component="h1"
            variant="h2_article"
            sx={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.5,
              justifySelf: "center!important",
              mb: 0,
              textTransform: "capitalize",
            }}
          >
            {page.title}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            className="html-to-react"
            sx={{
              fontSize: 14,
              lineHeight: 1.5,
              textAlign: "center",
              "& p": {
                margin: 0,
              },
            }}
          >
            <CustomPortableText value={page.description} />
          </Typography>

          {page.partnerLogos != null &&
            Array.isArray(page.partnerLogos) &&
            page.partnerLogos.length > 0 && (
              <>
                <Typography
                  component="p"
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    py: "14px",
                    fontSize: "16px",
                    fontWeight: 300,
                  }}
                >
                  With
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {page.partnerLogos.map((logo, index) => (
                      <Box
                        key={logo._key || index}
                        component="img"
                        src={urlFor(logo).height(160).url()}
                        alt={logo.alt || ""}
                        sx={{
                          maxHeight: 80,
                          maxWidth: 220,
                          width: "auto",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </>
            )}
        </Container>
        {canScroll && (
          <Box sx={{ position: "absolute", right: 30, bottom: 30, zIndex: 1 }}>
            <IconButton
              aria-label="Previous articles"
              onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
              disabled={slideIndex <= 0}
              sx={{
                color: "#fff",
                "&.Mui-disabled": { color: "rgba(255,255,255,0.35)" },
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
              }}
              size="large"
            >
              <ChevronRightIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "#000",
          marginTop: "-1px",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, padding: "32px 20px 60px 20px" }}>
          <CarouselRow
            items={posts}
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

Spotlight.propTypes = {
  name: PropTypes.string,
  page: PropTypes.object,
};

export default Spotlight;
