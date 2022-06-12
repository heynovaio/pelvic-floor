import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'

export const InfoWithImage = ({ slice }) => {
  const featuredImage = (
    <div className="featured-image">
      <GatsbyImage
        image={slice.primary.featured_image?.gatsbyImageData}
        alt={slice.primary.featured_image?.alt || ""}
      />
    </div> 
  )
  const text = (
    <div className="text-content">
      <PrismicRichText field={slice.primary.text?.richText} />
    </div>
  )
  return (
    <section className="info-with-image">
      <div className="Container">
        <div className={slice.primary.image_side ? "flex-wrap wrap-reverse" : "flex-wrap"}>
          {slice.primary.image_side ? text : featuredImage}
          {slice.primary.image_side ? featuredImage : text}  
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment PageDataBodyInfoWithImage on PrismicPageDataBodyInfoWithImage {
    primary {
      featured_image {
        url
        gatsbyImageData
        alt 
      }
      text {
        richText
      }
    }
  }
  fragment HomepageDataBodyInfoWithImage on PrismicHomepageDataBodyInfoWithImage {
    primary {
      image_side
      featured_image {
        gatsbyImageData
        alt
      }
      text {
        richText
      }
    }
  }
`
