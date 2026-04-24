// base imports
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Material UI imports
import { Box, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Layout } from "../components/index";

// components
import { CustomPortableText } from "../components/PortableText";

// utils
import urlFor from "../utils/imageBuilder";

const Page = (props) => {
  const { page } = props;

  const heroUrl = page.img_path && urlFor(page.img_path).width(1920).url();

  return (
    <Layout {...props}>
      <section id={page._id} className="block block-hero">
        <Box
          style={{
            backgroundColor: "#343434FF",
            ...(heroUrl
              ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0.7) 46%,rgba(0, 0, 0, 1) 100%), url(${heroUrl})`,
                  backgroundSize: "cover, cover",
                  backgroundPosition: "center, center",
                  backgroundRepeat: "no-repeat",
                }
              : {}),
          }}
        >
          <Grid
            container
            style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "30px" }}
          >
            <Grid item xs={12} sm={8} sx={{ alignContent: "center" }}>
              <Box sx={{ width: "530px" }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#fff",
                    fontSize: "36px",
                    fontWeight: 700,
                    lineHeight: 1.5,
                    textAlign: "start",
                    mb: 0,
                  }}
                >
                  {page.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "20px",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.75,
                  }}
                >
                  {page.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <iframe
                src="https://donorbox.org/embed/tech-policy-press?default_interval=o&amp;hide_donation_meter=true"
                style={{
                  maxWidth: "500px",
                  minWidth: "250px",
                  maxHeight: "none!important",
                }}
                width="100%"
                height="770px"
                name="donorbox"
                allow="payment"
                seamless=""
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </Grid>
          </Grid>
        </Box>

        <Container
          sx={{
            maxWidth: "750px!important",
            margin: "0 auto",
            marginTop: "80px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: "left",
              m: 0,
            }}
          >
            HOW WILL YOUR DONATIONS BE USED?
          </Typography>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography
            component="div"
            className="html-to-react html-to-react-page"
          >
            <CustomPortableText value={_.get(props, "page.body", null)} />
          </Typography>
        </Container>

        <Container
          sx={{
            maxWidth: "1130px!important",
            margin: "0 auto",
            marginTop: "60px",
          }}
        >
          <Box sx={{ background: "#37675c", padding: "40px" }}>
            <Box sx={{ padding: "40px 20px", border: "1px solid #fff" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontFamily: "Libre Baskerville",
                  fontSize: "27px",
                  fontWeight: 700,
                  lineHeight: 1.6,
                  textAlign: "center",
                  textTransform: "none",
                  m: 0,
                }}
              >
                Interested in contributing in another way?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.5,
                  textAlign: "center",
                  margin: "4px 0 0 0",
                }}
              >
                We’d love to hear from you. Contact us at
                contributions@techpolicy.press.
              </Typography>
            </Box>
          </Box>
        </Container>

        <Container
          sx={{
            maxWidth: "750px!important",
            margin: "80px auto",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: "left",
              m: 0,
            }}
          >
            FAQ
          </Typography>

          <Divider sx={{ margin: "20px 0" }} />

          <Grid container columnSpacing={"20px"} rowSpacing={"40px"}>
            {page.faq &&
              page.faq.map((faq, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: 1.75,
                      textAlign: "left",
                      m: 0,
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Lexend",
                      fontSize: "16px",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      textAlign: "left",
                      m: 0,
                      mt: "4px",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Grid>
              ))}
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
