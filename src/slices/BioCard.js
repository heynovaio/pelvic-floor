import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

export const BioCard = ({ slice }) => (
  <section className="BioCard">
    <div className="Container">
      <div className="flex-wrap">
        <div className="text">
          <h5>{slice.primary.info}</h5>
          <h2>{slice.primary.name}</h2>
          <h3>{slice.primary.training}</h3>
          <p>{slice.primary.description}</p>
        </div>
        <div className="bio-image">
          <GatsbyImage
            image={slice.primary.image?.gatsbyImageData}
            alt={slice.primary.image?.alt || ""}
          />
          <PrismicRichText field={slice.primary.job_info?.richText}/>
        </div>
      </div>
    </div>
  </section>
)

export const query = graphql`
  fragment HomepageDataBodyBioCard on PrismicHomepageDataBodyBioCard {
    id
    primary {
      info
      name 
      training 
      description 
      read_more_label
      image {
        gatsbyImageData
        alt
      }
      job_info {
        richText
      }
    }
  }
`