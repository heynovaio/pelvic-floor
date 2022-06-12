import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { FaEnvelope, FaPhoneAlt, FaPrint, FaMapMarkerAlt } from "react-icons/fa"
export const Contact = ({ slice }) => (
  <section className="Contact">
    <div className="Container">
      <div className="flex-wrap">
        <div className="map">
          <GatsbyImage
            image={slice.primary.map?.gatsbyImageData}
            alt={slice.primary.map?.alt || ""}
          />
        </div>
        <div className="text">
          <h2>{slice.primary.title}</h2>
          <p className="description">{slice.primary.description}</p>
          <p className="social"><FaEnvelope/>{slice.primary.email}</p>
          <p className="social"><FaPhoneAlt/>{slice.primary.phone}</p>
          <p className="social"><FaPrint/>{slice.primary.fax}</p>
          <p className="social"><FaMapMarkerAlt/>{slice.primary.address}</p>
          <PrismicLink href={slice.primary.button_link?.url} 
            className="btn-primary">
            {slice.primary.button_label}
          </PrismicLink>
        </div>
      </div>
    </div>
  </section>
)

export const query = graphql`
  fragment HomepageDataBodyContact on PrismicHomepageDataBodyContact {
    id
    primary {
      map {
        gatsbyImageData
        alt 
      }
      title 
      description
      email 
      phone 
      fax 
      address 
      button_label 
      button_link {
        url 
      }
    }
  }
  fragment PageDataBodyContact on PrismicPageDataBodyContact {
    id
    primary {
      map {
        gatsbyImageData
        alt 
      }
      title 
      description
      email 
      phone 
      fax 
      address 
      button_label 
      button_link {
        url 
      }
    }
  }
`
