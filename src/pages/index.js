/* eslint-disable */
import React from "react";
import client from "../utils/sanityClient";

import { advanced } from "../layouts";

export async function getStaticProps() {
  console.log("index.js getStaticProps, /");
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);
  const topics = await client.fetch(
    `*[_type == "topic" && stackbit_model_type == "page"]{ displayName, link, slug, type }`
  );
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/"]{_id, _type, _createdAt, trackerText, title, sections[]{type, alsoFeatured[]->{title, author, category, date, type, slug, stackbit_model_type}}}`
  );
  const [featured] = await client.fetch(
    `*[_type == "featured_posts" && title == "Homepage"] { posts[]->{_id, title, author, body, badge, date, featuredImage, category, date, type, slug, stackbit_model_type} }`
  );
  const articles = await client.fetch(
    `*[!(_id in path("drafts.**")) && !references("a4e6c730-0baf-4eeb-ad92-c5c98beeb085") && _type=="post"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...20]`
  )
  const fellows = await client.fetch(
    `*[!(_id in path("drafts.**")) && references("55470b1d-a236-491c-b158-c2ba680dfd63")]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...4]`
  )
  return {
    props: { path: "/", page, data: { config, topics }, featured: featured.posts, articles, fellows },
    revalidate: 60,
  };
}

export default advanced;
