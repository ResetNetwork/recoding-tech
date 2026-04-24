// base imports
import React from "react";
import PropTypes from "prop-types";

// Material UI imports
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import NextLink from "next/link";
import Typography from "@mui/material/Typography";

// components
import ArticleSm from "./Topic/article-sm";
import ArticleLg from "./Topic/article-lg";

const PageRecents = (props) => {
  const { page, readings } = props;

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1010, mx: "auto" }}>
      <Grid container columns={3} spacing={"30px"} mt="80px">
        {readings && readings.length
          ? readings.map((article, index) =>
              index % 7 === 0 ? (
                <ArticleLg key={article._id} article={article} />
              ) : (
                <ArticleSm key={article._id} article={article} />
              )
            )
          : null}
      </Grid>
      <Grid item sx={{ justifySelf: "center" }}>
        <NextLink
          href={{
            pathname: "/search",
            query: { filter: page._id },
          }}
        >
          <Typography
            component="div"
            variant="h5"
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              display: "inline-block",
              color: "#0f2744",
              backgroundColor: "#fff",
              border: "1px solid #000",
              borderRadius: "12px",
              px: 3,
              py: 1.25,
              textAlign: "center",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#fafafa",
                boxShadow: "0px 2px 2px 0px #0000001F",
              },
            }}
          >
            View more
          </Typography>
        </NextLink>
      </Grid>
    </Container>
  );
};

PageRecents.propTypes = {
  page: PropTypes.object,
  readings: PropTypes.array,
};

export default PageRecents;
