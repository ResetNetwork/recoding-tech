import React, { useEffect, useState } from "react";
import _ from "lodash";

import PropTypes from "prop-types";

// utils
import { markdownify } from "../utils";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedGuide from "../components/RelatedGuide";
import RelatedReadings from "../components/RelatedReadings";
import RelatedTopics from "../components/RelatedTopics";
import RelatedActions from "../components/RelatedActions";
import SectionHero from "../components/SectionHero";

const useStyles = makeStyles(() => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative"
  },
  em: {
    fontStyle: "italic"
  }
}));

const Topic = props => {
  const classes = useStyles();
  const { page } = props;

  const [topics, setTopics] = useState(null);
  const [issues, setIssues] = useState(null);
  const [policies, setPolicies] = useState(null);
  const [readings, setReadings] = useState(null);
  const [headlines, setHeadlines] = useState(null);

  useEffect(() => {
    if (Array.isArray(page.relatedTopics) && page.relatedTopics.length) {
      if (page.type === "issue" || page.type === "policy") {
        const [i, p] = page.relatedTopics.reduce(
          ([i, p], topic) => {
            if (topic.type === "issue") {
              i.push(topic);
            } else if (topic.type === "policy") {
              p.push(topic);
            }
            return [i, p];
          },
          [[], []]
        );
        setIssues(i);
        setPolicies(p);
      } else {
        setTopics(page.relatedTopics.filter(topic => topic.type));
      }
    }

    if (
      Array.isArray(page.relatedCommentary) &&
      page.relatedCommentary.length
    ) {
      const [r, h] = page.relatedCommentary.reduce(
        ([r, h], comment) => {
          if (comment.__metadata.modelName === "citation") {
            h.push(comment);
          } else if (comment.__metadata.modelName === "article") {
            r.push(comment);
          }
          return [r, h];
        },
        [[], []]
      );
      setReadings(r);
      setHeadlines(h);
    }
  }, []);

  return (
    <Layout {...props}>
      <SectionHero {...props} />
      <Box my={8}>
        <Container>
          <RelatedActions page={page} actions={page.relatedPolicyActions} />
          <Grid container spacing={8}>
            <Grid container spacing={12} direction="column" item sm={12} md={8}>
              {page.fastFacts && (
                <Grid item>
                  <Card
                    variant="outlined"
                    className={`${classes.box} ${classes.featured}`}
                  >
                    <CardContent>
                      <Typography component="div" variant="h4">
                        Fast Facts
                      </Typography>
                      <Typography
                        component="div"
                        variant="body1"
                        className={classes.em}
                      >
                        {markdownify(page.fastFacts)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <Grid item>
                <Typography component="div" variant="body1">
                  {markdownify(_.get(props, "page.topicDescription", null))}
                </Typography>
                <RelatedReadings page={page} readings={page.relatedReadings} />
              </Grid>
            </Grid>
            <Grid container spacing={4} direction="column" item sm={12} md={4}>
              <Grid item>
                <RelatedGuide {...props} />
              </Grid>
              <Grid item>
                <RelatedCommentary commentary={headlines} />
              </Grid>
              <Grid item>
                <RelatedTopics title="Related Issues" topics={issues} />
                <RelatedTopics title="Related Policies" topics={policies} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Topic.propTypes = {
  page: PropTypes.object
};

export default Topic;