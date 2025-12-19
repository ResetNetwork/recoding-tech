/* eslint-disable */
import client from "../../utils/sanityClient";

import { meta } from "../../layouts";

export async function getServerSideProps({ params }) {
  console.log("Page /preview/[...slug].js getServerSideProps, slug: ", params);
  const slug = params.slug.join();
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page" && (_id in path("drafts.**"))]{ displayName, _id, slug } | order(displayName asc)`
  );

  let [page] = await client.fetch(
    `*[_type in ["advanced", "page", "post"] && _id == "drafts.${slug}"]{_id, _type, stackbit_url_path, trackerText, _createdAt, _updatedAt, badge, date, slug, title, body, toc, tocTitle, featuredImage, seo, disableNewsletterSignup, authors[]->{slug, name, photo, bio}, heroContent, layout, sections, sidebar_content[type == "sidebar_about"]{staff[]->, board[]->, masthead[]->}, relatedTopics[]->{displayName, name, type, slug, stackbit_model_type}, relatedArticles[]->{date,badge,title,slug,authors[]->{firstName, lastName}},relatedCommentary[]->}`
  );

  let path;

  if (page && page.stackbit_url_path) {
    path = page.stackbit_url_path.split("/")[1];
  }

  if (page && page.slug && page.slug.current) {
    path = page.slug.current;
  }

  if (page && page.slug && !page.slug.current) {
    path = page.slug;
  }

  let authors = [];

  let articles = [];

  return {
    props: {
      page: page ? page : null,
      articles: articles.length ? articles : null,
      _type: page ? page._type : null,
      authors: authors.length ? authors : null,
      path: path,
      data: { config, topics },
    },
  };
}

const PreviewPage = (props) => {
  const extraHead = (
    <>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
  return meta({ ...props, extraHead });
};

export default PreviewPage;
