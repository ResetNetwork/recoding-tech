export default {
  type: 'object',
  name: 'section_fellowship_cohort',
  title: 'Fellowship Cohort',
  preview: {
    prepare() {
      return {
        title: 'section_fellowship_cohort',
      }
    },
  },
  fields: [
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title',
            },
            {
              type: 'string',
              name: 'link',
              title: 'Link',
            },
          ],
        },
      ],
    },
    {
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      defaultValue: 'section_fellowship_cohort',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['section_fellowship_cohort'],
      },
    },
  ],
}
  