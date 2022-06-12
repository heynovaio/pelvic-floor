import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import BgBlob from "../images/bg-blob-1.svg"
import BgPlant from "../images/bg-plant-1.svg"

export const ListWithTitle = ({ slice }) => (
  <section className="ListWithTitle">
    <div className="Container">
      <div className="wrap">
        <h2>{slice.primary.title}</h2>
        <PrismicRichText field={slice.primary.list?.richText}/>
        <img src={BgPlant} alt="" className="bg-plant"/>
      </div>
      <img src={BgBlob} alt="" className="bg-blob"/>
    </div>
  </section>
)

export const query = graphql`
  fragment HomepageDataBodyListWithTitle on PrismicHomepageDataBodyListWithTitle {
    id
    primary{
      title
      list{
        richText
      }
    }
  }
`
