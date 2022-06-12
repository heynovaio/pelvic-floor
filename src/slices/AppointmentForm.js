import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

export const AppointmentForm = ({ slice }) => (
  <section className="AppointmentForm">
    <div className="Container">
     
    </div>
  </section>
)

export const query = graphql`
  fragment PageDataBodyAppointmentForm on PrismicPageDataBodyAppointmentForm {
    id
  }
`
