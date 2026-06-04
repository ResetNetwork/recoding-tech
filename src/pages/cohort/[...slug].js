/* eslint-disable */
import React from "react";
import client from "../../utils/sanityClient";

import { cohort } from "../../layouts";

export async function getStaticPaths() {
  console.log("Page cohort/[...slug].js getStaticPaths");
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const slugs = await client.fetch(`*[_type == "cohort"]{ stackbit_url_path }`);
  const paths = slugs.map((path) => ({
    params: { slug: [path.stackbit_url_path.split("/")[1]] },
  }));

  console.log("Paths: ", paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join();
  console.log("Page cohort/[...slug].js getStaticProps, slug: ", slug);
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);
  const [page] = await client.fetch(
    `*[_type == "cohort" && stackbit_url_path == "/cohort/${slug}"]{_id, _type, _createdAt, _updatedAt, _type, title, body, authors[]->{slug, name, photo, bio}, hero_image}`
  );

  return {
    props: {
      page,
      path: 'cohort/' + slug,
      data: { config },
    },
    revalidate: 60,
  };
}

export default cohort;
