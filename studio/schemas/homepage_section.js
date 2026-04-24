export default {
  type: 'object',
  name: 'homepage_section',
  title: 'Homepage Section',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      name: 'description',
      title: 'Description',
      validation: null,
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      title: 'Hero background image',
      name: 'heroBackground',
      type: 'image',
    },
    {
      title: 'Partner logos',
      name: 'partnerLogos',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
      description: 'Shown when "Show partner logos" is on.',
    },
    {
      name: 'topic',
      title: 'Featured topic',
      type: 'reference',
      to: {type: 'topic'},
      options: {
        disableNew: true,
      },
    },
  ],
}
