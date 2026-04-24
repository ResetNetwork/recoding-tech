import React from "react";

import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import urlFor from "../utils/imageBuilder";

// components
import { Layout } from "../components/index";
import PageRecents from "../components/PageRecents";
import { CustomPortableText } from "../components/PortableText";

const useStyles = makeStyles(() => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
  },
  em: {
    fontStyle: "italic",
  },
  maxWidth: {
    maxWidth: "100% !important",
  },
  hero: {
    paddingTop: "65px",
    paddingBottom: "60px",
    color: "#FFF",
  },
}));

const Topic = (props) => {
  const classes = useStyles();
  const { page, headlines } = props;

  const heroUrl =
    page.heroBackground && urlFor(page.heroBackground).width(1920).url();

  return (
    <Layout {...props} isHomepage={true}>
      <section id={page._id} className="block block-hero">
        <Box
          style={{
            backgroundColor: "#343434FF",
            ...(heroUrl
              ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 46%, rgba(0, 0, 0, 1) 100%), url(${heroUrl})`,
                  backgroundSize: "cover, cover",
                  backgroundPosition: "center, center",
                  backgroundRepeat: "no-repeat",
                }
              : {}),
          }}
        >
          <Container
            maxWidth="sm"
            className={classes.hero}
            sx={{
              paddingBottom: page.showLogos
                ? "30px!important"
                : "60px!important",
            }}
          >
            {page.topicType && (
              <Typography
                component="h4"
                variant="h4"
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  justifySelf: "center",
                  mb: 0,
                }}
              >
                {page.topicType}
              </Typography>
            )}
            <Typography
              component="h1"
              variant="h2_article"
              sx={{
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: 1.5,
                justifySelf: "center",
                mb: 0,
              }}
            >
              {page.displayName}
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

            {page.showLogos &&
              page.partnerLogos != null &&
              Array.isArray(page.partnerLogos) &&
              page.partnerLogos.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent: "center",
                    gap: 1.5,
                    mt: "30px",
                  }}
                >
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      mb: 0,
                      fontSize: 14,
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                      textTransform: "lowercase",
                      color: "inherit",
                    }}
                  >
                    with
                  </Typography>
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
                          width: "auto",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
          </Container>
        </Box>
        {page.showNewsletterSignup && (
          <Box
            sx={{
              backgroundColor: "#000",
              paddingBottom: "60px",
              marginTop: "-1px",
            }}
          >
            <Container maxWidth="sm">
              <div
                id="mlb2-5983225"
                className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983225"
              >
                <div className="ml-form-align-center">
                  <div
                    className="ml-form-embedWrapper embedForm"
                    style={{
                      maxWidth: "100%",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div
                      className="ml-form-embedBody ml-form-embedBodyDefault row-form"
                      style={{ padding: "0" }}
                    >
                      <div className="ml-form-embedContent">
                        <h4
                          style={{
                            color: "#FFF",
                            fontFamily: "Libre Baskerville",
                            textTransform: "none",
                            fontSize: "24px",
                            fontWeight: 700,
                            lineHeight: 1.5,
                            marginBottom: 0,
                          }}
                        >
                          Our content delivered to your inbox
                        </h4>
                        <p
                          style={{
                            textAlign: "center",
                            color: "#FFF",
                            fontWeight: 300,
                          }}
                        >
                          Join our newsletter on the topic of {page.displayName}
                        </p>
                      </div>
                      <form
                        className="ml-block-form"
                        action="https://static.mailerlite.com/webforms/submit/s8h5n5"
                        data-code="s8h5n5"
                        method="post"
                        target="_blank"
                        style={{
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <div className="ml-form-formContent">
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
                        <div
                          className="ml-form-embedSubmit"
                          style={{ maxWidth: "126px" }}
                        >
                          <button
                            type="submit"
                            style={{
                              height: "43px",
                              backgroundColor: "#589383FF!important",
                              borderRadius: "12px!important",
                              fontSize: "16px!important",
                              fontWeight: "400!important",
                              textTransform: "uppercase",
                              fontFamily: "Lexend, sans-serif!important",
                              paddingLeft: "16px!important",
                              paddingRight: "16px!important",
                            }}
                          >
                            Subscribe
                          </button>
                          <button
                            disabled="disabled"
                            style={{ display: "none" }}
                            type="button"
                            className="loading"
                          >
                            {" "}
                            <div className="ml-form-embedSubmitLoad"></div>{" "}
                            <span className="sr-only">Loading...</span>{" "}
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
                        <h4 style={{ color: "#FFF" }}>Thank you!</h4>
                        <p style={{ textAlign: "center", color: "#FFF" }}>
                          You have successfully joined our subscriber list.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Box>
        )}
      </section>
      <Box my={8}>
        <Container>
          <Box marginTop={4}>
            <PageRecents page={page} readings={headlines} />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

Topic.propTypes = {
  page: PropTypes.object,
  actions: PropTypes.array,
  headlines: PropTypes.array,
};

export default Topic;
