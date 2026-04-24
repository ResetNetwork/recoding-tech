/* eslint-disable */
import React from "react";
import client from "../../utils/sanityClient";

import { topic } from "../../layouts";

export async function getStaticPaths() {
  console.log("Page category/[...slug].js getStaticPaths");
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const slugs = await client.fetch(`*[_type == "topic"]{ slug }`);
  const paths = slugs.map((path) => ({
    params: { slug: [path.slug.current] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join();
  console.log("Page category/[...slug].js getStaticProps, slug: ", slug);
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "topic" && slug.current == "${slug}"]{_id, _type, _createdAt, _updatedAt, _type, slug, name, displayName, description, domain, stackbit_model_type, topicType, heroBackground, showLogos, partnerLogos, showNewsletterSignup}`
  );
  const relatedPostsQuery = `*[_type == "post" && references("${page._id}") && !(_id in path("drafts.**")) ]{_id, slug, authors[]->{name}, date, ref, title, badge, featuredImage }|order(date desc)[0...14]`;

  const headlines = await client.fetch(relatedPostsQuery);

  return {
    props: {
      page,
      headlines,
      path: `/topic/${page.slug.current ? page.slug.current : page.slug}`,
      data: { config, topics },
    },
    revalidate: 60,
  };
}

export default topic;
