import React from "react";
import _ from "lodash";

import { Box, Container, Typography, Grid } from "@mui/material";

import { CustomPortableText } from "./PortableText";

// utils
import urlFor from "../utils/imageBuilder";

export default function SectionFellowshipQuote(props) {
  let section = _.get(props, "section", null);

  return (
    <section id={_.get(section, "section_id", null)}>
      <Container
        sx={{
          maxWidth: "700px!important",
          margin: "0 auto",
          marginTop: "-30px",
          px: "0!important",
        }}
      >
        <Box
          sx={{
            my: "56px",
            pt: "24px",
            pb: "24px",
            borderTop: "1px solid #dcdcdc",
            borderBottom: "1px solid #dcdcdc",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box>
                <img
                  src={urlFor(_.get(section, "avatar", null)).width(180).url()}
                  alt={_.get(section, "avatar", null)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography
                  component="div"
                  className="html-to-react-article"
                  sx={{
                    marginTop: "-16px",
                    "&.html-to-react-article p:last-of-type": {
                      paddingBottom: "0px",
                      marginBottom: "0px",
                    },
                  }}
                >
                  <CustomPortableText value={_.get(section, "quote", null)} />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
