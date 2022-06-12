import { useStaticQuery, graphql } from "gatsby"

const AllArticles = () => {
  const data = useStaticQuery(graphql`
    query {
      allPrismicArticle {
        nodes {
          uid
          url
          tags
          data {
            article_title
            featured_image {
              gatsbyImageData
              alt
              thumbnails {
                listings_image {
                  gatsbyImageData
                  alt
                }
              }
            }
            article_content {
              text
            }
          }
        }
      }
    }
  `)

  return data.allPrismicArticle.nodes
}

export default AllArticles