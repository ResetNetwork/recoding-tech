/* eslint-disable */
import client from "../utils/sanityClient";

import { podcast } from "../layouts";

export async function getStaticProps() {
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);
  const [page] = await client.fetch(
    `*[_type == "advanced" && stackbit_url_path == "/"]{_id, _type, _createdAt, trackerText, title, sections[]{type, alsoFeatured[]->{title, author, category, date, type, slug, stackbit_model_type}}}`
  );
  const newsletters = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type == "post" && badge == "podcast"]{ _id, title, slug, featuredImage, date, badge } | order(date desc)[0...3]`
  );

  return {
    props: { path: "/", page, data: { config, newsletters }, },
    revalidate: 60,
  };
}


export default podcast;
