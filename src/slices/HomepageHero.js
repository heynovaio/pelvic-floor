import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

import BgImage from "../images/bg-shape-1.svg"


export const HomepageHero = ({ slice }) => (
  <section className="HomepageHero">
    <div className="Container">
      <div className="flex-wrap wrap-reverse">
        <div className="text">
          <h1>
            <span className="subtitle">{slice.primary.subtitle}</span>
            {slice.primary.title}
          </h1>
          <p>{slice.primary.above_copy}</p>
          <div className="btn-box">
            <PrismicLink href={slice.primary.button_link_a?.url} className="btn-primary">
              {slice.primary.button_label_a}
            </PrismicLink>
            <PrismicLink href={slice.primary.button_link_b?.url} className="btn-secondary">
              {slice.primary.button_label_b}
            </PrismicLink>
          </div>
        </div>
        <div className="featured-image">
          <GatsbyImage
            image={slice.primary.image?.gatsbyImageData}
            alt={slice.primary.image?.alt || ""}
          />
        </div>
      </div>
    </div>
    <img src={ BgImage } alt="" className="bg-image"/>
    <div className="Container">
      <div className="below-hero">
        <div className="center-wrap">
          <h2>{slice.primary.below_title}</h2>
          <p>{slice.primary.below_copy}</p>
        </div>
      </div>
    </div>
    
  </section>
)

export const query = graphql`
  fragment HomepageDataBodyHomepageHero on PrismicHomepageDataBodyHomepageHero {
    id
    primary {
      subtitle
      title 
      above_copy
      button_link_a {
        url
      }
      button_label_a
      button_link_b {
        url
      }
      button_label_b
      image {
        gatsbyImageData
        alt
      }
      below_title
      below_copy
    }
  }
`
