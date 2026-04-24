export default {
  type: 'object',
  name: 'homepage_section_light',
  title: 'Homepage Section Light',
  fields: [
    {
      type: 'string',
      name: 'title',
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
