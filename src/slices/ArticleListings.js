import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

import AllArticles from "../components/AllArticles" 

export const ArticleListings = ({ slice }) => {

  
  const allArticles = AllArticles()
  function filter(tag){
    return allArticles.filter(article => article.tags[0] === tag);
  }
  function truncate( text ){
    return text.length > 150 ? text.substring(0,200) + "..." : text;
  }
  const [category, setCategory] = React.useState(allArticles);
  const [active, setActive] = React.useState("All");
  const handleChange = event => {
    setActive( event.target.value);
    setCategory(
      event.target.value == "All" ? allArticles :
      allArticles.filter(article => article.tags[0] === event.target.value) || null
    );

  };
  const featuredSection = (
      <section className="ArticleListings featured">
        <div className="Container">
          <div className="featured-article">
            <div className="flex-wrap">
              <div className="featured-image">
                {category[0]?.data.featured_image.gatsbyImageData &&
                  <GatsbyImage
                    image={category[0]?.data.featured_image?.gatsbyImageData }
                    alt={category[0]?.data.featured_image?.alt || ""}
                    className="featured-article-image"
                  />
                }
              </div>
              <div className="featured-text">
                <h4>{category[0]?.data.article_title}</h4>
                <p>{category[0]?.tags}</p>
                <p>{category[0]?.data.article_content?.text ? truncate(category[0]?.data.article_content?.text) : ""}</p>
                <PrismicLink href={category[0]?.url} className="btn-read-more">
                  {slice.primary.read_article_label}
                </PrismicLink>
              </div>
            </div>
          </div>
        </div>
      </section> 
    )


  return (
  <>
    <section className="ArticleListings hero">
      <div className="Container">
        <div className="Hero">
          <h1>{slice.primary.title}</h1>
          <p>{slice.primary.description}</p>
        </div>
        <div className="nav">
          <div className="side">
            <h3>{slice.primary.category_header}</h3>
            <div className="categories">
              <button  className={active == "All" ? "btn-secondary select" : "btn-secondary"} 
                onClick={handleChange} value="All"
              >
                All
              </button>
              {slice.items.map((item,index)=> (
                <button 
                  className={active == item.category ? "btn-secondary select" : "btn-secondary"} 
                  key={slice.id+index} 
                  onClick={handleChange} value={item.category}
                >
                  {item.category}
                </button>
              ))}
            </div>
          </div>
          <div className="side">
            <h3>{slice.primary.search_header}</h3>
            <div className="search">

            </div>
          </div>
        </div>
      </div>
    </section>
    { category.length > 0 ? featuredSection : null }
    <section className="ArticleListings list">
      <div className="Container">
        <div className="article-list">
          {category.slice(1).map((item,index) => (
            <div className="card" key={"cat"+slice.id+index}>
              <GatsbyImage
                image={item.data.featured_image?.thumbnails.listings_image.gatsbyImageData}
                alt={item.data.featured_image?.alt || ""}
                className="card-image"
              />

              <div className="card-copy">
                <h4>{item.data.article_title}</h4>
                <p>{item.tags}</p>
                <p>{truncate(item.data.article_content?.text)}</p>
                <PrismicLink href={item.url} className="btn-read-more">
                  {slice.primary.read_article_label}
                </PrismicLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  )
}

export const query = graphql`
  fragment PageDataBodyArticleListings on PrismicPageDataBodyArticleListings {
    id
    primary {
      title 
      description 
      category_header 
      search_header 
      read_article_label
    }
    items {
      category
    }
  }
`
