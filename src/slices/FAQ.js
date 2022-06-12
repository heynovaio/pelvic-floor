import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

export const FAQ = ({ slice }) => (
  <section className="FAQ">
    <div className="Container">
      <h2>{slice.primary.title}</h2>
      {slice.items.map((item,index) => (
        <details key={slice.id + index}>
          <summary>{item.question}</summary>
          {item.answer}
        </details>
      ))}
      <PrismicLink  
        href={slice.primary.button_link?.url} 
        className="btn-primary"
      >
        {slice.primary.button_label}
      </PrismicLink>
    </div>
  </section>
)

export const query = graphql`
  fragment HomepageDataBodyFaq on PrismicHomepageDataBodyFaq {
    id
    primary {
      title 
      button_label 
      button_link {
        url
      }
    }
    items {
      question
      answer
    }
  }
`
