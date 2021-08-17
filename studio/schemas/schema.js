// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import user defined schema types
import config from './config.js'
import header from './header.js'
import footer from './footer.js'
import advanced from './advanced.js'
import creators from './creators.js'
import citation from './citation.js'
import article from './article.js'
import page from './page.js'
import person from './person.js'
import policy from './policy.js'
import section_hero from './section_hero.js'
import section_articles from './section_articles.js'
import section_content from './section_content.js'
import section_form from './section_form.js'
import section_policies from './section_policies.js'
import section_syllabi from "./section_syllabi.js";
import syllabusQuestion from "./syllabus_question";
import syllabus from './syllabus.js'
import topic from './topic.js'
import action from './action.js'
import form_field from './form_field.js'
import stackbit_page_meta from './stackbit_page_meta.js'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    config,
    header,
    footer,
    advanced,
    article,
    creators,
    citation,
    page,
    person,
    policy,
    section_hero,
    section_articles,
    section_content,
    section_form,
    section_syllabi,
    section_policies,
    syllabus,
    syllabusQuestion, 
    topic,
    action,
    form_field,
    stackbit_page_meta
  ])
})
