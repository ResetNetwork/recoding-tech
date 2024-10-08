/* eslint-disable */
import React from "react";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import DOMPurify from "isomorphic-dompurify";
import imageBuilder from "../../utils/imageBuilder";
import { PortableText } from "@portabletext/react";

export const ImageBlock = ({ value }) => {
  const { width, height } = getImageDimensions(value);
  let htmlCaption;
  if (value.wordpressCaption) {
    htmlCaption = DOMPurify.sanitize(value.wordpressCaption, {
      USE_PROFILES: { html: true },
    });
  }
  if (!value.asset) console.log("***No asset for ImageBlock value***:", value);
  return (
    <div style={{
      position: "relative",
      width: "100%"
    }}>
      <figure>
        {value.asset && (
          <Image
            src={imageBuilder(value).url()}
            alt={value.alt || " "}
            loading="lazy"
            // layout="fill"
            height={576}
            width={1024}
            style={{
              aspectRatio: width / height,
            }}
            layout="responsive"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {htmlCaption ? (
          <figcaption>
            <Typography
              component="div"
              className="html-to-react-caption"
              style={{
                color: "#7C7B7B",
                // cursor: "pointer",
                // fontFamily: "'Lexend', sans-serif",
                // textAlign: "center",
              }}
              dangerouslySetInnerHTML={{ __html: htmlCaption }}
            />
          </figcaption>
        ) : null}
        {
          value.caption ? (
            <figcaption>
              <Typography component="div" style={{ color: "#7C7B7B" }} className="html-to-react-caption">
                <PortableText value={value.caption} />
              </Typography>
            </figcaption>) : null
        }
        {/* {value.caption ? (
            <Typography
              // className="image-caption"
              style={{
                color: "#7C7B7B",
                cursor: "pointer",
                fontFamily: "'Lexend', sans-serif",
                textAlign: "center",
              }}
            > 
                <PortableText value={value.caption} />
            </Typography>      
        ) : null} */}
      </figure>
    </div>
  );
};
