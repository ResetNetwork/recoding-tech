// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  em: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: "0.9em",
  },
  title: {
    borderRight: "2px solid #000",
    paddingRight: 20,
  },
}));

const SectionTopics = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { section } = props;
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    if (
      Array.isArray(section.featuredTopics) &&
      section.featuredTopics.length
    ) {
      setTopics(section.featuredTopics.filter((topic) => topic.name));
    }
  }, []);

  useEffect(() => {}, [topics]);

  return (
    <section>
      <Container>
        <Box my={4}>
          <Grid
            container
            item
            justifyContent="space-between"
            className={classes.gridTitle}
            marginBottom
            sx={{ borderBottom: 1 }}
          >
            <Grid container spacing={2} item xs={12} md={11}>
              <Grid item>
                <Typography
                  component="h2"
                  variant="h4"
                  className={classes.title}
                >
                  Featured Topics
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  component="div"
                  variant="body1"
                  className={classes.em}
                >
                  New issues, policies, governments, & companies we’re covering
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {topics
              ? topics.map((topic, i) => (
                  <Chip
                    key={i}
                    label={topic.displayTitle || topic.name}
                    sx={{ marginBottom: "6px !important" }}
                    component="a"
                    href={`/${topic.type}/${
                      typeof topic.slug == "string"
                        ? topic.slug
                        : typeof topic.slug == "object"
                        ? topic.slug.current
                        : topic.name
                    }`}
                    className={classes.chip}
                    style={{
                      backgroundColor:
                        topic.type && theme.palette[topic.type]
                          ? theme.palette[topic.type].main
                          : theme.palette.secondary.main,
                    }}
                    clickable
                  />
                ))
              : null}
          </Stack>
        </Box>
      </Container>
    </section>
  );
};

SectionTopics.propTypes = {
  section: PropTypes.object,
};

export default SectionTopics;
