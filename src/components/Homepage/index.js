// base imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Material UI imports
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// components
import Podcast from "./Podcast";
import AroundGlobe from "./AroundGlobe";

import Newsletter from "./Newsletter";
import Recent from "./Recent";
import FeaturedPosts from "./FeaturedPosts";
import Latest from "./Latest";
import Spotlight from "./Spotlight";
import SpotlightCompact from "./SpotlightCompact";
import ArticleColumn from "./ArticleColumn";

// utils
import client from "../../utils/sanityClient";

const query = `*[_type == "featured_posts" && title == "Homepage"] { posts[]->{_id, title, author, badge, date, featuredImage, category, date, type, slug, stackbit_model_type}, first_spotlight, second_spotlight, third_spotlight }`;

function Homepage(props) {
  const { featured, articles, fellows } = props;
  const [spotlight, setSpotlight] = useState({});

  useEffect(() => {
    client.fetch(query).then((recents) => {
      if (Array.isArray(recents) && recents.length) {
        setSpotlight(recents[0]);
      }
    });
  }, []);

  const latest = articles.filter(
    (article) => featured.find((a) => a._id === article._id) == null
  );

  const fellowsPosts = fellows
    ? fellows.filter(
        (article) =>
          latest.slice(0, 5).find((a) => a._id === article._id) == null &&
          featured.find((a) => a._id === article._id) == null
      )
    : [];

  const excludeIds = [
    ...(featured?.map((f) => f._id) || []),
    ...(latest?.slice(0, 11).map((a) => a._id) || []),
    ...(fellowsPosts && fellowsPosts.length > 0 ? [fellowsPosts[0]._id] : []),
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ maxWidth: "1383px!important" }}>
        <FeaturedPosts featured={featured} />

        <Latest articles={latest.slice(0, 6)} />

        {spotlight?.first_spotlight?.topic && (
          <Spotlight name="Spotlight" page={spotlight?.first_spotlight} />
        )}

        {spotlight?.second_spotlight?.topic && (
          <SpotlightCompact page={spotlight?.second_spotlight} />
        )}

        <Podcast />

        <Recent articles={latest.slice(5, 13)} />

        <Newsletter />

        <AroundGlobe exclude={excludeIds} />

        {spotlight?.third_spotlight?.topic && (
          <Spotlight name="Series" page={spotlight?.third_spotlight} />
        )}

        <Container sx={{ marginTop: "80px", marginBottom: "80px" }}>
          <Grid container spacing={"60px"}>
            <ArticleColumn
              topicRef={"dd7d8733-8893-4d15-9a50-fddd74596af3"}
              title="Must read"
              slug="must-read"
            />
            <ArticleColumn
              topicRef={"55470b1d-a236-491c-b158-c2ba680dfd63"}
              title="From our fellows"
              slug="2026-tech-policy-press-fellows"
            />
            <ArticleColumn
              topicRef={"86a72333-1b53-4afa-95d4-9581a48db9b9"}
              title="Resources"
              slug="resources"
            />
          </Grid>
        </Container>
      </Container>
    </>
  );
}

Homepage.propTypes = {
  citations: PropTypes.array,
  path: PropTypes.string,
  page: PropTypes.object,
  featured: PropTypes.array,
  articles: PropTypes.array,
  fellows: PropTypes.array,
};

export default Homepage;
