// base imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

// utils
import client from "../utils/sanityClient";

// Material UI imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

// material ui icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Badge from "./Badge";

const useStyles = makeStyles((theme) => ({
  chip: {
    fontFamily: theme.typography.link.fontFamily,
    fontWeight: 500,
    textTransform: "uppercase",
  },
  article: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  articleTitle: {
    color: "#000 !important",
    fontSize: "1.2em",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  articlePublication: {
    marginTop: 25,
    marginBottom: 8,
  },
  grid: {},
  gridTitle: {
    marginBottom: 32,
    marginTop: 32,
  },
  link: {
    color: theme.typography.link.color,
  },
  resultItem: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.5,
    display: "flex",
    flexDirection: "column",
    "&>a": {
      textDecoration: "none",
    },
    "&>a:hover": {
      textDecoration: "underline",
    },
    "&:not(:last-child)": {
      borderBottom: "1px solid #E2D7BB77",
      paddingBottom: "10px",
    },
  },
}));

const ROWS_PER_PAGE = 21;

const SectionSearch = ({ articles: allArticles, data: { topics } }) => {
  const classes = useStyles();
  const router = useRouter();
  let query = router.query;
  const [articles, setArticles] = useState(allArticles);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // dates 2020-10-13T14:00:00.000Z
  // using the date of the earliest published TPP article
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    let filterTopic;

    if (query.filter) {
      filterTopic = topics.filter((topic) => topic._id === query.filter);
      if (filterTopic.length > 0) {
        setFilters(filterTopic);
      } else {
        setFilters([{ _id: query.filter }]);
      }
    }

    if (query.query) {
      setSearch(query.query);
      setSearchValue(query.query);
    }
  }, [router.isReady, query]);

  const fetchArticles = async () => {
    //  using the date of the earliest published TPP article
    let startDate = startValue
      ? startValue
      : DateTime.fromISO("2020-10-13T14:00:00.000Z");
    let endDate = endValue ? endValue : DateTime.now();

    let dateFragment = ` && date > '${startDate}' && date < '${endDate}'`;
    let searchFragment = "";
    if (searchValue) {
      const authors = await client.fetch(
        `*[_type=="author" && name match "${searchValue}"]{_id}`
      );
      const authorSearch = authors
        .map((author) => ` || references("${author._id}")`)
        .join("");
      searchFragment = ` && (pt::text(body) match "${searchValue}" || title match "${searchValue}" ${authorSearch})`;
    }

    // if there's a searchvalue text, boost the results where the title matches the search value
    // let scoreFragment = ` | score(pt::text(body) match "${searchValue}", boost(title match "${searchValue}", 3)) { _id, title, date, slug, relatedTopics[]->{slug, _id, name, displayName, stackbit_model_type}, _score }`;

    let detailFragment = ` { _id, title, date, slug, badge, relatedTopics[]->{ slug, _id, name, displayName, stackbit_model_type} } | order(date desc)`;

    let filterFragment = [];
    if (filters.length) {
      // console.log("***filters", filters);
      filters.forEach((filter) =>
        filterFragment.push(` && references("${filter._id}")`)
      );
    }
    // console.log("***searchFragment***:", searchFragment);
    // console.log("***filterFragment***:", filterFragment);
    const query = `*[!(_id in path("drafts.**")) && _type == "post"${dateFragment}${searchFragment}${filterFragment.join(
      " "
    )}]${detailFragment}`;
    // console.log("***GROQ query***:", query);
    const newArticles = await client.fetch(query);
    setArticles(newArticles);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (filters.length || search || (startValue && endValue)) {
      // reset pagination
      setPage(1);
      fetchArticles()
        .catch(console.error)
        .finally(() => setLoading(false));
    }

    if (!filters.length && !search && !(startValue && endValue)) {
      setArticles(allArticles);
      setLoading(false);
    }
  }, [filters, search, startValue, endValue]);

  // table pagination
  const [page, setPage] = useState(1);

  const handleClose = (topic) => {
    if (topic && filters.findIndex((f) => f._id === topic._id) < 0) {
      setFilters([...filters, topic]);
    }
  };

  const [topicEl, setTopicEl] = useState(null);
  const openTopics = Boolean(topicEl);

  const handleClickTopics = (event) => {
    setTopicEl(event.currentTarget);
  };

  const handleCloseTopics = (topic) => () => {
    setTopicEl(null);
    handleClose(topic);
  };

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleDelete = (topic) => () => {
    if (query.filter && history) {
      history.pushState(null, "", location.href.split("?")[0]);
    }
    topic && setFilters(filters.filter((f) => f._id !== topic._id));
  };

  // const getHandler = (item) => {
  //   const handler = () => Router.push({ pathname: item.url });
  //   return handler;
  // };

  if (loading) {
    return (
      <section>
        <Grid container item justifyContent="center" mb={8}>
          <CircularProgress />
        </Grid>
      </section>
    );
  } else {
    return (
      <Box>
        <Box
          sx={{
            backgroundColor: "#E0EEFF",
            padding: 4,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
          >
            {articles && articles.length
              ? `Showing ${articles.length} results for: `
              : ""}
          </Typography>
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                const url = "/search/?query=" + encodeURI(e.target.value);
                if (router && router.push) {
                  router.push(url);
                }
              }
            }}
            fullWidth
            id="search-field"
            label="Enter search term"
            variant="standard"
          />
          <Grid
            container
            alignItems={"center"}
            spacing={4}
            sx={{ marginTop: 1 }}
          >
            <Grid item>
              <Typography
                component="h2"
                variant="h4"
                sx={{
                  color: "rgba(0,0,0,0.6)",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                Filter by:
              </Typography>
            </Grid>
            <Grid item>
              <Box>
                <Typography>
                  <LocalizationProvider
                    dateAdapter={AdapterLuxon}
                    adapterLocale="en-us"
                  >
                    <DatePicker
                      label="Date range - start"
                      value={startValue}
                      onChange={(newStartValue) => setStartValue(newStartValue)}
                    />
                  </LocalizationProvider>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography>
                  <LocalizationProvider
                    dateAdapter={AdapterLuxon}
                    adapterLocale="en-us"
                  >
                    <DatePicker
                      label="Date range - end"
                      value={endValue}
                      onChange={(newEndValue) => setEndValue(newEndValue)}
                    />
                  </LocalizationProvider>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Button
                  sx={{
                    border: "1px solid rgba(0,0,0,0.56)",
                    color: "rgba(0,0,0,0.6)",
                  }}
                  id="topics-button"
                  aria-controls="topics-menu"
                  aria-haspopup="true"
                  aria-expanded={openTopics ? "true" : undefined}
                  disableElevation
                  onClick={handleClickTopics}
                  endIcon={
                    openTopics ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                >
                  Topic
                </Button>
                <Menu
                  id="topics-menu"
                  MenuListProps={{
                    "aria-labelledby": "topics-button",
                  }}
                  anchorEl={topicEl}
                  open={openTopics}
                  onClose={handleCloseTopics()}
                >
                  {topics && topics.length
                    ? topics.map((topic) => (
                        <MenuItem
                          key={topic._id}
                          onClick={handleCloseTopics(topic)}
                          disableRipple
                        >
                          {topic.displayName}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          className={classes.grid}
          spacing={4}
          alignItems="flex-start"
          direction="row-reverse"
          justifyContent="flex-end"
        >
          <Grid
            container
            item
            xs={12}
            md={4}
            direction="column"
            sx={{ marginTop: 4 }}
          >
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} flexWrap={"wrap"} useFlexGap>
                {filters.length
                  ? filters
                      .filter((f) => f.displayName)
                      .map((filter, index) => (
                        <Chip
                          className={classes.chip}
                          key={`${filter}-${index}`}
                          item
                          label={filter.displayName}
                          onDelete={handleDelete(filter)}
                        />
                      ))
                  : null}
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent="space-between"
            spacing={4}
            xs={12}
            md={8}
            sx={{ marginTop: 4 }}
          >
            <Grid container item xs={12} spacing={2}>
              {articles && articles.length
                ? articles
                    .slice(
                      (page - 1) * ROWS_PER_PAGE,
                      (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE
                    )
                    .map((article) => (
                      <Grid
                        key={article._id}
                        item
                        xs={12}
                        className={classes.resultItem}
                      >
                        {article.badge && (
                          <Badge badge={article.badge} variant={"link"} />
                        )}
                        <Link href={`/${article.slug.current}`}>
                          {article.title}
                        </Link>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: "#a7a7a7",
                            fontSize: 14,
                            fontWeight: 400,
                            marginTop: "8px",
                            textTransform: "uppercase",
                            lineHeight: 1.75,
                            display: "inline-block",
                          }}
                        >
                          {DateTime.fromISO(article.date).toLocaleString(
                            DateTime.DATE_MED
                          )}{" "}
                        </Typography>
                      </Grid>
                    ))
                : null}
            </Grid>

            {articles && articles.length ? (
              <Grid item>
                <Pagination
                  count={Math.ceil(articles.length / ROWS_PER_PAGE)}
                  onChange={handleChangePage}
                  sx={{ marginLeft: "-16px", marginBottom: "32px" }}
                />
              </Grid>
            ) : (
              <Grid item>
                <Typography component="div" variant="body1">
                  No results found.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
};

SectionSearch.propTypes = {
  page: PropTypes.object,
  articles: PropTypes.array,
  data: PropTypes.object,
};

export default SectionSearch;

/***
 *
 *    // newArticles = newArticles.filter((article) => {
        //   const regex = new RegExp(`${search}`, "i");
        //   for (const prop in article) {
        //     const value = article[prop];
        //     if (typeof value === "string" || value instanceof String) {
        //       if (value.search(regex) >= 0) return true;
        //     }
        //   }
        //   return false;
        // });
 *
 */
