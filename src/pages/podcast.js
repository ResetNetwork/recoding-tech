/* eslint-disable */
import client from "../utils/sanityClient";

import { podcast } from "../layouts";

export async function getStaticProps() {
  const [config] = await client.fetch(`*[_type == "config"]{title,favicon,header{topics[]->{displayName, slug}, series[]->{displayName, slug}},footer}`);
  const [page] = await client.fetch(
    `*[!(_id in path("drafts.**")) && _type == "advanced" && (slug.current == "podcast" || stackbit_url_path == "/podcast")]{
      _id, title, sections
    }`
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
