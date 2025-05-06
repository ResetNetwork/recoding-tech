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
  ],
}
