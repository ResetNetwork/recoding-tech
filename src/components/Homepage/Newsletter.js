import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

// Material UI imports
import { Box, Link, Typography } from "@mui/material";

//utils
import urlFor from "../../utils/imageBuilder";
import client from "../../utils/sanityClient";

const query = `*[!(_id in path("drafts.**")) && _type == "post" && badge == "newsletter"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...1]`;

const Newsletter = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(query).then((articles) => {
      if (Array.isArray(articles) && articles.length) {
        setPosts(articles);
      }
    });
  }, []);

  const heroUrl =
    posts.length > 0 &&
    posts[0].featuredImage &&
    urlFor(posts[0].featuredImage).width(450).url();

  return (
    <div
      id="mlb2-5983540"
      className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-5983540"
      style={{ marginTop: "60px!important" }}
    >
      <div className="ml-form-align-center">
        <Box
          className="ml-form-embedWrapper embedForm"
          sx={{
            backgroundColor: "#37675c!important",
            padding: { xs: "40px 20px!important", md: "60px 80px!important" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "center" },
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 0 },
            }}
          >
            <div style={{ flex: "1 1 0%", minWidth: 0 }}>
              <div
                className="ml-form-embedBody ml-form-embedBodyDefault row-form"
                style={{
                  justifyContent: "center",
                  columnGap: "60px",
                  flexDirection: "column",
                  padding: "0!important",
                }}
              >
                <div className="ml-form-embedContent">
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#FFF",
                      fontSize: "27px",
                      m: 0,
                      fontFamily: "Libre Baskerville",
                    }}
                  >
                    Our content delivered to your inbox
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#d5d5d5!important",
                      fontSize: "14px",
                      fontWeight: 300,
                      mb: "20px!important",
                      mt: "10px!important",
                    }}
                  >
                    Join our newsletter on issues and ideas at the intersection
                    of tech and democracy.
                  </Typography>
                </div>
                <form
                  className="ml-block-form"
                  action="https://static.mailerlite.com/webforms/submit/v2f5x1"
                  data-code="v2f5x1"
                  method="post"
                  target="_blank"
                  style={{
                    marginLeft: 0,
                    display: "flex",
                    columnGap: "10px",
                    justifySelf: "center",
                    width: "100%",
                  }}
                >
                  <div
                    className="ml-form-formContent"
                    style={{ width: "100%", maxWidth: "none" }}
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
                  <div
                    className="ml-form-embedSubmit"
                    style={{ maxWidth: "126px!important" }}
                  >
                    <button
                      type="submit"
                      className="primary"
                      style={{
                        fontFamily: "Lexend, sans-serif!important",
                        borderRadius: "12px!important",
                        fontSize: "16px!important",
                        fontWeight: "400!important",
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
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                flex: "0 0 auto",
                width: "fit-content",
                alignSelf: "center",
              }}
            >
              {posts?.length > 0 && (
                <>
                  <Link
                    href={`/${posts[0].slug.current}`}
                    style={{ display: "block" }}
                  >
                    <img
                      src={heroUrl}
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
                      href={`/${posts[0].slug.current}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        gutterBottom
                        component="div"
                        variant="h2_article"
                        color={posts[0].featuredImage ? "#FFF" : "#000"}
                        mb="0"
                        sx={{
                          fontSize: "16px",
                          lineHeight: "1.5",
                        }}
                      >
                        {posts[0].title}
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
                      {DateTime.fromISO(posts[0].date)
                        .setZone("America/New_York")
                        .setLocale("en-us")
                        .toLocaleString(DateTime.DATE_FULL)}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Newsletter;
