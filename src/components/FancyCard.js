// base imports
import React from "react";
import PropTypes from "prop-types";
import moment from "moment-strftime";

// material ui imports
import { makeStyles, useTheme } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles(theme => ({
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
      zIndex: "-1"
    },
    "&:active, &:focus, &:hover": {
      "&::before": {
        left: "-14px",
        top: 10,
        transition: "left 250ms, top 250ms"
      }
    }
  },
  em: {
    fontSize: "0.8em",
    fontStyle: "italic"
  },
  featured: {
    backgroundColor: theme.palette.footer.main
  },
}));

const FancyCard = ({ category, title, content, author, publication, date, lastUpdated, onClick = (() => {}) }) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log('style:', theme);

  return (
    <Card variant="outlined" className={`${classes.box} ${classes.featured}`}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          {category && (
            <Typography component="div" variant="h4">
              {category}
            </Typography>
          )}
          {title && (
            <Typography component="div" variant="h2">
              {title}
            </Typography>
          )}
          {author && (
            <Typography component="div" variant="h3">
              {author}
            </Typography>
          )}
          {publication && (
            <Typography component="div" variant="h4">
              {publication}
            </Typography>
          )}
          {date && (
            <Typography component="div" variant="body1" className={classes.em}>
              {date}
            </Typography>
          )}
          {lastUpdated && (
            <Typography component="div" variant="body1" className={classes.em}>
              Last updated: {moment(lastUpdated).strftime("%B %e, %Y")}
            </Typography>
          )}
          <Typography component="div" variant="body1" className={classes.em}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

FancyCard.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
  publication: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
  lastUpdated: PropTypes.string,
};

export default FancyCard;
