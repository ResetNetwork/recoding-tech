import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import { Box, Container, Typography, Grid, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Layout } from "../components/index";

import urlFor from "../utils/imageBuilder";

const useStyles = makeStyles(() => ({
  box: {
    border: "1px solid #000",
    borderRadius: 0,
    overflow: "unset",
    position: "relative",
  },
  em: {
    fontStyle: "italic",
  },
  maxWidth: {
    maxWidth: "100% !important",
  },
  hero: {
    paddingTop: "65px",
    paddingBottom: "60px",
    color: "#FFF",
  },
}));

const Podcast = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Layout {...props} isHomepage={true}>
      <section className="block block-hero">
        <Box
          style={{
            backgroundColor: "#343434FF",
            paddingBottom: "60px!important",
          }}
        >
          <Container
            maxWidth="sm"
            className={classes.hero}
            sx={{
              paddingBottom: "60px!important",
            }}
          >
            <Typography
              component="h1"
              variant="h2_article"
              sx={{
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: 1.5,
                justifySelf: "center",
                mb: 0,
              }}
            >
              Podcast
            </Typography>
            <Typography
              component="div"
              variant="body2"
              className="html-to-react"
              sx={{
                fontSize: 14,
                lineHeight: 1.5,
                textAlign: "center",
                "& p": {
                  margin: 0,
                },
              }}
            >
              Tech Policy press publishes a weekly (and sometimes more often)
              podcast. You can subscribe with your favorite podcast service.
              Give it a listen and let us know what you think!
            </Typography>
          </Container>
          <Container sx={{ maxWidth: "1300px!important" }}>
            <Grid container spacing={"20px"}>
              {data.newsletters?.length > 0 &&
                data.newsletters.map((article) => (
                  <Grid item xs={12} md={4} key={article._id}>
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        flex: "0 0 auto",
                        width: "fit-content",
                        alignSelf: "center",
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                    >
                      <Link
                        href={`/${article.slug.current}`}
                        style={{ display: "block" }}
                      >
                        <img
                          src={
                            article.featuredImage
                              ? urlFor(article.featuredImage).width(418).url()
                              : null
                          }
                          style={{
                            width: "418px",
                            display: "block",
                            verticalAlign: "bottom",
                            maxWidth: "100%",
                          }}
                        />
                      </Link>
                      <Box
                        aria-hidden
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: { sm: "50%", xs: "100%" },
                          background:
                            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 1) 100%)",
                          pointerEvents: "none",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 1,
                          padding: "20px 40px",
                          textAlign: "left",
                        }}
                      >
                        <Link
                          href={`/${article.slug.current}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            gutterBottom
                            component="div"
                            variant="h2_article"
                            color={article.featuredImage ? "#FFF" : "#000"}
                            mb="0"
                            sx={{
                              fontSize: "16px",
                              lineHeight: "1.5",
                            }}
                          >
                            {article.title}
                          </Typography>
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
                            lineHeight: 1.5,
                            display: "inline-block",
                          }}
                        >
                          {DateTime.fromISO(article.date)
                            .setZone("America/New_York")
                            .setLocale("en-us")
                            .toLocaleString(DateTime.DATE_FULL)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
        <Container sx={{ maxWidth: "1207px!important", py: "80px" }}>
          <Typography
            component="h2"
            variant="h3"
            sx={{
              marginBottom: "20px",
              textTransform: "none",
              fontSize: "28px",
            }}
          >
            Listen now
          </Typography>
          <div
            style={{
              width: "100%",
              height: "600px",
              marginBottom: "20px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <iframe
              style={{ width: "100%", height: "600px", border: "none" }}
              seamless=""
              src="https://player.captivate.fm/show/1749da6a-9a89-4f1d-bd30-65eb9a749b60/"
            ></iframe>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "16px", paddingRight: "10px" }}
            >
              Or listen here:
            </Typography>

            {/* RSS Feed */}
            <a
              href="https://techpolicypress.captivate.fm/rssfeed"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                aria-hidden="true"
                className="link-logo rss-svg"
                focusable="false"
                width="35"
                height="36"
                viewBox="0 0 35 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 30.5C10 27.7656 7.73438 25.5 5 25.5C2.1875 25.5 0 27.7656 0 30.5C0 33.3125 2.1875 35.5 5 35.5C7.73438 35.5 10 33.3125 10 30.5ZM23.6719 34.25C23.0469 22.1406 13.3594 12.4531 1.25 11.8281C0.546875 11.75 0 12.375 0 13.0781V16.8281C0 17.4531 0.46875 18 1.09375 18.0781C9.84375 18.625 16.875 25.6562 17.4219 34.4062C17.5 35.0312 18.0469 35.5 18.6719 35.5H22.4219C23.125 35.5 23.75 34.9531 23.6719 34.25ZM34.9219 34.25C34.2969 15.9688 19.6094 1.20312 1.25 0.578125C0.546875 0.5 0 1.04688 0 1.82812V5.57812C0 6.20312 0.46875 6.75 1.17188 6.82812C16.0938 7.375 28.125 19.4062 28.6719 34.3281C28.75 35.0312 29.2969 35.5781 29.9219 35.5781H33.6719C34.4531 35.5 35 34.9531 34.9219 34.25Z"
                  fill="#FF9900"
                ></path>
              </svg>
            </a>
            {/* Spotify */}
            <a
              aria-label="Listen on Spotify"
              href="https://techpolicypress.captivate.fm/spotify"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="link-logo spotify-svg"
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                width="36px"
                version="1.1"
                viewBox="0 0 168 168"
              >
                <path
                  fill="#1ED760"
                  d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                ></path>
              </svg>
            </a>

            {/* Pocket Casts */}
            <a
              aria-label="Listen on Pocket Casts"
              href="https://techpolicypress.captivate.fm/pocketcasts"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="link-logo pocketcasts-svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                height="36"
                viewBox="0 0 100 100"
                width="36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  height="100"
                  id="a"
                  maskUnits="userSpaceOnUse"
                  width="100"
                  x="0"
                  y="0"
                >
                  <path
                    d="m50 97a47 47 0 1 0 -47-47 47 47 0 0 0 47 47z"
                    fill="#fff"
                    fillRule="evenodd"
                  ></path>
                </mask>
                <mask
                  height="70.37"
                  id="b"
                  maskUnits="userSpaceOnUse"
                  width="70.37"
                  x="14.86"
                  y="14.86"
                >
                  <path
                    d="m49.25 73.66a23.62 23.62 0 1 1 24.41-24.41.84.84 0 0 0 .84.8h6.87a.84.84 0 0 0 .84-.86 32.17 32.17 0 1 0 -33 33 .84.84 0 0 0 .86-.84v-6.85a.84.84 0 0 0 -.8-.84zm.8-42.21a18.6 18.6 0 0 0 -.88 37.18.84.84 0 0 0 .88-.84v-5.45a.86.86 0 0 0 -.78-.84 11.48 11.48 0 1 1 12.23-12.23.86.86 0 0 0 .84.78h5.45a.84.84 0 0 0 .84-.88 18.6 18.6 0 0 0 -18.58-17.72z"
                    fill="#fff"
                    fillRule="evenodd"
                  ></path>
                </mask>
                <g mask="url(#a)">
                  <path
                    d="m0 0h100v100h-100z"
                    fill="#f44336"
                    fillRule="evenodd"
                  ></path>
                </g>
                <g mask="url(#b)">
                  <path
                    d="m14.86 14.86h70.37v70.37h-70.37z"
                    fill="#fefefe"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </a>

            {/* Apple Podcasts */}
            <a
              aria-label="Listen on Apple Podcasts"
              href="https://techpolicypress.captivate.fm/apple"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="link-logo"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="36"
                height="36"
                viewBox="0 0 40 40"
              >
                <defs>
                  <linearGradient y2="1" x2=".5" y1="0" x1=".5" id="A">
                    <stop stopColor="#f452ff" offset="0"></stop>
                    <stop stopColor="#832bc1" offset="1"></stop>
                  </linearGradient>
                  <path
                    id="B"
                    d="M39.137 34.569c-.387.981-1.281 2.362-2.549 3.335-.732.562-1.606 1.099-2.806 1.453-1.279.378-2.855.506-4.816.506H11.034c-1.961 0-3.537-.128-4.816-.506-1.2-.354-2.074-.891-2.806-1.453-1.267-.973-2.161-2.354-2.549-3.335-.78-1.976-.788-4.218-.788-5.631h0V11.062h0c0-1.412.008-3.654.788-5.631.387-.981 1.281-2.362 2.549-3.335C4.144 1.535 5.017.998 6.217.643 7.497.265 9.072.137 11.034.137h0 17.933 0c1.961 0 3.537.128 4.816.506 1.2.354 2.074.892 2.806 1.453 1.267.973 2.161 2.354 2.549 3.335.78 1.976.788 4.218.788 5.631v17.876c0 1.412-.008 3.654-.788 5.631z"
                  ></path>
                </defs>
                <g stroke="null">
                  <use xlinkHref="#B" fill="url(#A)" fillRule="evenodd"></use>
                  <use xlinkHref="#B" fill="none"></use>
                  <path
                    d="M22.89 22.971c-.598-.629-1.648-1.032-2.888-1.032s-2.29.403-2.888 1.032a1.82 1.82 0 0 0-.529 1.144c-.101.928-.044 1.727.065 3.005l.559 4.495.468 2.267c.22.737 1.041 1.382 2.326 1.382s2.106-.645 2.326-1.382c.136-.455.284-1.09.468-2.267l.559-4.495c.109-1.278.166-2.077.065-3.005-.052-.479-.217-.816-.529-1.144zm-6.146-5.6c0 1.795 1.46 3.251 3.261 3.251s3.261-1.456 3.261-3.251-1.46-3.251-3.261-3.251-3.261 1.456-3.261 3.251zm3.221-12.83c-7.627.022-13.877 6.19-13.972 13.793-.077 6.159 3.867 11.427 9.375 13.359.134.047.269-.064.248-.203l-.203-1.431a.48.48 0 0 0-.284-.378c-4.353-1.896-7.392-6.248-7.344-11.289.064-6.615 5.483-12.009 12.119-12.062 6.784-.055 12.321 5.431 12.321 12.182 0 4.99-3.026 9.289-7.345 11.17a.48.48 0 0 0-.283.379l-.203 1.43c-.021.14.114.25.248.204 5.455-1.913 9.376-7.099 9.376-13.182 0-7.717-6.309-13.992-14.054-13.97zm-.253 6.409c4.324-.167 7.895 3.291 7.895 7.565a7.54 7.54 0 0 1-2.4 5.518.58.58 0 0 0-.183.455c.029.52.019 1.025-.016 1.596-.009.152.162.249.288.163 2.476-1.687 4.104-4.523 4.104-7.731 0-5.283-4.414-9.558-9.759-9.351-4.967.192-8.952 4.274-9.016 9.229-.042 3.259 1.597 6.146 4.104 7.854.126.086.296-.012.287-.163A13.35 13.35 0 0 1 15 24.487a.58.58 0 0 0-.182-.454 7.54 7.54 0 0 1-2.398-5.721c.105-3.967 3.314-7.208 7.292-7.362z"
                    fill="#fff"
                  ></path>
                </g>
              </svg>
            </a>

            {/* Amazon Music */}
            <a
              aria-label="Listen on Amazon Music"
              href="https://techpolicypress.captivate.fm/amazon"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="link-logo"
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 120 80"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M-32 112h181V-32H-32z"></path>
                  <path
                    fill="#FFFFFF"
                    d="M72.37 27.38C65.59 32.35 55.77 35 47.3 35A45.5 45.5 0 0 1 16.7 23.38c-.64-.57-.07-1.35.69-.9a61.88 61.88 0 0 0 30.64 8.08c7.5 0 15.77-1.55 23.36-4.76 1.15-.48 2.11.75.99 1.58zm2.82-3.2c-.87-1.1-5.73-.53-7.91-.27-.67.08-.77-.5-.17-.91 3.88-2.71 10.23-1.93 10.97-1.02.75.91-.2 7.25-3.83 10.28-.56.47-1.09.22-.84-.4.82-2.03 2.65-6.58 1.78-7.68zM67.43 3.85V1.22c0-.4.3-.67.67-.67h11.87c.38 0 .68.27.68.66v2.26c0 .38-.32.88-.9 1.66l-6.14 8.73c2.28-.05 4.7.29 6.77 1.45.47.26.6.65.63 1.03v2.8c0 .4-.43.84-.87.6a13.73 13.73 0 0 0-12.54.03c-.42.22-.85-.22-.85-.61v-2.67c0-.43.01-1.16.44-1.81L74.32 4.5h-6.2c-.38 0-.69-.26-.7-.66zM90.87.21c5.36 0 8.26 4.58 8.26 10.4 0 5.62-3.2 10.08-8.26 10.08-5.26 0-8.12-4.58-8.12-10.28 0-5.74 2.9-10.2 8.12-10.2zm.03 3.76c-2.66 0-2.83 3.6-2.83 5.86 0 2.25-.03 7.06 2.8 7.06 2.8 0 2.93-3.88 2.93-6.25 0-1.55-.07-3.41-.54-4.88-.4-1.28-1.21-1.79-2.36-1.79zM61.61 20.26c-.24.2-.68.22-.85.08-1.24-.95-2.07-2.4-2.07-2.4-1.98 2.01-3.39 2.62-5.96 2.62-3.03 0-5.4-1.87-5.4-5.6a6.1 6.1 0 0 1 3.85-5.87c1.96-.86 4.7-1.01 6.79-1.25 0 0 .17-2.25-.44-3.07a2.54 2.54 0 0 0-2.03-.93c-1.33 0-2.63.72-2.89 2.11-.07.4-.36.74-.68.7l-3.45-.37a.63.63 0 0 1-.54-.75c.8-4.22 4.63-5.5 8.07-5.5 1.76 0 4.05.47 5.44 1.79 1.75 1.63 1.59 3.8 1.59 6.18v5.6c0 1.68.7 2.42 1.36 3.32.23.33.28.72-.01.96-.74.61-2.78 2.38-2.78 2.38zm-3.64-8.76v-.78c-2.61 0-5.37.56-5.37 3.62 0 1.55.81 2.6 2.2 2.6 1 0 1.92-.62 2.5-1.63.7-1.25.67-2.41.67-3.81zm-43.7 8.76c-.23.2-.67.22-.84.08-1.24-.95-2.07-2.4-2.07-2.4-1.99 2.01-3.39 2.62-5.96 2.62-3.04 0-5.4-1.87-5.4-5.6a6.1 6.1 0 0 1 3.85-5.87c1.96-.86 4.7-1.01 6.79-1.25 0 0 .17-2.25-.44-3.07a2.54 2.54 0 0 0-2.03-.93c-1.34 0-2.63.72-2.89 2.11-.07.4-.37.74-.68.7l-3.46-.37a.63.63 0 0 1-.53-.75C1.4 1.31 5.24.03 8.68.03c1.76 0 4.05.47 5.44 1.79C15.87 3.45 15.7 5.62 15.7 8v5.6c0 1.68.7 2.42 1.36 3.32.23.33.28.72-.01.96-.74.61-2.78 2.38-2.78 2.38zm-3.63-8.76v-.78c-2.61 0-5.37.56-5.37 3.62 0 1.55.8 2.6 2.2 2.6 1 0 1.92-.62 2.5-1.63.7-1.25.67-2.41.67-3.81zm14.2-1.63v9.76c0 .37-.3.67-.68.67h-3.6a.67.67 0 0 1-.68-.67V1.27c0-.37.3-.67.68-.67h3.37c.37 0 .67.3.67.67v2.35h.07C25.55 1.3 27.2.21 29.42.21c2.26 0 3.67 1.09 4.69 3.41A5.13 5.13 0 0 1 39.09.21c1.52 0 3.17.62 4.18 2.02 1.15 1.55.91 3.8.91 5.78v11.63c0 .37-.31.66-.7.66h-3.6a.67.67 0 0 1-.65-.66V9.87c0-.78.07-2.72-.1-3.45-.27-1.25-1.08-1.6-2.13-1.6a2.4 2.4 0 0 0-2.15 1.52c-.37.93-.34 2.48-.34 3.53v9.77c0 .37-.31.66-.7.66h-3.6a.67.67 0 0 1-.65-.66V9.87c0-2.06.33-5.08-2.23-5.08-2.6 0-2.5 2.94-2.5 5.08zm81.94 9.76c0 .37-.3.67-.67.67h-3.61a.67.67 0 0 1-.67-.67V1.27c0-.37.3-.67.67-.67h3.33c.4 0 .68.31.68.52v2.81h.07c1-2.52 2.42-3.72 4.92-3.72 1.62 0 3.2.58 4.21 2.17.94 1.48.94 3.96.94 5.74v11.6a.68.68 0 0 1-.69.58h-3.62a.68.68 0 0 1-.64-.58V8.58c0-3.72-1.43-3.83-2.26-3.83-.96 0-1.74.75-2.07 1.44a8.3 8.3 0 0 0-.6 3.52l.01 9.92zM.93 79.3c-.62 0-.93-.3-.93-.93V56.68c0-.62.31-.93.93-.93H3c.3 0 .55.07.72.19.17.12.29.36.35.7l.28 1.48c2.99-2.04 5.9-3.06 8.73-3.06 2.9 0 4.86 1.1 5.89 3.3 3.08-2.2 6.16-3.3 9.24-3.3 2.15 0 3.8.6 4.95 1.8 1.15 1.22 1.73 2.94 1.73 5.16v16.35c0 .62-.32.93-.94.93H31.2c-.62 0-.94-.3-.94-.93V63.33c0-1.55-.3-2.7-.88-3.44-.6-.75-1.53-1.12-2.8-1.12-2.28 0-4.56.7-6.87 2.1.03.21.05.44.05.69v16.81c0 .62-.31.93-.93.93h-2.76c-.62 0-.93-.3-.93-.93V63.33c0-1.55-.3-2.7-.89-3.44-.6-.75-1.53-1.12-2.8-1.12-2.37 0-4.64.68-6.82 2.05v17.55c0 .62-.3.93-.93.93H.93zm47.44.7c-2.21 0-3.9-.62-5.09-1.86-1.18-1.24-1.77-2.99-1.77-5.25V56.7c0-.63.3-.94.93-.94h2.75c.63 0 .94.31.94.93v14.73c0 1.67.32 2.9.98 3.69.65.79 1.7 1.18 3.13 1.18 2.24 0 4.5-.74 6.77-2.23V56.68c0-.62.3-.93.93-.93h2.75c.63 0 .94.31.94.93v21.7c0 .61-.31.92-.94.92h-2c-.31 0-.56-.06-.73-.18-.17-.13-.28-.36-.35-.7l-.32-1.62c-2.9 2.13-5.87 3.2-8.92 3.2zm26.52 0c-2.62 0-4.97-.43-7.05-1.3a1.83 1.83 0 0 1-.77-.51c-.14-.19-.21-.48-.21-.88V76c0-.56.18-.84.56-.84.22 0 .6.1 1.16.28 2.06.65 4.2.97 6.4.97 1.53 0 2.69-.3 3.48-.88.8-.59 1.19-1.44 1.19-2.55a2.4 2.4 0 0 0-.72-1.82 7.83 7.83 0 0 0-2.64-1.39l-3.97-1.48c-3.46-1.27-5.18-3.44-5.18-6.5 0-2.02.78-3.65 2.36-4.88 1.57-1.24 3.63-1.86 6.18-1.86a17 17 0 0 1 5.93 1.07c.37.12.64.28.8.48.15.2.23.5.23.9v1.26c0 .56-.2.84-.6.84a4.2 4.2 0 0 1-1.08-.23c-1.65-.5-3.33-.75-5.05-.75-2.98 0-4.48 1.01-4.48 3.02 0 .8.25 1.44.75 1.9.5.47 1.48.98 2.94 1.54l3.64 1.4c1.84.7 3.16 1.55 3.97 2.53.81.97 1.21 2.23 1.21 3.78 0 2.2-.82 3.95-2.47 5.25-1.65 1.3-3.84 1.95-6.58 1.95zm14.94-.7c-.62 0-.94-.3-.94-.93V56.68c0-.62.32-.93.94-.93h2.75c.62 0 .94.31.94.93v21.7c0 .61-.32.92-.94.92h-2.75zm1.4-27.73c-.9 0-1.61-.25-2.13-.76a2.72 2.72 0 0 1-.77-2.02c0-.84.26-1.51.77-2.02a2.88 2.88 0 0 1 2.13-.77c.9 0 1.6.26 2.12.77.52.5.77 1.18.77 2.02 0 .83-.25 1.5-.77 2.02-.51.5-1.22.76-2.12.76zm19.51 28.24c-3.67 0-6.48-1.04-8.42-3.13-1.95-2.1-2.92-5.12-2.92-9.08 0-3.93 1-6.98 3.01-9.13 2-2.15 4.85-3.23 8.52-3.23 1.68 0 3.33.3 4.95.89.34.12.58.27.72.46s.21.5.21.93v1.25c0 .62-.2.93-.6.93-.16 0-.4-.04-.75-.14a13.8 13.8 0 0 0-3.88-.55c-2.61 0-4.5.65-5.65 1.97-1.15 1.32-1.72 3.41-1.72 6.3v.6c0 2.81.58 4.88 1.75 6.2 1.17 1.31 3.01 1.97 5.53 1.97 1.3 0 2.7-.21 4.2-.65.35-.1.58-.14.7-.14.4 0 .61.31.61.93v1.26c0 .4-.06.7-.19.88-.12.18-.37.35-.74.5-1.53.66-3.3.98-5.33.98z"
                  ></path>
                </g>
              </svg>
            </a>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

Podcast.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Podcast;
