// base imports
import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Material UI imports
import { Box, Typography, Container, Grid, Link } from "@mui/material";

import { Layout } from "../components/index";

//utils
import urlFor from "../utils/imageBuilder";

const Newsletter = (props) => {
  const {
    data: { articles },
  } = props;

  return (
    <Layout {...props}>
      <Box mb={4}>
        <Box
          sx={{
            padding: "60px 0",
            backgroundColor: "#37675c",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h2_article"
            sx={{
              color: "#fff",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.5,
              justifySelf: "center",
              mb: 0,
            }}
          >
            Newsletter
          </Typography>
          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#fff",
              fontSize: 14,
              lineHeight: 1.5,
              textAlign: "center",
              "& p": {
                margin: 0,
              },
            }}
          >
            Tech Policy press publishes a weekly (and sometimes more often)
            newsletter. <br />
            Give it a read and let us know what you think!
          </Typography>

          <Typography
            component="h1"
            variant="h2_article"
            sx={{
              color: "#fff",
              fontSize: "27px",
              fontWeight: 700,
              lineHeight: 1.5,
              justifySelf: "center",
              marginTop: "40px",
              mb: 0,
            }}
          >
            Sign up
          </Typography>

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
                  <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                    <form
                      className="ml-block-form"
                      action="https://static.mailerlite.com/webforms/submit/s8h5n5"
                      data-code="s8h5n5"
                      method="post"
                      target="_blank"
                    >
                      <div style={{ display: "flex" }}>
                        <Box
                          sx={{
                            width: "100%",
                            minWidth: 0,
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
                            "& .ml-form-formContent": {
                              flex: "1 1 0%",
                              minWidth: 0,
                              width: "auto !important",
                              float: "none !important",
                              marginBottom: "0 !important",
                            },
                            "& .ml-form-embedSubmit": {
                              flex: "0 0 auto",
                              width: "auto !important",
                              float: "none !important",
                              marginBottom: "0 !important",
                            },
                            "& .ml-form-embedSubmit button.primary": {
                              width: "auto !important",
                              whiteSpace: "nowrap",
                            },
                          }}
                        >
                          <div
                            className="ml-form-formContent"
                            style={{
                              flex: "1 1 0%",
                              minWidth: 0,
                              marginBottom: "0px",
                            }}
                          >
                            <div className="ml-form-fieldRow ml-last-item">
                              <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                <input
                                  aria-label="email"
                                  aria-required="true"
                                  type="email"
                                  data-inputmask=""
                                  name="fields[email]"
                                  placeholder="Enter email address"
                                  autoComplete="email"
                                  style={{
                                    padding: "9px !important",
                                    width: "100%",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name="ml-submit" value="1" />
                          <div
                            className="ml-form-embedSubmit"
                            style={{ marginBottom: "0px", flex: "0 0 auto" }}
                          >
                            <button
                              type="submit"
                              className="primary"
                              style={{
                                backgroundColor: "#589383!important",
                                fontFamily: "Lexend, sans-serif!important",
                                display: "flex",
                                fontSize: "16px !important",
                                lineHeight: 1.5,
                                fontWeight: "400 !important",
                                alignItems: "center",
                                padding: "10px 16px !important",
                                textTransform: "uppercase",
                                borderRadius: "12px!important",
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
                        </Box>
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
                        You have successfully joined our subscriber list.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Box>

        <Container
          sx={{
            marginTop: "75px",
            marginBottom: "60px",
            maxWidth: "1300px!important",
            mx: "auto",
          }}
        >
          <Grid container spacing={"20px"}>
            {articles.map((article) => (
              <Grid item xs={12} md={4} key={article._id}>
                <Box sx={{ position: "relative" }}>
                  <Link
                    href={`/${article.slug.current}`}
                    style={{ display: "block" }}
                  >
                    <img
                      src={
                        article.featuredImage
                          ? urlFor(article.featuredImage).width(500).url()
                          : null
                      }
                      style={{
                        width: "418px",
                        display: "block",
                        verticalAlign: "bottom",
                        maxWidth: "100%",
                      }}
                    />
                  </Link>
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: { sm: "50%", xs: "100%" },
                      background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 1) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                      padding: "20px 40px",
                      textAlign: "left",
                    }}
                  >
                    <Link
                      href={`/${article.slug.current}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        gutterBottom
                        component="div"
                        variant="h2_article"
                        color={article.featuredImage ? "#FFF" : "#000"}
                        mb="0"
                        sx={{
                          fontSize: "16px",
                          lineHeight: "1.5",
                        }}
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
                        lineHeight: 1.5,
                        display: "inline-block",
                      }}
                    >
                      {DateTime.fromISO(article.date)
                        .setZone("America/New_York")
                        .setLocale("en-us")
                        .toLocaleString(DateTime.DATE_FULL)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <Link
              href="/search/?badge=newsletter"
              sx={{
                height: 24,
                textDecoration: "none",
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
                  paddingY: "6px",
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
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

Newsletter.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Newsletter;
