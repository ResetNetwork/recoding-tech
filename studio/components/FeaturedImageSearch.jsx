import React, { useCallback, useState } from 'react'
import { TextInput, Stack, Container, Flex, Button, Grid, Card, Spinner, Dialog, Box } from '@sanity/ui'
import {useFormValue, useDocumentOperation, useClient} from 'sanity'
import createImageUrlBuilder from '@sanity/image-url'
import BlockContent from "@sanity/block-content-to-react"

const searchSanityImages = async (client, keywords) => {
    return await client.fetch(`
      *[_type == "post" && (body[].altText match "${keywords}" || pt::text(body[].caption) match "${keywords}")]
      { body[_type == "Image"] { ..., asset->} }`);
}

export const FeaturedImageSearch = (props) => {
    const [isLoading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const onClose = useCallback(() => setOpen(false), [])
    const onOpen = useCallback(() => setOpen(true), [])
    const client = useClient({apiVersion: '2021-10-21'})

    const form = useFormValue([])
    const docId = typeof form._id === 'string' ? form._id.replace('drafts.', '') : undefined
    const { patch } = useDocumentOperation(docId, form._type)

    const onSearch = useCallback(async () => {
      setLoading(true)
      searchSanityImages(client, search).then((results) => {
        setResults(results)
      }).finally(() => {
        setLoading(false)
      })
    }, [client, search])

    const onSelectImage = useCallback((image) => {
      const bodyKey = props.id.replace('.featuredImageSearch', '')
      patch.execute([
        {
          "set": {
            [`${bodyKey}.altText`]: image.altText,
            [`${bodyKey}.caption`]: image.caption,
            [`${bodyKey}.asset`]: {
              _type: 'reference',
              _ref: image.asset._id
            },
            [`featuredImage.altText`]: image.altText,
            [`featuredImage.caption`]: image.caption,
            [`featuredImage.asset`]:  {
              _type: 'reference',
              _ref: image.asset._id
            },
          }
        },
      ])
      setOpen(false)
    }, [props])

    return (
        <Stack space={2}>
          <Button
            onClick={onOpen}
            fontSize={[2, 2, 3]}
            mode="ghost"
            padding={[2, 2, 3]}
            text="Search for an image"
          />
          {open && (
            <Dialog header="Search for an image" id="dialog-example" onClose={onClose} zOffset={1000} width={2}>
                <Box padding={4}>
                  <Container width={0}>
                    <Flex>
                      <TextInput
                        marginRight={2}
                        onChange={(event) =>
                          setSearch(event.currentTarget.value)
                        }
                        placeholder="Search"
                        value={search}
                      />
                      <Box marginLeft={2}>
                        <Button
                          onClick={onSearch}
                          mode="ghost"
                          text="Search"
                        />
                      </Box>
                    </Flex>
                  </Container>

                  {isLoading && (
                      <Card padding={4}>
                        <Flex
                          align="center"
                          direction="row"
                          gap={3}
                          height="fill"
                          justify="center"
                        >
                          <Spinner muted size={4} />
                        </Flex>
                      </Card>
                    )}
                  {!isLoading && results && results.length === 0 && (
                    <Card padding={4}>
                      <Flex
                        align="center"
                        direction="row"
                        gap={3}
                        height="fill"
                        justify="center"
                      >
                        No results found
                      </Flex>
                    </Card>
                  )}
                  {!isLoading && results &&results.length > 0 && (
                    <Container width={3}>
                      <Grid
                        columns={2}
                        gap={[1, 1, 2, 3]}
                        padding={4}
                      >
                        {results.map((result) => (
                          <Card
                            key={result.body[0]._key}
                            padding={1}
                          >
                            <Flex gap={3}>
                              {result.body[0].asset && 
                                <img
                                  src={createImageUrlBuilder(client).image(result.body[0].asset).width(200).url()}
                                  title={result.body[0].altText}
                                  style={{ height: "100%", width: "200px", paddingTop: "16px"}}
                                />
                              }
                              <Flex gap={3} direction={"column"} height={"auto"} justify={'space-between'} style={{ width: "100%" }}>
                                <BlockContent blocks={result.body[0].caption} />
                                <Button
                                  fontSize={1}
                                  mode="ghost"
                                  text="Use this image"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onSelectImage(result.body[0])}
                                />
                              </Flex>
                            </Flex>
                          </Card>
                        ))}
                      </Grid>
                    </Container>
                  )}
                </Box>
            </Dialog>
          )}
        </Stack>
    )
}
