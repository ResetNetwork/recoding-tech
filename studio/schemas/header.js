export default {
  type: "object",
  name: "header",
  title: "Header Configuration",
  fields: [
    {
      title: "Topics",
      type: "array",
      name: "topics",
      of: [
        {
          type: 'reference',
          to: [{type: 'topic'}],
          // options: { filter: 'topicType == "topic"' }
        },
      ],
    },
    {
      title: "Series",
      type: "array",
      name: "series",
      of: [
        {
          type: 'reference',
          to: [{type: 'topic'}],
          options: { filter: 'topicType == "series"' }
        },
      ],
    },
    {
      type: "array",
      name: "topicsLinks",
      title: "Topics Links",
      description: "List of links nested under Topics in the header.",
      validation: null,
      of: [
        {
          type: "action"
        }
      ],
      hidden: true
    },
    {
      type: "array",
      name: "projectsLinks",
      title: "Projects  Links",
      description: "List of links nested under Projects in the header.",
      validation: null,
      of: [
        {
          type: "action"
        }
      ],
      hidden: true
    },
    {
      type: "string",
      name: "type",
      title: "Object Type",
      description: "The type of the object",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["header"]
      }
    },
    {
      type: "string",
      name: "stackbit_model_type",
      title: "Stackbit Model Type",
      description: "Stackbit model type",
      hidden: false,
      validation: Rule => Rule.required(),
      options: {
        list: ["object"]
      }
    }
  ],
  preview: {
    select: {
      title: "title"
    }
  }
};
