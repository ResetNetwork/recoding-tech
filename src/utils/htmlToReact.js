import React from "react";
import ReactHtmlParser, {
  convertNodeToReactElement,
} from "@hedgedoc/html-to-react";
import ScriptTag from "next/script";
// import { useRouter } from "next/router";
// import NextLink from "next/link";
import Link from "./link";
import slugify from "slugify";
import _ from "lodash";
import DOMPurify from "isomorphic-dompurify";

import Image from "next/image";

import { getFile } from "@sanity/asset-utils";
import client from "./sanityClient";

// MUI components
import Box from "@mui/material/Box";
// import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

// custom components
import FancyCard from "../components/FancyCard";
import urlFor from "./imageBuilder";

const convertChildren = (children, index) =>
  _.map(children, (childNode) =>
    convertNodeToReactElement(childNode, index, _.noop())
  );

export default function htmlToReact(html) {
  if (!html) {
    return null;
  }
  // const router = useRouter();

  return ReactHtmlParser(html, {
    transform: (node, index) => {
      /** the next two if statements ensure the Table of Contents section in the articles work */
      if (!node.type) {
        return null;
      }

      if (node.name === "h4" && node.children[0] && node.children[0].data) {
        let slug = `${slugify(node.children[0].data.toLowerCase(), {
          remove: /[*+~.()'"!:@?/]/g,
        })}`;
        return <h4 id={slug}>{node.children[0].data}</h4>;
      }

      if (node.name === "ol" && node.children && node.children.length) {
        node.children.map((child, idx) => {
          return <ListItem key={idx} />;
        });
      }

      // if (node.name === "ol") {
      //   console.log("ol ol ->", node.children);
      //   return (
      //     <List>
      //       {node.children && node.children.length
      //         ? node.children.map((child, index) => {
      //             if (child.name === "li") {
      //               let slug = "";
      //               let data;

      //               if (!child.children[0].children) {
      //                 slug = "/";
      //               } else if (child.children[0].children[0].children) {
      //                 if (child.children[0].children[0].children[0].children) {
      //                   data =
      //                     child.children[0].children[0].children[0].children[0]
      //                       .data;
      //                   slug = `#${slugify(data.toLowerCase(), {
      //                     remove: /[*+~.()'"!:@?/]/g,
      //                   })}`;
      //                 } else {
      //                   data = child.children[0].children[0].children[0].data;
      //                   slug = `#${slugify(data.toLowerCase(), {
      //                     remove: /[*+~.()'"!:@?/]/g,
      //                   })}`;
      //                 }
      //               } else {
      //                 data = child.children[0].children[0].data;
      //                 slug = `#${slugify(data.toLowerCase(), {
      //                   remove: /[*+~.()'"!:@?/]/g,
      //                 })}`;
      //               }
      //               return (
      //                 <ListItem
      //                   key={index}
      //                   sx={{ marginLeft: 0, paddingLeft: 0 }}
      //                 >
      //                   <NextLink
      //                     href={`${router.asPath.split("#")[0]}${slug}`}
      //                     scroll={false}
      //                   >
      //                     <Typography
      //                       component="span"
      //                       style={{
      //                         cursor: "pointer",
      //                         fontFamily: "'Lexend', sans-serif",
      //                       }}
      //                     >
      //                       {child.data}
      //                     </Typography>
      //                   </NextLink>
      //                 </ListItem>
      //               );
      //             }
      //           })
      //         : null}
      //     </List>
      //   );
      // }

      if (node.name === "blockquote" && node.children && node.children.length) {
        return (
          <Box p={4} sx={{ border: "1px solid #000" }}>
            {node.children.map((child, idx) => {
              return (
                <Typography key={idx} component="div" variant="quote">
                  {child.data ? child.data : ""}
                </Typography>
              );
            })}
          </Box>
        );
      }

      if (node.name === "img") {
        const src = node.attribs.src ? urlFor(node.attribs.src).url() : "";
        return <Image src={src} height={576} width={1024} alt="" />;
      }

      if (node.name === "figcaption") {
        const data = node.children[0].data;
        const clean = DOMPurify.sanitize(data);
        return (
          <Typography
            component="span"
            dangerouslySetInnerHTML={{ __html: clean }}
            style={{
              color: "#7C7B7B",
              cursor: "pointer",
              fontFamily: "'Lexend', sans-serif",
            }}
          />
        );
      }

      if (node.name === "object") {
        let file;
        let url;
        if (node.attribs && node.attribs.data) {
          file = getFile(node.attribs.data, client.config()); // gets a file asset object from Sanity
          if (file.asset && file.asset.url) url = file.asset.url;
        }
        return (
          <object
            data={url ? url : ""}
            style={{ width: "100%", height: "800px" }}
          ></object>
        );
      }

      if (node.attribs && node.attribs.class == "citation") {
        return <FancyCard citationToFetch={node.data} />;
      }
      if (node.data)
        if (node.type === "script") {
          if (!_.isEmpty(node.children)) {
            return (
              <ScriptTag key={index} {...node.attribs}>
                {convertChildren(node.children, index)}
              </ScriptTag>
            );
          } else {
            return <ScriptTag key={index} {...node.attribs} />;
          }
        } else if (node.type === "tag" && node.name === "a") {
          const href = node.attribs.href;
          const props = _.omit(node.attribs, "href");
          // use Link only if there are no custom attributes like style, class, and what's not that might break react
          if (_.isEmpty(props)) {
            return (
              <Link key={index} href={href} {...props}>
                {convertChildren(node.children, index)}
              </Link>
            );
          }
        }
    },
  });
}
