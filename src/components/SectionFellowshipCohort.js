import React from "react";
import _ from "lodash";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { Box, Container, Typography, Grid, Link } from "@mui/material";

export default function SectionFellowshipCohort(props) {
  let section = _.get(props, "section", null);

  return (
    <section id={_.get(section, "section_id", null)}>
      <Container
        sx={{
          maxWidth: "700px!important",
          margin: "0 auto",
          marginTop: "60px",
          px: "0!important",
        }}
      >
        <Box
          sx={{
            my: "56px",
            pt: "24px",
            pb: "10px",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ borderTop: "1px solid #dcdcdc", mx: 0, width: "100%" }}
          >
            {_.map(_.get(section, "links", null), (link, link_idx) => (
              <Grid
                item
                xs={12}
                key={link_idx}
                sx={{ borderBottom: "1px solid #dcdcdc", py: "12px!important" }}
              >
                <Link href={link.link} sx={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Lexend",
                        fontSize: "20px",
                        fontWeight: 500,
                        lineHeight: 1.75,
                      }}
                    >
                      {link.title}
                    </Typography>
                    <PlayArrowIcon height={12} />
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
