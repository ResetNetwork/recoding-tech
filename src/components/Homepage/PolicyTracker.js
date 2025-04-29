// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { titleCase } from "title-case";
import { DateTime } from "luxon";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// utils
import client from "../../utils/sanityClient";

// images
import TrackerBackground from "../../assets/tracker-bg.jpg";

const policyActionsQuery = `*[_type == "policy_action" && !(_id in path("drafts.**")) ]{country, dateInitiated,
                            lastUpdate, _updatedAt, _createdAt, _id,
                            slug, status, title, summary,
                            relatedTopics[]->{_id, _key, name, slug, type}, type}|order(lastUpdate desc)[0...5]`;

const headers = [
  { id: "title", label: "Name" },
  { id: "type", label: "Type" },
  { id: "country", label: "Gov't" },
];

const truncate = (title) =>
  title.length > 62 ? `${title.substring(0, 62)}...` : title;

const useStyles = makeStyles(() => ({
  button: {
    fontSize: "0.8em",
    textTransform: "uppercase",
    width: 180,
  },
  tableCellTitle: {
    position: "relative",
    textTransform: "none",
  },
  tableLink: {
    color: "#000",
    display: "block",
    position: "relative",
    textDecoration: "none",
    // maxWidth: "85%",
  },
}));

const PolicyTracker = ({ trackerText }) => {
  const classes = useStyles();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    client.fetch(policyActionsQuery).then((actions) => {
      if (Array.isArray(actions) && actions.length) {
        setActions(actions);
      }
    });
  }, []);

  return Array.isArray(actions) && actions.length ? (
    <section>
      <Grid container alignItems={"stretch"}>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <Box
            px={4}
            py={3}
            sx={{
              backgroundImage: `url(${TrackerBackground.src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 17%",
              backgroundSize: "112%",
              "&:before": {
                background: "#427569",
                opacity: 0.8,
                content: "''",
                height: "100%",
                left: 0,
                mixBlendMode: "multiply",
                position: "absolute",
                top: 0,
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                color: "#F3F0E6",
                position: "relative",
              }}
            >
              <Typography
                component="h2"
                variant="h2"
                sx={{
                  marginBottom: 1,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Policy Tracker
              </Typography>
              <Typography
                component="div"
                variant="body2"
                sx={{
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                {trackerText}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableContainer
            sx={{
              backgroundColor: "rgba(243,240,230, 0.5) ",
            }}
          >
            <Table aria-label="Policy Tracker Table">
              <TableHead
                sx={{
                  "&:active, &:focus, &:hover": {
                    backgroundColor: "#f9f7f2 !important",
                  },
                }}
              >
                <TableRow
                  sx={{
                    "&:active, &:focus, &:hover": {
                      backgroundColor: "#f9f7f2 !important",
                    },
                  }}
                >
                  {headers.map((column) => (
                    <TableCell
                      key={`${column.id}-cell`}
                      sx={{
                        paddingLeft: column.id == "title" ? "16px" : "0",
                      }}
                    >
                      <Typography component="div" variant={"tableHeaderHome"}>
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {actions.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row._id}-row`}
                    >
                      {headers.map((column) => {
                        let value = row[column.id];
                        // if (!value) {
                        //   if (row.country) {
                        //     value = row.country; // #FIXME
                        //   } else {
                        //     value = row.type;
                        //   }
                        // }
                        return (
                          <TableCell
                            key={column.id}
                            className={
                              column.id == "title"
                                ? classes.tableCellTitle
                                : null
                            }
                            sx={{
                              fontSize: "0.85em",
                              paddingLeft: column.id == "title" ? "16px" : "0",
                            }}
                          >
                            {column.id == "dateInitiated" ||
                            column.id == "lastUpdate" ? (
                              <Typography
                                component="div"
                                variant={"trackerRowHome"}
                              >
                                {value
                                  ? DateTime.fromISO(value).toLocaleString(
                                      DateTime.DATE_MED
                                    )
                                  : !row.lastUpdate && row.dateInitiated
                                  ? DateTime.fromISO(
                                      row.dateInitiated
                                    ).toLocaleString(DateTime.DATE_MED)
                                  : ""}{" "}
                                {/* if lastUpdate is blank, automatically just put in the dateInitiated */}
                              </Typography>
                            ) : column.id == "title" ? (
                              <Typography
                                component="div"
                                variant={"trackerTitleHome"}
                              >
                                <Link
                                  className={classes.tableLink}
                                  href={`/tracker/${
                                    typeof row.slug === "object"
                                      ? row.slug.current
                                      : row.slug
                                  }`}
                                >
                                  {titleCase(truncate(value))}
                                </Link>
                              </Typography>
                            ) : column.id == "type" ? (
                              <Typography
                                component="div"
                                variant={"trackerRowHome"}
                              >
                                {row.type}
                              </Typography>
                            ) : (
                              <Typography
                                component="div"
                                variant={"trackerRowHome"}
                              >
                                {value}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}

                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                    <Link
                      href="/tracker"
                      sx={{
                        textTransform: "uppercase",
                        textDecoration: "none",
                        fontSize: "16px",
                        fontWeight: "400",
                        color: "#589383",
                      }}
                    >
                      SEE ALL
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </section>
  ) : null;
};

PolicyTracker.propTypes = {
  trackerText: PropTypes.string,
};

export default PolicyTracker;
