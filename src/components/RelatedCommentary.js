// base imports
import React, { useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// utils
import process from "../utils/processCitations";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Link from "./NextLinkComposed";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() => ({
  citation: {
    borderBottom: "1px solid",
    borderBottomColor: "#DCDCDC",
    marginBottom: 20,
    paddingBottom: 20,
  },
  lastCitation: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  citationTitle: {
    color: "#000 !important",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  citationPublication: {
    marginTop: 25,
    marginBottom: 8,
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic",
  },
  grid: {},
  gridTitle: {
    borderBottom: "1px solid #000",
    marginBottom: 6,
    marginTop: 6,
  },
}));

const RelatedCommentary = (props) => {
  const { commentary, topic, noFilter } = props;
  if (!Array.isArray(commentary) || !commentary.length) return null;
  const classes = useStyles();
  const [sortedCommentary, setSortedCommentary] = useState(null);
  const title = _.get(props, "title", "Related");

  useEffect(() => {
    const sort = commentary.sort((a, b) => {
      if (a.date && b.date) {
        return Date.parse(b.date) - Date.parse(a.date);
      } else {
        return false;
      }
    });
    setSortedCommentary(sort);
  }, []);

  return (
    <section>
      <Grid container className={classes.grid}>
        <Grid
          container
          item
          justifyContent="space-between"
          className={classes.gridTitle}
        >
          <Grid item xs={8}>
            <Typography component="h2" variant="h4">
              {title}
            </Typography>
          </Grid>
          {!noFilter ? (
            <Grid item xs={4}>
              <Typography component="div" variant="h4">
                <Link
                  href={{
                    pathname: "/search",
                    query: { filter: topic },
                  }}
                  className={classes.link}
                >
                  View all
                </Link>
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Grid container item flexDirection="column">
          {sortedCommentary && sortedCommentary.length
            ? sortedCommentary.map((comment, idx) => (
                <Grid
                  item
                  key={comment.__metadata ? comment.__metadata.id : comment._id}
                  className={
                    idx === 3 ? classes.lastCitation : classes.citation
                  }
                >
                  <Typography component="div" variant="body1">
                    <Link
                      className={classes.citationTitle}
                      href={
                        comment._type == "citation"
                          ? comment.url || `/${comment.layout}/${comment.slug}`
                          : `https://techpolicy.press/${comment.slug.current}`
                      }
                    >
                      {comment.title}
                    </Link>
                  </Typography>
                  <Typography
                    component="div"
                    variant="h5"
                    className={classes.citationPublication}
                  >
                    {comment._type == "citation"
                      ? process(comment)
                      : "Tech Policy Press"}
                  </Typography>
                  <Typography className={classes.em}>
                    {comment.date
                      ? DateTime.fromISO(comment.date).toLocaleString(
                          DateTime.DATE_FULL
                        )
                      : ""}
                  </Typography>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </section>
  );
};

RelatedCommentary.propTypes = {
  commentary: PropTypes.array,
  topic: PropTypes.string,
  noFilter: PropTypes.bool,
};

export default RelatedCommentary;
