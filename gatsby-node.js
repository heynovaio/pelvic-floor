const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const queryData = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicArticle {
        nodes {
          id
          lang
          url
          tags
        }
      }
      allPrismicHomepage {
        nodes {
          id
          lang
          url
        }
      }
    }
  `)

  queryData.data.allPrismicPage.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })

  queryData.data.allPrismicArticle.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/article.js'),
      context: {
        id: page.id,
        lang: page.lang,
        tags: page.tags,
      },
    })
  })

  queryData.data.allPrismicHomepage.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/homepage.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
}
