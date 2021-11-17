// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// utils
import client from "../utils/sanityClient";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// material ui icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const policyActionsQuery = `*[_type == "policy_action"]{category, country, dateInitiated, img_alt, img_path, lastUpdate, slug, status, title, topics, type}`;

const topicsQuery = '*[_type == "topic"]{_id, name, slug, type}';

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: "0.8em",
    textTransform: "uppercase",
    width: 180
  },
  icon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    transition: "right 250ms"
  },
  table: {},
  tableCellTitle: {
    position: "relative",
    textTransform: "none",
    "&:after": {
      backgroundColor: theme.palette.footer.main,
      content: "''",
      display: "block",
      left: 0,
      minHeight: 40,
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      zIndex: "-1"
    },
    "&:hover": {
      "& a": {
        textDecoration: "underline"
      },
      "& svg": {
        right: 10,
        transition: "right 250ms"
      }
    }
  },
  tableLink: {
    color: "#000",
    display: "block",
    position: "relative",
    textDecoration: "none",
    maxWidth: "85%"
  }
}));

function SectionTracker(props) {
  const classes = useStyles();
  const { query } = useRouter();
  const { section } = props;
  const [actions, setActions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);

  const headers = [
    { id: "title", label: "Name" },
    { id: "type", label: "Type" },
    { id: "country.displayTitle", label: "Country" },
    { id: "dateInitiated", label: "Date Initiated" },
    { id: "status", label: "Status" },
    { id: "lastUpdate", label: "Last Updated" }
  ];

  // filters
  const [issues, setIssues] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    client.fetch(policyActionsQuery).then(allPolicies => {
      let allPolicyActions = [];
      allPolicies.forEach(policy => {
        allPolicyActions = [...allPolicyActions, policy];
      });
      setActions(allPolicyActions);
    });

    client.fetch(topicsQuery).then(topics => {
      let allTopics = [];
      topics.forEach(topic => {
        allTopics = [...allTopics, topic];
      });
      setTopics(allTopics);
    });
  }, []);

  useEffect(() => {
    const newTopics = {
      issue: new Map(),
      policy: new Map(),
      company: new Map(),
      country: new Map()
    };
    if (Array.isArray(topics) && topics.length) {
      topics.map(topic => {
        if (topic.type && topic.slug) {
          newTopics[topic.type] && newTopics[topic.type].set(topic.slug, topic);
        }
      });
    }

    let newFilters = [];
    ["issue", "policy", "company", "country"].forEach(type => {
      if (Array.isArray(query[type]) && query[type].length) {
        query[type].forEach(t => {
          const exists = newTopics[type].get(t);
          if (exists) {
            newFilters.push(exists);
          }
        });
      } else {
        const exists = newTopics[type].get(query[type]);
        if (exists) {
          newFilters.push(exists);
        }
      }
    });
    setIssues(Array.from(newTopics.issue.values()));
    setPolicies(Array.from(newTopics.policy.values()));
    setCompanies(Array.from(newTopics.company.values()));
    setCountries(Array.from(newTopics.country.values()));
    newFilters.sort();
    setFilters(newFilters);
  }, [topics, query]);

  useEffect(() => {
    if (actions.length) {
      if (filters) {
        const allPolicies = actions.filter(action => {
          let matches = 0;
          if (
            Array.isArray(action.relatedTopics) &&
            action.relatedTopics.length
          ) {
            action.relatedTopics.forEach(topic => {
              if (filters.findIndex(f => f.slug === topic.slug) >= 0)
                matches += 1;
            });
          }
          return matches >= filters.length;
        });

        setActions(allPolicies);
      }
    }
  }, [actions, filters]);

  const handleClose = topic => {
    if (topic && filters.findIndex(f => f.slug === topic.slug) < 0) {
      setFilters([...filters, topic]);
    }
  };

  const handleDelete = topic => () => {
    topic && setFilters(filters.filter(f => f.slug !== topic.slug));
  };

  const [issueEl, setIssueEl] = React.useState(null);
  const openIssues = Boolean(issueEl);
  const handleClickIssues = event => {
    setIssueEl(event.currentTarget);
  };
  const handleCloseIssues = topic => () => {
    setIssueEl(null);
    handleClose(topic);
  };

  const [policiesEl, setPoliciesEl] = React.useState(null);
  const openPolicies = Boolean(policiesEl);
  const handleClickPolicies = event => {
    setPoliciesEl(event.currentTarget);
  };
  const handleClosePolicies = topic => () => {
    setPoliciesEl(null);
    handleClose(topic);
  };

  const [countriesEl, setCountriesEl] = React.useState(null);
  const openCountries = Boolean(countriesEl);
  const handleClickCountries = event => {
    setCountriesEl(event.currentTarget);
  };
  const handleCloseCountries = topic => () => {
    setCountriesEl(null);
    handleClose(topic);
  };

  const [companiesEl, setCompaniesEl] = React.useState(null);
  const openCompanies = Boolean(companiesEl);
  const handleClickCompanies = event => {
    setCompaniesEl(event.currentTarget);
  };
  const handleCloseCompanies = topic => () => {
    setCompaniesEl(null);
    handleClose(topic);
  };

  // table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // date parsing
  //var dateOptions = { month: "long", day: "numeric", year: "numeric" };

  return (
    <section>
      <Box my={4}>
        <Container maxWidth="md">
          <Typography variant="body1" component="div">
            {section.intro}
          </Typography>
        </Container>
      </Box>
      <Box my={4}>
        <Container>
          <Typography component="div" variant="h3">
            Filter by:
          </Typography>
          <Grid container spacing={2} justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="issues-button"
                color="issue"
                aria-controls="issues-menu"
                aria-haspopup="true"
                aria-expanded={openIssues ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickIssues}
                endIcon={
                  openIssues ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Issue
              </Button>
              <Menu
                id="issues-menu"
                MenuListProps={{
                  "aria-labelledby": "issues-button"
                }}
                anchorEl={issueEl}
                open={openIssues}
                onClose={handleCloseIssues()}
              >
                {issues && issues.length
                  ? issues.map(issue => (
                      <MenuItem
                        key={issue.slug}
                        onClick={handleCloseIssues(issue)}
                        disableRipple
                      >
                        {issue.displayTitle || issue.name}
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="policies-button"
                color="policy"
                aria-controls="policies-menu"
                aria-haspopup="true"
                aria-expanded={openPolicies ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickPolicies}
                endIcon={
                  openPolicies ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Policy
              </Button>
              <Menu
                id="policies-menu"
                MenuListProps={{
                  "aria-labelledby": "policies-button"
                }}
                anchorEl={policiesEl}
                open={openPolicies}
                onClose={handleClosePolicies()}
              >
                {policies && policies.length
                  ? policies.map(policy => (
                      <MenuItem
                        key={policy.slug}
                        onClick={handleClosePolicies(policy)}
                        disableRipple
                      >
                        {policy.displayTitle || policy.name}
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="countries-button"
                color="country"
                aria-controls="countries-menu"
                aria-haspopup="true"
                aria-expanded={openCountries ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickCountries}
                endIcon={
                  openCountries ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Country
              </Button>
              <Menu
                id="countries-menu"
                MenuListProps={{
                  "aria-labelledby": "countries-button"
                }}
                anchorEl={countriesEl}
                open={openCountries}
                onClose={handleCloseCountries()}
              >
                {countries && countries.length
                  ? countries.map(country => {
                      if (country) {
                        return (
                          <MenuItem
                            key={country.slug}
                            onClick={handleCloseCountries(country)}
                            disableRipple
                          >
                            {country.displayTitle || country.name}
                          </MenuItem>
                        );
                      }
                    })
                  : null}
              </Menu>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                id="companies-button"
                color="company"
                aria-controls="companies-menu"
                aria-haspopup="true"
                aria-expanded={openCompanies ? "true" : undefined}
                variant="contained"
                disableElevation
                className={classes.button}
                onClick={handleClickCompanies}
                endIcon={
                  openCompanies ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Company
              </Button>
              <Menu
                id="companies-menu"
                MenuListProps={{
                  "aria-labelledby": "companies-button"
                }}
                anchorEl={companiesEl}
                open={openCompanies}
                onClose={handleCloseCompanies()}
              >
                {companies && companies.length
                  ? companies.map(company => (
                      <MenuItem
                        key={companies.slug}
                        onClick={handleCloseCompanies(company)}
                        disableRipple
                      >
                        {company.displayTitle || company.name}
                      </MenuItem>
                    ))
                  : null}
              </Menu>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box my={4}>
        <Grid container spacing={2} justifyContent="flex-start">
          {filters.length
            ? filters.map(filter => (
                <Grid key={filter.__metadata.id} item>
                  <Chip
                    label={filter.displayTitle || filter.name}
                    color={filter.type}
                    onDelete={handleDelete(filter)}
                  />
                </Grid>
              ))
            : null}
        </Grid>
      </Box>
      <Box my={4}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            aria-label="Law and Regulation Tracker Table"
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                {headers.map(column => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {actions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.slug}
                    >
                      {headers.map(column => {
                        let value = row[column.id];
                        if (!value) {
                          if (row.country) {
                            value = row.country.displayTitle; // #FIXME
                          } else {
                            value = "";
                          }
                        }
                        return (
                          <TableCell
                            key={column.id}
                            className={
                              column.id == "title"
                                ? classes.tableCellTitle
                                : null
                            }
                          >
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : column.id == "title" ? (
                              <Link
                                className={classes.tableLink}
                                href={row.slug}
                              >
                                {value}
                              </Link>
                            ) : (
                              value
                            )}
                            {column.id == "title" ? (
                              <KeyboardArrowRightIcon
                                className={classes.icon}
                              />
                            ) : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={actions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </section>
  );
}

SectionTracker.propTypes = {
  section: PropTypes.object
};

export default SectionTracker;
