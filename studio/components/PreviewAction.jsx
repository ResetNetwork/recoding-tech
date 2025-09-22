import {DocumentTextIcon} from '@sanity/icons'

export function PreviewAction(props) {
  return {
    name: 'previewAction',
    title: 'Open Preview',
    icon: DocumentTextIcon,
    group: 'default',
    onHandle: () => {
      const {published, draft} = props
      const doc = published || draft
      const id = doc?._id

      if (slug) {
        const siteUrl = `https://www.techpolicy.press/preview/${id.replace('drafts.', '')}/`
        window.open(siteUrl, '_blank')
      } else {
        window.alert('No id found for this document.')
      }
    },
    disabled: !props.draft,
    label: 'Open Preview'
  }
}
