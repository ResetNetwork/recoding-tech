// base imports
import React, { useEffect, useState } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// utils
import client from "../utils/sanityClient";

// material ui imports
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme) => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
    "&::before": {
      backgroundColor: "#fff",
      border: "1px solid #000",
      content: "''",
      height: "100%",
      left: "-8px",
      position: "absolute",
      top: 5,
      transition: "left 250ms, top 250ms",
      width: "100%",
      zIndex: "-1",
    },
    "&:active, &:focus, &:hover": {
      "&::before": {
        left: "-14px",
        top: 10,
        transition: "left 250ms, top 250ms",
      },
    },
  },
  boxNoHover: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
    "&::before": {
      backgroundColor: "#fff",
      border: "1px solid #000",
      content: "''",
      height: "100%",
      left: "-8px",
      position: "absolute",
      top: 5,
      transition: "left 250ms, top 250ms",
      width: "100%",
      zIndex: "-1",
    },
  },
  content: {
    fontStyle: "italic",
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic",
  },
  featured: {
    backgroundColor: theme.palette.footer.main,
  },
  sidebar: {
    backgroundColor: theme.palette.secondary.main,
  },
  noClick: {
    cursor: "default",
  },
}));

const FancyCard = ({
  author,
  category,
  citation,
  content,
  date,
  publication,
  notClickable,
  lastUpdated,
  isSidebar,
  title,
  onClick = () => {},
}) => {
  const classes = useStyles();
  const [reading, setReading] = useState(null);

  useEffect(() => {
    if (citation) {
      client.fetch(`*[_id == "${citation}"][0]`).then((ref) => {
        setReading(ref);
      });
    }
  }, []);

  useEffect(() => {
    console.log(reading);
  }, [reading]);

  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: reading ? 4 : 0 }}
      className={`${isSidebar ? classes.sidebar : classes.featured} ${
        notClickable ? classes.boxNoHover : classes.box
      }`}
    >
      <CardActionArea
        onClick={
          reading ? () => Router.push({ pathname: reading.url }) : onClick
        }
        className={notClickable ? classes.noClick : ""}
      >
        <CardContent>
          {category && (
            <Typography component="div" variant="h4">
              {category}
            </Typography>
          )}
          {(reading || title) && (
            <Typography component="div" variant="h2">
              {reading ? reading.title : title}
            </Typography>
          )}
          {(reading || author) && (
            <Typography component="div" variant="h3">
              {reading && reading.creators.length
                ? reading.creators.length > 1
                  ? `${reading.creators[0].firstName} ${reading.creators[0].lastName} et al`
                  : `${reading.creators[0].firstName} ${reading.creators[0].lastName}`
                : author}
            </Typography>
          )}
          {(reading || publication) && (
            <Typography component="div" variant="h4">
              {reading
                ? reading.institution
                  ? reading.institution
                  : reading.websiteTitle
                  ? reading.websiteTitle
                  : reading.place
                  ? reading.place
                  : reading.publisher
                : publication}
            </Typography>
          )}
          {(reading || date) && (
            <Typography component="div" variant="body1" className={classes.em}>
              {reading ? reading.date : date}
            </Typography>
          )}
          {lastUpdated && (
            <Typography component="div" variant="body1" className={classes.em}>
              Last updated: {moment(lastUpdated).strftime("%B %e, %Y")}
            </Typography>
          )}
          <Typography
            component="div"
            variant="body1"
            className={classes.content}
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

FancyCard.propTypes = {
  author: PropTypes.string,
  category: PropTypes.string,
  citation: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  isSidebar: PropTypes.bool,
  notClickable: PropTypes.bool,
  publication: PropTypes.string,
  title: PropTypes.string,
  lastUpdated: PropTypes.string,
  onClick: PropTypes.func,
};

export default FancyCard;
