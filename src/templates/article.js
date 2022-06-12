import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { components } from '../slices'

const ArticleTemplate = ({ data }) => {
  if (!data) return null

  const articleContent = data.prismicArticle
  const article = articleContent.data || {}

  const { lang, type, url } = articleContent
  const alternateLanguages = articleContent.alternate_languages || []
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const topMenu = data.prismicTopMenu || {}
  const bottomMenu = data.prismicBottomMenu || {}

  return (
    <Layout topMenu={topMenu.data} bottomMenu={bottomMenu.data} activeDocMeta={activeDoc}>
      <SliceZone slices={article.body} components={components} />
    </Layout>
  )
}

export const query = graphql`
  query articleQuery($id: String, $lang: String) {
    prismicArticle(id: { eq: $id }, lang: { eq: $lang }) {
      _previewable
      url
      uid
      type
      id
      lang
      tags
      alternate_languages {
        id
        type
        lang
        uid
      }
      data {
        body {
          ... on PrismicSliceType {
            id
            slice_label
            slice_type
          }
          ...ArticleDataBodyEmphasisCards
        }
      }
    }
    prismicTopMenu(lang: { eq: $lang }) {
      ...TopMenuFragment
    }
    prismicBottomMenu(lang: { eq: $lang }) {
      ...BottomMenuFragment
    }
  }
`

export default withPrismicPreview(ArticleTemplate)
