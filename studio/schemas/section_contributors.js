export default {
  type: 'object',
  name: 'section_contributors',
  title: 'Contributors Section',
  fields: [
    {
      type: 'string',
      name: 'type',
      title: 'Object Type',
      description: 'The type of the object',
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ['section_contributors']
      }
    },
    {
      type: 'string',
      name: 'stackbit_model_type',
      title: 'Stackbit Model Type',
      description: 'Stackbit model type',
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ['object']
      }
    }
  ]
}
