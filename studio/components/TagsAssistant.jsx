import React, {useCallback} from 'react'
import {Stack, Text, Flex, Button, Heading, Card, Spinner, Checkbox} from '@sanity/ui'
import {useFormValue, useDocumentOperation, useClient} from 'sanity'
import {GoogleGenerativeAI, SchemaType} from '@google/generative-ai'
import portabletextToText from '../libs/portabletextToText'
import {uuid} from '@sanity/uuid'

const geminiResponseSchema = {
  description: 'Response',
  type: SchemaType.OBJECT,
  properties: {
    categories: {
      description: 'Categories',
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    tags: {
      description: 'Tags',
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
  },
  required: ['categories', 'tags'],
}

const fetchSanityTags = async (client, tags) => {
  return await client.fetch(`
    *[_type == "topic" && lower(name) in ["${tags.join('", "')}"] && stackbit_model_type in ["data", "page"]]
    { _id, name, displayName, link, slug, stackbit_model_type, "count": count(*[_type == "post" && references(^._id)]) }`);
}

export const TagsAssistant = (props) => {
  const [aiResponse, setAiResponse] = React.useState(null)
  const [selectedTopics, setSelectedTopics] = React.useState([])
  const [selectedTags, setSelectedTags] = React.useState([])
  const [selectedCreate, setSelectedCreate] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const client = useClient({apiVersion: '2021-10-21'})

  // key is stored in .env
  const aikey = import.meta.env.SANITY_STUDIO_GEMINI_API_KEY
  const genAI = new GoogleGenerativeAI(aikey)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: geminiResponseSchema,
    },
  })

  const form = useFormValue([])
  const docId = typeof form._id === 'string' ? form._id.replace('drafts.', '') : undefined
  const {patch} = useDocumentOperation(docId, form._type)

  const relatedTopics = form.relatedTopics || []

  const onAssign = async () => {
    setAiResponse(null)
    const createdTags = []
    const transaction = client.transaction()
    for (const item of selectedCreate) {
      transaction.create({
        _type: 'topic',
        name: item,
        displayName: item,
        domain: 'post_tag',
        slug: {
          _type: 'slug',
          current: item.replace(/["]+/g, '').replace(/\s+/g, '-').toLowerCase(),
        },
        stackbit_model_type: 'data'
      })
    }
    const result = await transaction.commit()
    createdTags.push(...result.documentIds)

    const update = [
      ...selectedTopics.map((item) => ({_ref: item, _type: 'reference', _key: uuid()})),
      ...selectedTags.map((item) => ({_ref: item, _type: 'reference', _key: uuid()})),
      ...createdTags.map((item) => ({_ref: item, _type: 'reference', _key: uuid()})),
    ]

    if (update.length > 0) {
      if (form.relatedTopics) {
        patch.execute([
          {
            insert: {
              after: 'relatedTopics[-1]',
              items: update,
            },
          },
        ])
      } else {
        patch.execute([
          {
            set: {
              "relatedTopics": update
            }
          },
        ])
      }
    }

    onReset()
  }

  const onReset = () => {
    setSelectedTopics([])
    setSelectedTags([])
    setSelectedCreate([])
  }

  const onGenerate = async () => {
    if (!form.body) return;

    setLoading(true)
    setAiResponse(null)
    onReset()

    const body = portabletextToText(form.body)

    const prompt = `What categories and tags would you suggest me to add to this post?\nPost title is:\n${form.title}\nPost body is:\n${body}`
    const query = await model.generateContent(prompt)
    const response = JSON.parse(query.response.text())

    const tags = [...new Set([...response.categories, ...response.tags])]
    const tagsSanity = await fetchSanityTags(client, tags)

    const result = {
      categories: tagsSanity.filter((tag) => tag.stackbit_model_type === 'page'),
      tags: tagsSanity.filter((tag) => tag.stackbit_model_type === 'data'),
      create: [],
    }

    result.create = tags.filter((item) => !result.categories.find((tag) => tag.name.toLowerCase() === item.toLowerCase()) && !result.tags.find((tag) => tag.name.toLowerCase() === item.toLowerCase()))

    setAiResponse(result)
    setLoading(false)
  }

  const selectAllTopics = useCallback((event) => {
    if (!aiResponse) return
    if (event.target.checked) {
      setSelectedTopics(aiResponse.categories.filter(item => !relatedTopics.find((topic) => topic._ref === item._id)).map((item) => item._id))
    } else {
      setSelectedTopics([])
    }
  }, [aiResponse, relatedTopics])

  const selectTopic = useCallback((event) => {
    if (event.target.checked) {
      setSelectedTopics(prev => [...prev, event.target.value])
    } else {
      setSelectedTopics(prev => [...prev.filter(item => item !== event.target.value)])
    }
  }, [setSelectedTopics])

  const selectTag = useCallback((event) => {
    if (event.target.checked) {
      setSelectedTags(prev => [...prev, event.target.value])
    } else {
      setSelectedTags(prev => [...prev.filter(item => item !== event.target.value)])
    }
  }, [setSelectedTags])

  const selectCreate = useCallback((event) => {
    if (event.target.checked) {
      setSelectedCreate(prev => [...prev, event.target.value])
    } else {
      setSelectedCreate(prev => [...prev.filter(item => item !== event.target.value)])
    }
  }, [setSelectedCreate])

  return (
    <Stack space={2}>
      <Button
        onClick={onGenerate}
        fontSize={[2, 2, 3]}
        mode="ghost"
        padding={[2, 2, 3]}
        text="Generate based on Content"
      />
      {isLoading && (
        <Card padding={4}>
          <Flex
            align="center"
            direction="row"
            gap={3}
            height="fill"
            justify="center"
          >
            <Spinner muted />
            <Text muted size={1}>
              Quering Gemini AI…
            </Text>
          </Flex>
        </Card>
      )}
      {aiResponse && (
        <div>
          <Flex justify="space-between" align={'center'} style={{marginTop: '1rem'}}>
            <Heading as="h5" size={1}>
              Topics
            </Heading>
            <Checkbox onChange={selectAllTopics} style={{marginRight: "12px"}} />
          </Flex>
          <Stack paddingY={3} space={2}>
            {aiResponse.categories.map((item) => (
              <Card padding={[2, 2, 3]} radius={2} shadow={1} key={item._id}>
                <Flex justify="space-between" align={'center'}>
                  <Flex gap={2}>
                    <Text>{item.displayName}</Text>
                    <Text muted>({item.count} refs)</Text>
                  </Flex>
                  <Checkbox
                    disabled={relatedTopics.find((topic) => topic._ref === item._id)}
                    checked={selectedTopics.includes(item._id) || relatedTopics.find((topic) => topic._ref === item._id)}
                    onChange={selectTopic}
                    value={item._id}
                  />
                </Flex>
              </Card>
            ))}
          </Stack>
          <Heading as="h5" size={1} style={{marginTop: '1rem'}}>
            Tags
          </Heading>
          <Stack paddingY={3} space={2}>
            {aiResponse.tags.map((item) => (
              <Card padding={[2, 2, 3]} radius={2} shadow={1} key={item._id}>
                <Flex justify="space-between" align={'center'}>
                  <Flex gap={2}>
                    <Text>{item.displayName}</Text>
                    <Text muted>({item.count} refs)</Text>
                  </Flex>
                  <Checkbox
                    disabled={relatedTopics.find((topic) => topic._ref === item._id)}
                    checked={selectedTags.includes(item._id) || relatedTopics.find((topic) => topic._ref === item._id)}
                    onChange={selectTag}
                    value={item._id}
                  />
                </Flex>
              </Card>
            ))}
          </Stack>
          <Heading as="h5" size={1} style={{marginTop: '1rem'}}>
            Create and Assign Following Tags
          </Heading>
          <Stack paddingY={3} space={2}>
            {aiResponse.create.map((item, index) => (
              <Card padding={[2, 2, 3]} radius={2} shadow={1} key={index}>
                <Flex justify="space-between" align={'center'}>
                  <Text>{item}</Text>
                  <Checkbox
                    checked={selectedCreate.includes(item)}
                    onChange={selectCreate}
                    value={item}
                  />
                </Flex>
              </Card>
            ))}
          </Stack>
          <Stack paddingY={3} space={2}>
            <Button
              style={{marginTop: '1rem'}}
              onClick={onAssign}
              fontSize={[2, 2, 3]}
              tone="primary"
              padding={[2, 2, 3]}
              text="Assign"
            />
          </Stack>
        </div>
      )}
    </Stack>
  )
}
