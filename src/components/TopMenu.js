import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { PrismicLink, PrismicText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { FaSearch } from 'react-icons/fa'
import { LanguageSwitcher } from './LanguageSwitcher'


export const TopMenu = ({ topMenu, activeDocMeta }) => {
  const isBrowser = () => typeof window !== "undefined"
  // const [isMobile, setIsMobile] = React.useState(isBrowser() && window.innerWidth < 1024);
  const [width, setWidth] = React.useState(isBrowser() &&window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const isMobile = width <= 1024;
  

  const search = (
   <PrismicLink href="/articles#search"><FaSearch alt="Search"/><span className="visually-hidden">Search</span></PrismicLink>
  )
  const menuLinks = (
    <div className="menu_links">
      {topMenu.menu_links.map((item,index) => (
        <li key={"menu-link"+index}>
          <PrismicLink href={item.link?.url}>
            {item.link_label}
          </PrismicLink>
        </li>
      ))}
        { !isMobile && <li className="search-desktop">{search}</li>}
        <li>
          <PrismicLink href={topMenu.button_link?.url} className="btn-primary">
            {topMenu.button_label}
          </PrismicLink>
        </li>
    </div>
  )
  
  const mobileMenu = (
    <>
      <div className="search">
        {search}
      </div>
      <div className={click ? "nav-icon close" : "nav-icon"} onClick={handleClick} tabIndex="0">
        <span className="ham bar-1"/>
        <span className="ham bar-2"/>
        <span className="ham bar-3"/>
      </div>
      <div className={click ? "mobile-menu open" : "mobile-menu"}>
        { menuLinks }
      </div>
    </>
  )
  return (
    <header id="header">
      <div className="banner">
        <LanguageSwitcher activeDocMeta={activeDocMeta} />
      </div>
      <nav className="menu">
        <ul className="nav-menu">
          <PrismicLink href={"/"} className="nav-logo">
            <GatsbyImage
              image={topMenu.logo?.gatsbyImageData}
              alt={topMenu.logo?.alt || ""}
              className="logo"
            />
          </PrismicLink>
          {isMobile ? mobileMenu : menuLinks}
          
        </ul>
      </nav>
    </header>
  )
}

export const query = graphql`
  fragment TopMenuFragment on PrismicTopMenu {
    _previewable
    type
    lang
    data {
      logo {
        gatsbyImageData(
          width: 300
          imgixParams: {q: 100}
        )
        alt
      }
      menu_links {
        link{
          url 
        }
        link_label
      }
      button_label
      button_link{
        url
      }
    }
  }
`
