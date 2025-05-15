import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

// material ui imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// utils
import { urlFor } from "../utils";

const Sidebar = (props) => {
  const { content } = props;

  return (
    <section>
      <Container>
        <>
          <Typography
            component="h2"
            variant="h4"
            borderBottom="1px solid #000"
            paddingBottom={2}
            fontSize={"20px"}
          >
            Staff
          </Typography>
          {content[0].staff &&
            content[0].staff.length &&
            content[0].staff.map((author) => (
              <Box
                key={author.slug.current}
                marginBottom={2}
                sx={{ display: "flex", gap: "8px" }}
              >
                {author.photo && (
                  <Box>
                    <Image
                      src={urlFor(author.photo).url()}
                      height={80}
                      width={80}
                      alt=""
                      style={{ borderRadius: 50 }}
                    />
                  </Box>
                )}
                <Box paddingTop={"14px"}>
                  <Link
                    href={`/author/${author.slug.current}`}
                    sx={{
                      textDecoration: "none",
                      "&:active, &:focus, &:hover": {
                        color: "#000",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      variant="h4"
                      sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
                    >
                      {author.name}
                    </Typography>
                  </Link>
                  {author.specialTitle && (
                    <Typography
                      color="#A7A7A7"
                      component="div"
                      variant="body2"
                      paddingTop={1}
                      sx={{ fontSize: "1rem", fontWeight: 400 }}
                    >
                      {author.specialTitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          <Typography
            component="h2"
            variant="h4"
            borderBottom="1px solid #000"
            paddingBottom={2}
            paddingTop={"24px"}
            fontSize={"20px"}
          >
            Board of directors
          </Typography>
          {content[0].board &&
            content[0].board.length &&
            content[0].board.map((author) => (
              <Box
                key={author.slug.current}
                marginBottom={2}
                sx={{ display: "flex", gap: "8px" }}
              >
                {author.photo && (
                  <Box>
                    <Image
                      src={urlFor(author.photo).url()}
                      height={80}
                      width={80}
                      alt=""
                      style={{ borderRadius: 50 }}
                    />
                  </Box>
                )}
                <Box paddingTop={"14px"}>
                  <Link
                    href={`/author/${author.slug.current}`}
                    sx={{
                      textDecoration: "none",
                      "&:active, &:focus, &:hover": {
                        color: "#000",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      variant="h4"
                      sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
                    >
                      {author.name}
                    </Typography>
                  </Link>
                  {author.specialTitle && (
                    <Typography
                      color="#A7A7A7"
                      component="div"
                      variant="body2"
                      paddingTop={1}
                      sx={{ fontSize: "1rem", fontWeight: 400 }}
                    >
                      {author.specialTitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          <Typography
            component="h2"
            variant="h4"
            borderBottom="1px solid #000"
            paddingBottom={2}
            paddingTop={"24px"}
            fontSize={"20px"}
          >
            Fellows
          </Typography>
          {content[0].masthead &&
            content[0].masthead.length &&
            content[0].masthead.map((author) => (
              <Box
                key={author.slug.current}
                marginBottom={2}
                sx={{ display: "flex", gap: "8px" }}
              >
                {author.photo && (
                  <Box>
                    <Image
                      src={urlFor(author.photo).url()}
                      height={80}
                      width={80}
                      alt=""
                      style={{ borderRadius: 50 }}
                    />
                  </Box>
                )}
                <Box paddingTop={"14px"}>
                  <Link
                    href={`/author/${author.slug.current}`}
                    sx={{
                      textDecoration: "none",
                      "&:active, &:focus, &:hover": {
                        color: "#000",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      variant="h4"
                      sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 400 }}
                    >
                      {author.name}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            ))}
        </>
      </Container>
    </section>
  );
};

Sidebar.propTypes = {
  content: PropTypes.array,
};

export default Sidebar;
