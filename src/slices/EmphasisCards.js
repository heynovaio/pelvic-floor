import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

export const EmphasisCards = ({ slice }) => {

  function truncate( text ){
    return text.length > 150 ? text.substring(0,200) + "..." : text;
  }
  return (
  <section className="EmphasisCards">
    <div className="Container">
      <div className="center-wrap">
        <h2>{slice.primary.title}</h2>
        <p>{slice.primary.description}</p>
      </div>
      <div className="card-row">
        {slice.items.map((item,index) => (
          <div className="card" key={slice.id + index}>
            <GatsbyImage
              image={item.article.document.data.featured_image?.thumbnails.listings_image.gatsbyImageData}
              alt={item.article.document.data.featured_image?.alt || ""}
              className="card-image"
            />
            <div className="card-copy">
              <h4>{item.article.document.data.article_title}</h4>
              <p>{item.article.document.tags}</p>
              <p>{truncate(item.article.document.data.article_content?.text)}</p>
              <PrismicLink href={item.article.url} className="btn-read-more">
                {slice.primary.article_read_more_label}
              </PrismicLink>
            </div>
          </div>
        ))}
      </div>
      <div className="center-wrap">
        <PrismicLink href={slice.primary.button_link?.url} className="btn-primary">
          {slice.primary.button_label}
        </PrismicLink>
      </div>
    </div>
  </section>
)}

export const query = graphql`
  fragment HomepageDataBodyEmphasisCards on PrismicHomepageDataBodyEmphasisCards {
    id
    primary {
      title
      description
      button_label
      button_link {
        url
      }
      article_read_more_label
    }
    items {
      article {
        url
        document {
          ... on PrismicArticle {
            data {
              featured_image {
                thumbnails{
                  listings_image {
                    gatsbyImageData
                    alt 
                  }
                }   
              }
              article_title
              article_content {
                text
              }
            }
            tags
          }          
        }
        
      }
    }
  }
  fragment ArticleDataBodyEmphasisCards on PrismicArticleDataBodyEmphasisCards {
    id
    primary {
      title
      description
      button_label
      button_link {
        url
      }
      article_read_more_label
    }
    items {
      article {
        url
        document {
          ... on PrismicArticle {
            data {
              featured_image {
                thumbnails{
                  listings_image {
                    gatsbyImageData
                    alt 
                  }
                }   
              }
              article_title
              article_content {
                text
              }
            }
            tags
          }          
        }   
      }
    }
  }
`
