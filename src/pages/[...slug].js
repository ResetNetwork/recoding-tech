/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { post } from "../layouts";

export async function getStaticPaths() {
  console.log("Page [...slug].js getStaticPaths");
  const slugs = await client.fetch(`*[_type == "post"]{ slug }`);
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
  console.log("Page [post ...slug].js getStaticProps, slug: ", slug);
  const [config] = await client.fetch(`*[_type == "config"]`);
  const [topics] = await client.fetch(
    `*[_type == "topic"]{ displayTitle, link, slug, type }`,
  );
  const [page] = await client.fetch(
    `*[_type == "post" && slug.current == "${slug}"]{_id, _createdAt, slug, title, body, toc, authors[]->{slug, name, photo, bio}, relatedTopics[]->{displayTitle, name, type, slug, stackbit_model_type}, relatedCommentary[]->}`,
  );
  return {
    props: {
      page,
      path: `/tracker/${page.slug.current ? page.slug.current : page.slug}`,
      data: { config, topics },
    },
  };
}

export default post;
