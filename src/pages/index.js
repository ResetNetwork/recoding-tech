/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("index.js getStaticProps, /");
  const [config] = await client.fetch(`*[_type == "config"]`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/"]{_id, _type, _createdAt, trackerText, title, sections[]{type, alsoFeatured[]->{title, author, category, date, type, slug, stackbit_model_type}}}`
  );
  const [featured] = await client.fetch(
    `*[_type == "featured_posts" && title == "Homepage"] { posts[]->{_id, title, author, badge, date, featuredImage, category, date, type, slug, stackbit_model_type} }`
  );
  const articles = await client.fetch(
    `*[!(_id in path("drafts.**")) && !references("a4e6c730-0baf-4eeb-ad92-c5c98beeb085") && _type=="post"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...15]`
  )
  const fellows = await client.fetch(
    `*[!(_id in path("drafts.**")) && references("6fe4e72c-3d0a-4ec5-a71e-ad8633edccc5")]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...1]`
  )
  return {
    props: { path: "/", page, data: { config, topics }, featured: featured.posts, articles, fellows },
    revalidate: 60,
  };
}

export default advanced;
