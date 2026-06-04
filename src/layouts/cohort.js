// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Material UI imports
import { Box, Grid, Container, Typography, Link } from "@mui/material";

import components, { Layout } from "../components/index";
import { CustomPortableText } from "../components/PortableText";

// utils
import urlFor from "../utils/imageBuilder";

const Page = (props) => {
  const { page } = props;

  const heroUrl = page.hero_image && urlFor(page.hero_image).width(1920).url();

  return (
    <Layout {...props}>
      <section id={page._id} className="block block-hero">
        <Box
          style={{
            maxWidth: "1367px",
            margin: "0 auto",
            backgroundColor: "#343434FF",
            ...(heroUrl
              ? {
                  backgroundImage: `url(${heroUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : {}),
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              height: "705px",
              alignContent: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                m: 0,
                fontFamily: "Libre Baskerville",
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: 1.5,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                textAlign: "center",
              }}
            >
              {page.title}
            </Typography>
          </Container>
        </Box>

        <Container maxWidth={"md"} sx={{ marginTop: "60px" }}>
          {_.map(_.get(props, "page.body", null), (section, section_idx) => {
            let component = _.upperFirst(
              _.camelCase(_.get(section, "type", null))
            );
            let Component = components[component];
            if (!Component) return null;
            return (
              <Component
                key={section_idx}
                {...props}
                section={section}
                site={props}
              />
            );
          })}
        </Container>
        <Container maxWidth={"md"} sx={{ mb: "36px", mt: "-40px" }}>
          <Grid container spacing={2}>
            {_.map(_.get(props, "page.authors", null), (author, author_idx) => {
              return (
                <Grid
                  item
                  container
                  xs={12}
                  key={author_idx}
                  sx={{
                    borderTop: "1px solid #dcdcdc",
                    paddingTop: "24px!important",
                    paddingBottom: "36px!important",
                  }}
                >
                  <Grid item xs={3} md={2}>
                    {author.photo && (
                      <img
                        src={urlFor(author.photo).width(100).height(100).url()}
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%" }}
                        alt={author.name}
                      />
                    )}
                  </Grid>
                  <Grid item xs={9} md={10}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textTransform: "none",
                        marginBottom: "8px!important",
                      }}
                    >
                      {author.name}
                    </Typography>
                    <Typography
                      component="div"
                      className="html-to-react html-to-react-page"
                      sx={{
                        "& p": {
                          fontSize: "16px!important",
                          fontWeight: 300,
                          lineHeight: 1.75,
                          margin: "0px!important",
                        },
                      }}
                    >
                      <CustomPortableText value={author.bio} />
                    </Typography>

                    <Box sx={{ marginTop: "36px", display: "inline-block" }}>
                      <Link
                        href={`/author/${author.slug.current}`}
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
                            marginBottom: "0px",
                            "&:hover": {
                              backgroundColor: "#EEE",
                            },
                          }}
                        >
                          Read articles
                        </Typography>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </section>
    </Layout>
  );
};

Page.propTypes = {
  page: PropTypes.object,
};

export default Page;
