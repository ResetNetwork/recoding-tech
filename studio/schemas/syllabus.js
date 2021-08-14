// need to figure out the subheading field type

export default {
  type: "document",
  name: "syllabus",
  title: "Syllabus",
  fields: [
    {
      type: "string", // this is going to have to refer to another doc, i believe the title of the syllabus would be the topic itself?
      name: "title",
      title: "Title",
      description: "The title of the syllabus",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "subtitle",
      title: "Subtitle",
      description: "The subtitle of the syllabus",
    },
    {
      type: "reference",
      to: [{ type: "person" }],
      name: "author",
      title: "Author",
      description: "The author of this syllabus",
    },
    {
      name: "subheadings",
      title: "Subheading questions",
      type: "array",
      of: [{ type: "syllabusQuestion" }],
      description:
        "A subheading for the syllabus, usually in the form of a question, e.g. 'Why is disinformation important?'",
    },
    {
      type: "date",
      name: "datePublished",
      title: "Date published",
      description: "Date this syllabus was published",
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: "MMMM DD YYYY",
      },
    },
    {
      type: "stackbit_page_meta",
      name: "seo",
      title: "Seo",
      validation: null,
    },
    {
      type: "string",
      name: "layout",
      title: "Layout",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["syllabus"],
      },
    },
    {
      type: "string",
      name: "stackbit_url_path",
      title: "URL Path",
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and post page would be "posts/new-post/"',
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "stackbit_dir",
      title: "Directory",
      description: "The directory path where this file is stored",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["content/pages"],
      },
    },
    {
      type: "string",
      name: "stackbit_model_type",
      title: "Stackbit Model Type",
      description: "Stackbit model type",
      hidden: false,
      validation: (Rule) => Rule.required(),
      options: {
        list: ["page"],
      },
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
