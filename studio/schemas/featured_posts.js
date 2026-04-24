export default {
  type: 'document',
  name: 'featured_posts',
  title: 'Featured posts',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'array',
      name: 'posts',
      title: 'Featured posts',
      of: [
        {
          title: 'Posts',
          type: 'reference',
          to: [{type: 'post'}],
          options: {
            disableNew: true,
          },
        },
      ],
    },
    {
      type: 'homepage_section',
      name: 'first_spotlight',
      title: 'First spotlight section',
    },
    {
      type: 'homepage_section_light',
      name: 'second_spotlight',
      title: 'Second spotlight section',
    },
    {
      type: 'homepage_section',
      name: 'third_spotlight',
      title: 'Third spotlight section',
    },
  ],
}
