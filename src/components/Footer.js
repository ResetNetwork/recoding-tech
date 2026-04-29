// base imports
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import { htmlToReact, Link } from "../utils";
import NextLink from "next/link";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// MUI icons
import EmailIcon from "@mui/icons-material/Email";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// components
import Logo from "./LogoFooter";

function Footer(props) {
  let links;
  if (
    props.data &&
    props.data.config &&
    props.data.config.footer &&
    props.data.config.footer.links
  ) {
    links = props.data.config.footer.links;
  }

  return (
    <footer style={{ background: "#1f5997FF", color: "#FFF" }}>
      <Box pt={8} pb={4}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <Link href="/">
                <Logo width={147} />
                <Typography component="span" sx={{ display: "none" }}>
                  Home
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              {_.get(props, "data.config.footer.content", null) && (
                <Typography
                  component="div"
                  variant="body2"
                  sx={{ mb: "30px", maxWidth: 355, lineHeight: "1.5" }}
                >
                  {htmlToReact(
                    _.get(props, "data.config.footer.content", null)
                  )}
                </Typography>
              )}
              <Link href="https://www.linkedin.com/company/tech-policy-press">
                <LinkedInIcon
                  sx={{
                    color: "#fff",
                    marginRight: "20px",
                    width: 32,
                    height: 32,
                  }}
                />
                <Typography component="span" sx={{ display: "none" }}>
                  LinkedIn
                </Typography>
              </Link>
              <Link
                href="https://bsky.app/profile/techpolicypress.bsky.social"
                style={{ marginRight: "20px" }}
              >
                <img
                  src="/images/icon_bluesky.png"
                  alt="BlueSky"
                  width={27}
                  height={27}
                  style={{ paddingBottom: "2px" }}
                />
                <Typography component="span" sx={{ display: "none" }}>
                  BlueSky
                </Typography>
              </Link>
              <Link href="https://techpolicy.press/rss/feed.xml">
                <RssFeedIcon
                  sx={{
                    color: "#fff",
                    marginRight: "20px",
                    width: 32,
                    height: 32,
                  }}
                />
                <Typography component="span" sx={{ display: "none" }}>
                  TPP RSS feed
                </Typography>
              </Link>
              <Link href="mailto:newsletter@techpolicy.press">
                <EmailIcon
                  sx={{
                    fill: "#fff",
                    width: 32,
                    height: 32,
                  }}
                />
                <Typography component="span" sx={{ display: "none" }}>
                  Email TPP
                </Typography>
              </Link>

              {_.get(props, "data.config.footer.copyright", null) && (
                <Typography
                  component="div"
                  variant="h5"
                  sx={{
                    fontSize: 14,
                    marginTop: 4,
                    textAlign: "left",
                    textTransform: "none",
                  }}
                >
                  {htmlToReact(
                    _.get(props, "data.config.footer.copyright", null)
                  )}
                </Typography>
              )}
            </Grid>
            <Grid item xs={0} sm={2}></Grid>
            <Grid
              container
              item
              direction={"column"}
              flexWrap={"wrap"}
              sx={{ height: 200 }}
              xs={12}
              sm={4}
            >
              {links.length
                ? links.map((link, idx) => (
                    <Grid
                      item
                      key={idx}
                      sx={{
                        mb: "30px",
                        paddingTop: link.style === "button" ? "7px" : "0",
                      }}
                    >
                      <NextLink
                        style={{ textDecoration: "none" }}
                        href={link.url}
                      >
                        <Typography
                          component="span"
                          variant="h5"
                          sx={{
                            color: "#FFF",
                            fontSize: 14,
                            textDecoration: "none",
                            textTransform: "none",
                            "&:hover, &:focus": {
                              textDecoration: "underline",
                            },
                            ...(link.style === "button"
                              ? {
                                  lineHeight: "1.5",
                                  backgroundColor: "#fff",
                                  borderRadius: "12px",
                                  color: " #1f5997FF",
                                  padding: "8px 16px",
                                  "&:hover, &:focus": {
                                    textDecoration: "none",
                                  },
                                }
                              : {}),
                          }}
                        >
                          {link.label}
                        </Typography>
                      </NextLink>
                    </Grid>
                  ))
                : null}
              {/* {_.map(
                _.get(props, "data.config.footer.links", null),
                (action, action_idx) => (
                  <Grid item key={action_idx} sx={{ my: 1 }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={withPrefix(_.get(action, "url", null))}
                      {...(_.get(action, "new_window", null)
                        ? { target: "_blank" }
                        : null)}
                      {...(_.get(action, "new_window", null) ||
                      _.get(action, "no_follow", null)
                        ? {
                            rel:
                              (_.get(action, "new_window", null)
                                ? "noopener "
                                : "") +
                              (_.get(action, "no_follow", null)
                                ? "nofollow"
                                : ""),
                          }
                        : null)}
                    >
                      <Typography
                        component="span"
                        variant="h5"
                        sx={{
                          color: "#FFF",
                          fontSize: 14,
                          textDecoration: "none",
                          textTransform: "none",
                          "&:hover, &:focus": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {_.get(action, "label", null)}
                      </Typography>
                    </Link>
                  </Grid>
                )
              )} */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}

Footer.propTypes = {
  path: PropTypes.string,
  data: PropTypes.object,
};

export default Footer;
