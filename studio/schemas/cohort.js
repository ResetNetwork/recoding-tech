export default {
  type: 'document',
  name: 'cohort',
  title: 'Fellowship Cohort',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'The title of the page.',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'image',
      name: 'hero_image',
      title: 'Hero Image',
      description: 'The image shown in the page hero.',
      validation: null,
    },
    {
      type: 'array',
      name: 'body',
      title: 'Description',
      validation: null,
      of: [
        {
          type: 'section_block',
        },
      ],
    },
    {
      title: 'Authors',
      name: 'authors',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'author' },
        },
      ],
    },
    {
      type: 'stackbit_page_meta',
      name: 'seo',
      title: 'Seo',
      validation: null,
    },
    {
      type: 'string',
      name: 'stackbit_url_path',
      title: 'URL Path',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and post page would be "posts/new-post/"',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'stackbit_dir',
      title: 'Directory',
      description: 'The directory path where this file is stored',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['content/pages'],
      },
    },
    {
      type: 'string',
      name: 'stackbit_model_type',
      title: 'Stackbit Model Type',
      description: 'Stackbit model type',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['page'],
      },
    },
  ],
  preview: {
    select: {
      title: 'stackbit_url_path',
    },
  },
}
