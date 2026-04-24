// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Material UI imports
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import components, { Layout } from "../components/index";

// utils
import urlFor from "../utils/imageBuilder";

const Page = (props) => {
  const { page } = props;

  const heroUrl = page.heroImage && urlFor(page.heroImage).width(1920).url();

  return (
    <Layout {...props}>
      <section id={page._id} className="block block-hero">
        <Container
          sx={{
            maxWidth: "1367px!important",
            background: "#000",
            p: "0!important",
          }}
        >
          {heroUrl && (
            <Box sx={{ position: "relative", lineHeight: 0 }}>
              <Box
                component="img"
                src={heroUrl}
                alt={page.title}
                sx={{ display: "block", width: "100%", height: "auto" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "10%",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
                }}
              />
            </Box>
          )}
          <Container sx={{ maxWidth: "710px!important", margin: "0 auto" }}>
            <Box sx={{ textAlign: "center", py: "60px" }}>
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  m: 0,
                  fontFamily: "Libre Baskerville",
                  fontSize: "36px",
                  fontWeight: 700,
                  lineHeight: 1.5,
                }}
              >
                {page.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  marginTop: "8px",
                  fontFamily: "Lexend",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                {page.heroContent}
              </Typography>
            </Box>
          </Container>
        </Container>

        <Container maxWidth={"lg"}>
          {_.map(
            _.get(props, "page.sections", null),
            (section, section_idx) => {
              let component = _.upperFirst(
                _.camelCase(_.get(section, "type", null))
              );
              let Component = components[component];
              if (!Component) return null;
              return (
                <Box
                  key={section_idx}
                  sx={{
                    maxWidth:
                      section.type === "section_fellowship_stats"
                        ? "100%!important"
                        : "700px!important",
                    margin: "0 auto",
                  }}
                >
                  <Component
                    key={section_idx}
                    {...props}
                    section={section}
                    site={props}
                  />
                </Box>
              );
            }
          )}
        </Container>
      </section>
    </Layout>
  );
};

Page.propTypes = {
  page: PropTypes.object,
};

export default Page;
