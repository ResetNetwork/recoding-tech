import React from "react";
import _ from "lodash";

import { Box, Container, Typography, Grid } from "@mui/material";

export default function SectionFellowshipStats(props) {
  let section = _.get(props, "section", null);

  return (
    <section id={_.get(section, "section_id", null)}>
      <Container>
        <Box
          sx={{
            marginTop: "60px",
            marginBottom: "32px",
            py: "20px",
            borderTop: "1px solid #dcdcdc",
            borderBottom: "1px solid #dcdcdc",
          }}
        >
          <Grid container spacing={2}>
            {_.map(_.get(section, "stats", null), (stat, stat_idx) => (
              <Grid
                item
                xs={12}
                md={4}
                key={stat_idx}
                sx={{ textAlign: "center" }}
              >
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      m: 0,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "48px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginTop: "8px",
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Container
            sx={{
              maxWidth: "700px!important",
              margin: "0 auto",
              p: "0!important",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#a0a0a0FF",
                fontFamily: "Lexend",
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.5,
                marginTop: "20px",
              }}
            >
              {section.note}
            </Typography>
          </Container>
        </Box>
      </Container>
    </section>
  );
}
