/* eslint-disable */
import client from "../utils/sanityClient";

import { newsletter } from "../layouts";

export async function getStaticProps(props) {
  const { params } = props
  console.log("Page /[...slug].js getStaticProps, slug: ", params);
  const slug = "newsletter";
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);

  let [page] = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type in ["advanced", "page", "post"] && (slug.current == "${slug}" || stackbit_url_path == "/${slug}")]{_id, _type, stackbit_url_path, trackerText, _createdAt, _updatedAt, badge, date, slug, title, body, toc, tocTitle, featuredImage, seo, disableNewsletterSignup, authors[]->{slug, name, photo, bio}, heroContent, layout, sections, sidebar_content[type == "sidebar_about"]{staff[]->, board[]->, masthead[]->}, relatedTopics[]->{_id, displayName, name, topicType, slug, stackbit_model_type}, relatedArticles[]->{date,badge,title,slug,authors[]->{firstName, lastName}},relatedCommentary[]->}`
  );

  const query = `*[!(_id in path("drafts.**")) && _type == "post" && badge == "newsletter"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...9]`;
  const articles = await client.fetch(query);

  return {
    props: {
      page: page ? page : null,
      _type: page ? page._type : null,
      data: { config, articles },
    },
    revalidate: 60,
  };
}

export default newsletter;
