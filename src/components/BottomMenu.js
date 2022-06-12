import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { StaticImage } from 'gatsby-plugin-image'

export const BottomMenu = ({ bottomMenu, activeDocMeta }) => {

  return (
    <footer>
      <div className="footer-nav">
        <h5>{bottomMenu.footer_title}</h5>
        <ul className="footer-links">
          {bottomMenu.menu_links.map((item,index) => (
            <li key={"menu-link"+index}>
              <PrismicLink href={item.link?.url}>
                {item.link_label}
              </PrismicLink>
            </li>
          ))}
        </ul>
        <p>{bottomMenu.copyright}</p>
      </div>
    </footer>
  )
}

export const query = graphql`
  fragment BottomMenuFragment on PrismicBottomMenu {
    _previewable
    type
    lang
    data {
      footer_title
      copyright
      menu_links {
        link {
          url
        }
        link_label
      }
    }
  }
`
