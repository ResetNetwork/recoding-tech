/* eslint-disable */
import React, { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { FileBlock } from "./FileBlock";
import { IframeEmbedBlock } from "./IframeEmbedBlock";
import { CustomHtmlBlock } from "./CustomHtmlBlock";
import { ImageBlock } from "./ImageBlock";
import { ReferenceBlock } from "./ReferenceBlock";
import { CustomTable } from "./CustomTable";

import slugify from "slugify";

const slug = (heading) => {
  let slug = ''

  if (typeof heading === 'string') {
    slug = slugify(heading, {
      remove: /[*+~.()'"!:@?/]/g,
    })
  }

  if (typeof heading === 'object' && heading.props && heading.props.text) {
    slug = slugify(heading.props.text, {
      remove: /[*+~.()'"!:@?/]/g,
    })
  }

  return slug
}

const components = {
  types: {
    reference: ReferenceBlock,
    iframeEmbed: IframeEmbedBlock,
    customHtml: CustomHtmlBlock,
    Image: ImageBlock,
    PDF: FileBlock,
    File: FileBlock,
    table: CustomTable
  },
  marks: {
    left: ({children}) => <span style={{ textAlign: 'left', width: '100%', display: 'inline-block' }}>{children}</span>,
    center: ({children}) => <span style={{ textAlign: 'center', width: '100%', display: 'inline-block' }}>{children}</span>,
    right: ({children}) => <span style={{ textAlign: 'right', width: '100%', display: 'inline-block' }}>{children}</span>,
    link: ({ value, children }) => {
      const { href } = value
      return <a href={href} target="_blank" rel="noopener">{children}</a>
    }
  },
  block: {
    h1: ({ children }) => <h1 id={slug(children[0])}>{children}</h1>,
    h2: ({ children }) => <h2 id={slug(children[0])}>{children}</h2>
  }
};
export const CustomPortableText = ({ value }) => {
  return <PortableText value={value} components={components} />;
};