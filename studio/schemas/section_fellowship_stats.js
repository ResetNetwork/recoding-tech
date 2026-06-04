export default {
  type: 'object',
  name: 'section_fellowship_stats',
  title: 'Fellowship Stats Section',
  preview: {
    prepare() {
      return {
        title: 'section_fellowship_stats',
      }
    },
  },
  fields: [
    {
      type: 'array',
      name: 'stats',
      title: 'Stats',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            {
              type: 'string',
              name: 'label',
              title: 'Label',
            },
            {
              type: 'string',
              name: 'value',
              title: 'Value',
            },
          ],
        },
      ],
    },
    {
      type: 'string',
      name: 'note',
      title: 'Note',
    },
    {
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      defaultValue: 'section_fellowship_stats',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['section_fellowship_stats'],
      },
    },
  ],
}
  