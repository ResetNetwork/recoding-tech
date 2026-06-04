/* eslint-disable */
import client from "../utils/sanityClient";

import { donate } from "../layouts";

export async function getStaticProps(props) {
  const { params } = props
  console.log("Page /[...slug].js getStaticProps, slug: ", params);
  const slug = "donate";
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page" && !(_id in path("drafts.**"))]{ displayName, _id, slug } | order(displayName asc)`
  );

  let [page] = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type in ["advanced", "page", "post"] && (slug.current == "${slug}" || stackbit_url_path == "/${slug}")]{_id, _type, img_path, stackbit_url_path, trackerText, _createdAt, _updatedAt, badge, date, slug, title, description, faq, body, toc, tocTitle, featuredImage, seo, disableNewsletterSignup, authors[]->{slug, name, photo, bio}, heroContent, layout, sections, sidebar_content[type == "sidebar_about"]{staff[]->, board[]->, masthead[]->}, relatedTopics[]->{_id, displayName, name, topicType, slug, stackbit_model_type}, relatedArticles[]->{date,badge,title,slug,authors[]->{firstName, lastName}},relatedCommentary[]->}`
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
    revalidate: 60,
  };
}

export default donate;
