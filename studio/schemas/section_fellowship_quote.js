export default {
  type: 'object',
  name: 'section_fellowship_quote',
  title: 'Fellowship Stats Quote',
  preview: {
    prepare() {
      return {
        title: 'section_fellowship_quote',
      }
    },
  },
  fields: [
    {
      type: 'image',
      name: 'avatar',
      title: 'Avatar',
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
      ],
    },
    {
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      defaultValue: 'section_fellowship_quote',
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ['section_fellowship_quote'],
      },
    },
  ],
}
  