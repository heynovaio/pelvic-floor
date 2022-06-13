import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'

export const TextSection = ({ slice }) => {
  return (
    <section className="TextSection">
      <div className="Container">
        <div className="text-content">
          <PrismicRichText field={slice.primary.text?.richText} />
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyTextSection on PrismicPageDataBodyTextSection {
    primary {
      text {
        richText
      }
    }
  }
`
