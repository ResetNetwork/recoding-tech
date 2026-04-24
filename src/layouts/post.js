import React from "react";
import { DateTime } from "luxon";
// import { useRouter } from "next/router";
import Image from "next/image";
import PropTypes from "prop-types";
// import _ from "lodash";
import { toPlainText } from "@portabletext/react";
import urlFor from "../utils/imageBuilder";
import { CustomPortableText } from "../components/PortableText";

// utils
// import { markdownify } from "../utils";
import slugify from "slugify";

// material ui imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/Article/RelatedCommentary";
import RelatedTopics from "../components/Article/RelatedTopics";
import RelatedArticles from "../components/Article/RelatedArticles";
import RecentArticles from "../components/Article/RecentArticles";
import Series from "../components/Article/Series";
import ShareButtons from "../components/Article/ShareButtons";
import Badge from "../components/Badge";

// table of contents
import { PortableText } from "@portabletext/react";
import { ImageBlock } from "../components/PortableText/ImageBlock";
import NewsletterSubscribe from "../components/NewsletterSubscribe";

const slug = (heading) => {
  let slug = "";

  if (typeof heading === "string") {
    slug = `#${slugify(heading, {
      remove: /[*+~.()'"!:@?/]/g,
    })}`;
  }

  if (typeof heading === "object" && heading.props && heading.props.text) {
    slug = `#${slugify(heading.props.text, {
      remove: /[*+~.()'"!:@?/]/g,
    })}`;
  }

  return slug;
};

const ToCserializer = {
  block: {
    h1: ({ children }) => (
      <Grid item xs={12} sm={6} md={6} mt={0} mb={2}>
        <Typography component="div" marginLeft={1} variant="tocText">
          <Link
            href={slug(children[0])}
            sex={{
              textDecoration: "underline",
            }}
          >
            {children}
          </Link>
        </Typography>
      </Grid>
    ),
    h2: ({ children }) => (
      <Grid item xs={12} sm={6} md={6} mt={0} mb={2}>
        <Typography component="div" marginLeft={1} variant="tocText">
          <Link
            href={slug(children[0])}
            sex={{
              textDecoration: "underline",
            }}
          >
            {children}
          </Link>
        </Typography>
      </Grid>
    ),
    // ignore other block types
    h3: () => null,
    h4: () => null,
    image: () => null,
    iframeEmbed: () => null,
    file: () => null,
    normal: () => null,
    blockquote: () => null,
  },
  list: {
    bullet: () => null,
    number: () => null,
  },
};

const isEmptyNormalBlock = (block) =>
  block &&
  block._type === "block" &&
  !block.listItem &&
  (block.style === "normal" || !block.style) &&
  toPlainText(block).trim() === "";

const splitHeroFromBody = (body, hasFeaturedImage) => {
  if (!Array.isArray(body) || body.length === 0) {
    return { heroBlocks: [], contentBlocks: body || [] };
  }
  if (hasFeaturedImage) {
    return { heroBlocks: [], contentBlocks: body };
  }
  let i = 0;
  while (i < body.length && isEmptyNormalBlock(body[i])) {
    i += 1;
  }
  if (i >= body.length || body[i]._type !== "Image") {
    return { heroBlocks: [], contentBlocks: body };
  }
  const heroEnd = i + 1;
  const heroBlocks = body.slice(0, heroEnd);
  const contentBlocks = body.slice(heroEnd);
  return { heroBlocks, contentBlocks };
};

const Post = (props) => {
  // const router = useRouter();
  const { page } = props;
  const isTOC = page.toc && Array.isArray(page.toc) && page.toc.length > 0;

  const { heroBlocks, contentBlocks } = splitHeroFromBody(
    page.body,
    page.featuredImage && isTOC
  );

  let body1 = null;
  let body2 = null;

  if (contentBlocks && page.disableNewsletterSignup !== true) {
    // find the center of the page
    try {
      let center = Math.ceil(contentBlocks.length / 2);
      while (
        ["number", "bullet"].includes(contentBlocks[center]?.listItem) ||
        ["h2", "h3", "h4"].includes(contentBlocks[center - 1]?.style)
      ) {
        const newCenter = Math.min(center + 1, contentBlocks.length);
        if (center == newCenter) {
          break;
        }
        center = newCenter;
      }
      body1 = contentBlocks.slice(0, center);
      body2 = contentBlocks.slice(center);
    } catch (error) {
      // ignore
    }
  }

  return (
    <Layout {...props}>
      <Box my={4}>
        <Container sx={{ maxWidth: "1246px!important" }}>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 67.3fr) minmax(0, 32.7fr)",
              },
              columnGap: { xs: 2, md: "90px" },
              rowGap: { xs: 2, md: 0 },
            }}
          >
            <Grid container spacing={4} item direction="row">
              <Grid item sx={{ maxWidth: "100%" }}>
                {/* <Typography component="div" className="html-to-react">
                  {markdownify(_.get(props, "page.content", null))}
                </Typography> */}
                {page.badge && <Badge badge={page.badge} />}
                <Typography
                  component="h1"
                  variant="h2_article"
                  sx={{
                    borderBottom: "1px solid #dcdcdc;",
                    paddingBottom: 2,
                    fontSize: "36px",
                    lineHeight: 1.5,
                  }}
                >
                  {page.title}
                </Typography>
                {page.authors &&
                  page.authors.length &&
                  page.authors.map((auth, index) => (
                    <Typography
                      key={auth.slug.current}
                      component="span"
                      variant="body2"
                      sx={{
                        color: "#616161",
                        fontSize: 12,
                        textTransform: "uppercase",
                      }}
                    >
                      {index == page.authors.length - 1
                        ? `${auth.name} / `
                        : `${auth.name}, `}
                    </Typography>
                  ))}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "#616161",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {DateTime.fromISO(page.date)
                    .setLocale("en-us")
                    .toLocaleString(DateTime.DATE_MED)}
                </Typography>
                {/* {page.toc && (
                  // <Grid item xs={12} sm={12} mt={2}>
                  //   <Box
                  //     sx={{
                  //       p: 2,
                  //       bgcolor: "#F3F0E699",
                  //     }}
                  //   >
                  //     <Typography
                  //       component="div"
                  //       variant="h4"
                  //       sx={{
                  //         borderBottom: "1px solid #8AA29D",
                  //         marginBottom: 2,
                  //         paddingBottom: 2,
                  //       }}
                  //     >
                  //       Table of Contents
                  //     </Typography>
                  //     <Typography component="div" className="html-to-react">
                  //       {markdownify(_.get(props, "page.toc", null))}
                  //     </Typography>
                  //   </Box>
                  // </Grid>
                )} */}
                {page.featuredImage && isTOC && (
                  <Typography component="div" className="html-to-react-article">
                    <ImageBlock value={page.featuredImage} />
                  </Typography>
                )}

                {isTOC && (
                  <>
                    <Box mb={0}>
                      <Typography variant="tocTitle">
                        {page.tocTitle || "Contents"}
                      </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={1}
                      mt={2}
                      mb={2}
                      flexDirection="column"
                      maxHeight={200}
                      // maxWidth={'100%'}
                    >
                      <PortableText
                        value={page.toc}
                        components={ToCserializer}
                      />
                    </Grid>
                  </>
                )}

                {(heroBlocks.length > 0 || contentBlocks.length > 0) && (
                  <Typography component="div" className="html-to-react-article">
                    {heroBlocks.length > 0 && (
                      <>
                        <CustomPortableText value={heroBlocks} />
                        <ShareButtons
                          url={`https://www.techpolicy.press/${page.slug.current}`}
                        />
                      </>
                    )}
                    {body1 && body2 ? (
                      <>
                        <CustomPortableText value={body1} />
                        <NewsletterSubscribe />
                        <CustomPortableText value={body2} />
                      </>
                    ) : (
                      <CustomPortableText value={contentBlocks} />
                    )}
                  </Typography>
                )}

                {page.featuredImage && (
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <Link
                      href="/donate"
                      underline="none"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        display: "block",
                      }}
                    >
                      <Box
                        component="img"
                        src={urlFor(page.featuredImage).width(965).url()}
                        alt=""
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                      />
                    </Link>
                    <Box
                      aria-hidden
                      sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        pointerEvents: "none",
                        background:
                          "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 1) 100%)",
                      }}
                    />
                    <Box sx={{ position: "relative", zIndex: 2, p: "40px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifySelf: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            color: "#fff",
                            fontFamily: "Libre Baskerville",
                            fontSize: "27px",
                            fontWeight: 700,
                            lineHeight: 1.5,
                          }}
                        >
                          Support Tech Policy Press
                        </Typography>
                        <Typography
                          component="div"
                          sx={{
                            color: "#fff",
                            fontFamily: "Lexend",
                            fontSize: "14px",
                            fontWeight: 300,
                            lineHeight: 1.5,
                            marginTop: "4px",
                          }}
                        >
                          If you&apos;ve found our work helpful, consider
                          supporting us.
                        </Typography>
                        <div
                          style={{
                            display: "inline-flex",
                            justifyContent: "center",
                            marginTop: "22px",
                          }}
                        >
                          <Link
                            href="/donate"
                            sx={{
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "none",
                              },
                            }}
                          >
                            <Typography
                              component="div"
                              variant="h5"
                              sx={{
                                backgroundColor: "#df1316",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "16px",
                                fontWeight: 400,
                                paddingX: "16px",
                                paddingY: "6px",
                                boxShadow: "0px 2px 2px 0px #0000001F",
                                textTransform: "uppercase",
                                marginBottom: "30px",
                                m: 0,
                                "&:hover": {
                                  backgroundColor: "#D00",
                                },
                              }}
                            >
                              Donate
                            </Typography>
                          </Link>
                        </div>
                      </div>
                    </Box>
                  </Box>
                )}
                <Series id={page._id} topics={page.relatedTopics} />
              </Grid>
            </Grid>
            <Grid item>
              <Box marginBottom={6}>
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    fontSize: "20px",
                    textTransform: "capitalize",
                    borderBottom: "1px solid #dcdcdc",
                    paddingBottom: 1,
                    width: "100%",
                    marginBottom: "12px",
                  }}
                >
                  Authors
                </Typography>
                <Stack direction="column" spacing={4}>
                  {page.authors &&
                    page.authors.map((auth) => (
                      <Grid
                        container
                        key={auth.slug.current}
                        spacing={2}
                        item
                        xs={12}
                      >
                        <Grid
                          item
                          xs={auth.photo ? 3 : 0}
                          sx={{
                            paddingLeft: "0!important",
                            paddingRight: "0!important",
                          }}
                        >
                          {auth.photo && (
                            <Image
                              src={urlFor(auth.photo)
                                .fit("max")
                                .auto("format")
                                .url()}
                              height={80}
                              width={80}
                              alt=""
                              style={{ borderRadius: 50 }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={auth.photo ? 9 : 12}>
                          <Link
                            href={`/author/${auth.slug.current}`}
                            sx={{
                              textDecoration: "none",
                              marginBottom: "10px",
                              display: "block",
                              "&:active, &:focus, &:hover": {
                                color: "#000",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            <Typography
                              component="span"
                              variant="h4"
                              sx={{
                                color: "#000",
                                fontWeight: 400,
                                fontSize: "16px",
                              }}
                            >
                              {auth.name}
                            </Typography>
                          </Link>
                          {auth.bio && (
                            <Typography
                              color="rgba(0,0,0,0.48)"
                              component="div"
                              variant="body2"
                              sx={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: 1.5,
                              }}
                            >
                              {toPlainText(auth.bio).substring(0, 300)}
                              {toPlainText(auth.bio).length > 300 ? "..." : ""}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                </Stack>
              </Box>
              <RelatedCommentary
                title="Further Reading"
                commentary={page.relatedCommentary}
                noFilter={true}
              />
              <RelatedTopics topics={page.relatedTopics} />
              <RelatedArticles articles={page.relatedArticles} />
              <RecentArticles />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  page: PropTypes.object,
};

export default Post;
