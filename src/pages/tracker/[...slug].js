/* eslint-disable */
import React from "react";
import client from "../../utils/sanityClient";

import { policy_action } from "../../layouts";

export async function getStaticPaths() {
  console.log("Page tracker/[...slug].js getStaticPaths");
  const slugs = await client.fetch(`*[_type == "policy_action"]{ slug }`);
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
  console.log("Page tracker/[...slug].js getStaticProps, slug: ", slug);
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "policy_action" && slug.current == "${slug}"]{_id, _createdAt, _updatedAt, slug, title, displaytitle, name, type, dateInitiated, lastUpdate, country, status, summary, stackbit_model_type, relatedCitations[]->, relatedCommentary[]->}`,
  );
  return {
    props: {
      page,
      path: `/tracker/${page.slug.current ? page.slug.current : page.slug}`,
      data: { config, topics },
    },
  };
}

export default policy_action;
