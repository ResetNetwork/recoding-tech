// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// Material UI imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// components
import components, { Layout } from "../components/index";
import SectionHero from "../components/SectionHero";
import SectionHeroTracker from "../components/SectionHeroTracker";
import SectionRecentArticles from "../components/SectionRecentArticles";

// utils
import FeaturedHero from "../components/Homepage/FeaturedHero";
import FeaturedStories from "../components/Homepage/FeatureStories";
import Podcast from "../components/Homepage/Podcast";
import LatestFromFellows from "../components/Homepage/LatestFromFellows";
import RecentArticles from "../components/Homepage/RecentArticles";
import SpotlightArticles from "../components/Homepage/SpotlightArticles";
import AroundGlobe from "../components/Homepage/AroundGlobe";
import PolicyTracker from "../components/Homepage/PolicyTracker";
import Announcements from "../components/Homepage/Announcements";

const Advanced = (props) => {
  const { path, page, featured, articles, fellows } = props;

  const latest =
    path === "/"
      ? articles.filter(
          (article) =>
            featured.find((a) => a._id === article._id) == null &&
            fellows.find((a) => a._id === article._id) == null
        )
      : undefined;

  const excludeIds = [
    ...(featured?.map((f) => f._id) || []),
    ...(latest?.slice(0, 11).map((a) => a._id) || []),
    ...(fellows?.map((f) => f._id) || []),
  ];

  return (
    <Layout {...props} isHomepage>
      <Box>
        {path === "/" ? (
          <>
            <div
              id="mlb2-5983540"
              className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983540"
            >
              <div className="ml-form-align-center">
                <div className="ml-form-embedWrapper embedForm">
                  <div
                    className="ml-form-embedBody ml-form-embedBodyDefault row-form"
                    style={{ justifyContent: "center", columnGap: "60px" }}
                  >
                    <div className="ml-form-embedContent">
                      <h4>
                        Join our newsletter on issues and ideas at the
                        intersection of tech & democracy
                      </h4>
                    </div>
                    <form
                      className="ml-block-form"
                      action="https://static.mailerlite.com/webforms/submit/v2f5x1"
                      data-code="v2f5x1"
                      method="post"
                      target="_blank"
                      style={{
                        maxWidth: "360px",
                        marginLeft: 0,
                        display: "flex",
                        columnGap: "10px",
                        justifySelf: "center",
                      }}
                    >
                      <div
                        className="ml-form-formContent"
                        style={{ maxWidth: "250px" }}
                      >
                        <div className="ml-form-fieldRow ml-last-item">
                          <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                            <input
                              aria-label="email"
                              aria-required="true"
                              type="email"
                              className="form-control"
                              data-inputmask=""
                              name="fields[email]"
                              placeholder="Enter email address"
                              autoComplete="email"
                            />
                          </div>
                        </div>
                      </div>
                      <input type="hidden" name="ml-submit" value="1" />
                      <div className="ml-form-embedSubmit">
                        <button type="submit" className="primary">
                          Subscribe
                        </button>
                        <button
                          disabled="disabled"
                          style={{ display: "none" }}
                          type="button"
                          className="loading"
                        >
                          <div className="ml-form-embedSubmitLoad" />
                          <span className="sr-only">Loading...</span>
                        </button>
                      </div>
                      <input type="hidden" name="anticsrf" value="true" />
                    </form>
                  </div>
                  <div
                    className="ml-form-successBody row-success"
                    style={{ display: "none" }}
                  >
                    <div className="ml-form-successContent">
                      <h4>Thank you!</h4>
                      <p style={{ textAlign: "center" }}>
                        <br />
                      </p>
                      <p style={{ textAlign: "center" }}>
                        You have successfully joined our mailing list.
                      </p>
                      <p style={{ textAlign: "center" }}>
                        More to come in January 2021 !
                      </p>
                      <p style={{ textAlign: "center" }}>
                        Want to get in touch now?{" "}
                        <a href="mailto:justin@techpolicy.press">Email us</a>
                        .&nbsp;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Container>
              <Grid
                container
                spacing={4}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                {featured && (
                  <Grid item xs={12} md={8}>
                    <FeaturedHero article={featured[0]} />
                    <FeaturedStories articles={featured.slice(1)} />
                  </Grid>
                )}
                <Grid container item xs={12} md={4}>
                  <Grid item>
                    <SectionRecentArticles articles={latest.slice(0, 5)} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ marginTop: 1 }}>
                <Grid item xs={12} md={6}>
                  <Podcast />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LatestFromFellows
                    articles={fellows.filter(
                      (article) => !featured.some((a) => a._id === article._id)
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ marginTop: 1 }}>
                <Grid item xs={12} md={4}>
                  <RecentArticles articles={latest.slice(5, 11)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <AroundGlobe exclude={excludeIds} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SpotlightArticles />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={4}
                sx={{ marginTop: 7, marginBottom: 7 }}
              >
                <Grid item xs={12} md={8}>
                  <PolicyTracker
                    trackerText={page.trackerText ? page.trackerText : ""}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ backgroundColor: "#efe9da80", padding: "24px" }}>
                    <Announcements />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </>
        ) : (
          <>
            {path === "/tracker" ? (
              <SectionHeroTracker {...props} />
            ) : (
              <SectionHero {...props} />
            )}
            <Container>
              {_.map(
                _.get(props, "page.sections", null),
                (section, section_idx) => {
                  let component = _.upperFirst(
                    _.camelCase(_.get(section, "type", null))
                  );
                  let Component = components[component];
                  return (
                    <Component
                      key={section_idx}
                      {...props}
                      section={section}
                      site={props}
                    />
                  );
                }
              )}
            </Container>
          </>
        )}
      </Box>
    </Layout>
  );
};

Advanced.propTypes = {
  citations: PropTypes.array,
  path: PropTypes.string,
  page: PropTypes.object,
  featured: PropTypes.array,
  articles: PropTypes.array,
  fellows: PropTypes.array,
};

export default Advanced;
