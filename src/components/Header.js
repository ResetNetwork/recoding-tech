// base imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// material ui imports
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { visuallyHidden } from "@mui/utils";

// material ui icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

// component imports
import Logo from "./Logo";
import SearchBarHeader from "./SearchBarHeader";

const useStyles = makeStyles(() => ({
  em: {
    fontStyle: "italic",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1100,
    backgroundColor: "#fff",
  },
  link: {
    color: "#000 !important",
    textDecoration: "none!important",
  },
  logoLink: {
    color: "unset",
    textDecoration: "none",
  },
  nav: {},
  svg: {
    display: "block",
    maxHeight: 20,
    maxWidth: 20,
    width: "100%",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { data } = props;
  const [mobileEl, setMobileEl] = useState(null);
  const openMobile = Boolean(mobileEl);
  const handleClickMobile = (event) => {
    setMobileEl(event.currentTarget);
  };
  const handleCloseMobile = () => {
    setMobileEl(null);
  };

  const isMobile = useMediaQuery("(max-width:1264px)");

  const [anchorElTopics, setAnchorElTopics] = React.useState(null);
  const openTopics = Boolean(anchorElTopics);
  const handleClickTopics = (event) => {
    setAnchorElTopics(event.currentTarget);
  };
  const handleCloseTopics = () => {
    setAnchorElTopics(null);
  };

  const [anchorElProjects, setAnchorElProjects] = React.useState(null);
  const openProjects = Boolean(anchorElProjects);
  const handleClickProjects = (event) => {
    setAnchorElProjects(event.currentTarget);
  };
  const handleCloseProjects = () => {
    setAnchorElProjects(null);
  };

  const [anchorElContribs, setAnchorElContribs] = React.useState(null);
  const openContribs = Boolean(anchorElContribs);
  const handleClickContribs = (event) => {
    setAnchorElContribs(event.currentTarget);
  };
  const handleCloseContribs = () => {
    setAnchorElContribs(null);
  };

  return (
    <header className={classes.header}>
      <Box
        p={"20px 36px"}
        mb={0}
        mt={0}
        sx={{
          boxShadow: "0px 2px 1px -1px #cdcdcd",
        }}
      >
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={10} md={2}>
            <Link href="/" className={classes.logoLink}>
              <Logo />
              <Typography sx={{ display: "none" }}>Home</Typography>
            </Link>
          </Grid>
          <Grid
            container
            item
            xs={2}
            md={10}
            className={classes.nav}
            alignItems="center"
            spacing={4}
            justifyContent="flex-end"
          >
            {isMobile ? (
              <Grid item xs={12} sx={{ textAlign: "right" }} id="menu-toggle">
                <Button
                  id="mobile-menu-button"
                  aria-controls="mobile-menu"
                  aria-haspopup="true"
                  aria-expanded={openMobile ? "true" : undefined}
                  onClick={handleClickMobile}
                >
                  {openMobile ? <CloseIcon /> : <MenuIcon />}
                  <Typography sx={visuallyHidden}>
                    Open or Close Menu
                  </Typography>
                </Button>
                <Popover
                  id="mobile-menu"
                  open={openMobile}
                  anchorEl={mobileEl}
                  onClose={handleCloseMobile}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{ mt: 2 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      width: "90vw",
                    }}
                  >
                    <nav>
                      <Accordion elevation={0} sx={{ marginLeft: 0 }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="topics-mobile-content"
                          id="topics-mobile-header"
                          sx={{
                            display: "flex",
                            position: "relative",
                            width: 140,
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h4"
                            paddingTop={1}
                            marginBottom={1}
                            sx={{ textTransform: "none" }}
                          >
                            Topics
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.config.header &&
                            data.config.header.topics &&
                            data.config.header.topics.map((link) => (
                              <Typography
                                key={link.slug.current}
                                component="div"
                                variant="body2"
                                marginBottom={2}
                              >
                                <Link
                                  href={`/topic/${link.slug.current}`}
                                  sx={{
                                    color: "#000",
                                    fontSize: "1.1em",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                  }}
                                >
                                  {link.displayName}
                                </Link>
                              </Typography>
                            ))}
                        </AccordionDetails>
                      </Accordion>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/newsletter`} className={classes.link}>
                          Newsletter
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/podcast`} className={classes.link}>
                          Podcast
                        </Link>
                      </Typography>
                      <Accordion elevation={0} sx={{ marginLeft: 0 }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="projects-mobile-content"
                          id="projects-mobile-header"
                          sx={{
                            display: "flex",
                            position: "relative",
                            width: 140,
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h4"
                            paddingTop={1}
                            marginBottom={1}
                            sx={{ textTransform: "none" }}
                          >
                            Series
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.config.header &&
                            data.config.header.series &&
                            data.config.header.series.map((link) => (
                              <Typography
                                key={link.slug.current}
                                component="div"
                                variant="body2"
                                marginBottom={2}
                              >
                                <Link
                                  href={`/topic/${link.slug.current}`}
                                  sx={{
                                    color: "#000",
                                    fontSize: "1.1em",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                  }}
                                >
                                  {link.displayName}
                                </Link>
                              </Typography>
                            ))}
                        </AccordionDetails>
                      </Accordion>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/contributors`} className={classes.link}>
                          Contributors
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link
                          href={`/contributor-guidelines/`}
                          className={classes.link}
                        >
                          Contributor Guidelines
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/about-us`} className={classes.link}>
                          About
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/search`} className={classes.link}>
                          Search
                        </Link>
                      </Typography>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{ marginLeft: 2, textTransform: "none" }}
                      >
                        <Link href={`/donate`} className={classes.link}>
                          Donate
                        </Link>
                      </Typography>
                    </nav>
                  </Box>
                </Popover>
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="baseline"
                  justifyContent="space-between"
                  spacing={6}
                  paddingTop="20px"
                >
                  <Grid
                    container
                    item
                    xs={9}
                    spacing={5}
                    mt={0}
                    paddingTop="0px!important"
                    flexWrap={"nowrap"}
                    justifyContent="flex-end"
                  >
                    <Grid item>
                      <Button
                        id="topics-button"
                        aria-controls={openTopics ? "topics-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openTopics ? "true" : undefined}
                        onClick={handleClickTopics}
                        sx={{
                          fontSize: "1em",
                          fontWeight: 500,
                          marginTop: "3px",
                          paddingTop: 0,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            backgroundColor: "#f2f2f2",
                            borderRadius: 0,
                          },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Topics
                      </Button>
                      <Menu
                        id="topics-menu"
                        anchorEl={anchorElTopics}
                        open={openTopics}
                        onClose={handleCloseTopics}
                        MenuListProps={{
                          "aria-labelledby": "topics-button",
                        }}
                        elevation={1}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        sx={{
                          marginTop: 4,
                          "& ul": {
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            maxWidth: "60vw !important",
                            padding: 3,
                            width: "60vw",
                          },
                        }}
                      >
                        {data.config.header &&
                          data.config.header.topics &&
                          data.config.header.topics.map((link) => (
                            <MenuItem
                              key={link.slug.current}
                              sx={{ padding: 1 }}
                            >
                              <Link
                                href={`/topic/${link.slug.current}`}
                                sx={{
                                  color: "#000",
                                  fontSize: "1.3em",
                                  fontWeight: 400,
                                  textDecoration: "none",
                                  "&:active, &:focus, &:hover": {
                                    fontWeight: 600,
                                  },
                                }}
                              >
                                {link.displayName}
                              </Link>
                            </MenuItem>
                          ))}
                      </Menu>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2",
                          },
                        }}
                      >
                        <Link href={`/newsletter`} className={classes.link}>
                          Newsletter
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2",
                          },
                        }}
                      >
                        <Link href={`/podcast`} className={classes.link}>
                          Podcast
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        id="projects-button"
                        aria-controls={
                          openProjects ? "projects-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openProjects ? "true" : undefined}
                        onClick={handleClickProjects}
                        sx={{
                          fontSize: "1em",
                          fontWeight: 500,
                          marginTop: "3px",
                          paddingTop: 0,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            backgroundColor: "#f2f2f2",
                            borderRadius: 0,
                          },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Series
                      </Button>
                      <Menu
                        id="projects-menu"
                        anchorEl={anchorElProjects}
                        open={openProjects}
                        onClose={handleCloseProjects}
                        MenuListProps={{
                          "aria-labelledby": "projects-button",
                        }}
                        elevation={1}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        sx={{
                          marginTop: 4,
                          "& ul": {
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            maxWidth: "40vw !important",
                            padding: 3,
                            width: "40vw",
                          },
                        }}
                      >
                        {data.config.header &&
                          data.config.header.series &&
                          data.config.header.series.map((link) => (
                            <MenuItem
                              key={link.slug.current}
                              sx={{ padding: 1 }}
                            >
                              <Link
                                href={`/topic/${link.slug.current}`}
                                sx={{
                                  color: "#000",
                                  fontSize: "1.3em",
                                  fontWeight: 400,
                                  textDecoration: "none",
                                  "&:active, &:focus, &:hover": {
                                    fontWeight: 600,
                                  },
                                }}
                              >
                                {link.displayName}
                              </Link>
                            </MenuItem>
                          ))}
                      </Menu>
                    </Grid>
                    <Grid item>
                      <Button
                        id="contributors-button"
                        aria-controls={
                          openContribs ? "contributors-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openContribs ? "true" : undefined}
                        onClick={handleClickContribs}
                        sx={{
                          fontSize: "1em",
                          fontWeight: 500,
                          marginTop: "3px",
                          paddingTop: 0,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            backgroundColor: "#f2f2f2",
                            borderRadius: 0,
                          },
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        Contributors
                      </Button>
                      <Menu
                        id="contributors-menu"
                        anchorEl={anchorElContribs}
                        open={openContribs}
                        onClose={handleCloseContribs}
                        MenuListProps={{
                          "aria-labelledby": "contributors-button",
                        }}
                        elevation={1}
                        sx={{
                          marginTop: 4,
                          "& ul": {
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            maxWidth: "30vw !important",
                            padding: 3,
                            width: "30vw",
                          },
                        }}
                      >
                        <MenuItem sx={{ padding: 1 }}>
                          <Link
                            href={`/contributors`}
                            sx={{
                              color: "#000",
                              fontSize: "1.3em",
                              fontWeight: 400,
                              textDecoration: "none",
                              "&:active, &:focus, &:hover": {
                                fontWeight: 600,
                              },
                            }}
                          >
                            Contributors
                          </Link>
                        </MenuItem>
                        <MenuItem sx={{ padding: 1 }}>
                          <Link
                            href={`/contributor-guidelines/`}
                            sx={{
                              color: "#000",
                              fontSize: "1.3em",
                              fontWeight: 400,
                              textDecoration: "none",
                              "&:active, &:focus, &:hover": {
                                fontWeight: 600,
                              },
                            }}
                          >
                            Contributor Guidelines
                          </Link>
                        </MenuItem>
                      </Menu>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          fontWeight: 500,
                          marginBottom: 0,
                          padding: 1,
                          textTransform: "none",
                          "&:active, &:focus, &:hover": {
                            background: "#f2f2f2",
                          },
                        }}
                      >
                        <Link href={`/about-us`} className={classes.link}>
                          About
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={3} flexGrow={2} paddingTop="20px">
                    <SearchBarHeader />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    config: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  page: PropTypes.object.isRequired,
  isHomepage: PropTypes.bool,
};

export default Header;
