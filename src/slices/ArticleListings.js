import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { FaSearch } from 'react-icons/fa'
import AllArticles from "../components/AllArticles" 
import Placeholder from '../images/placeholder.png'

export const ArticleListings = ({ slice,context }) => {

  const lang = context.lang;
  const isFr = lang.slice(0,2) == 'fr' ? true : false; 

  const allArticles = AllArticles();
  const frArticles = allArticles.filter(article => article.lang == "fr-ca");
  const enArticles = allArticles.filter(article => article.lang == "en-ca");

  function filter(tag){
    return allArticles.filter(article => article.tags[0] === tag);
  }
  function truncate( text ){
    return text.length > 150 ? text.substring(0,200) + "..." : text;
  }
  const [category, setCategory] = React.useState(allArticles);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [active, setActive] = React.useState("All");

  React.useEffect(() => {
    const results = !searchTerm ? allArticles : allArticles.filter(cur =>
      cur.data.article_title.toLowerCase().includes(searchTerm) ||
      cur.data.article_content?.text.toLowerCase().includes(searchTerm)
    );
    setCategory(results);
  }, [searchTerm]);

  React.useEffect(() => { 
    setCategory(
      active == "All" ? allArticles :
      allArticles.filter(article => article.tags[0] === active) || null
    );
  }, [active]);

  const handleSearch = event => {
    setActive("All");
    setSearchTerm(event.target.value);
  };
  const handleChange = event => {
    setActive( event.target.value);
  };
  const featuredSection = (article) => (
    <section className="ArticleListings featured">
      <div className="Container">
        <div className="featured-article">
          <div className="flex-wrap">
            <div className="featured-image">
              {article?.data.featured_image.gatsbyImageData &&
                <GatsbyImage
                  image={article?.data.featured_image?.gatsbyImageData }
                  alt={article?.data.featured_image?.alt || ""}
                  className="featured-article-image"
                />
              }
            </div>
            <div className="featured-text">
              <h4>{article?.data.article_title}</h4>
              <p>{article?.tags}</p>
              <p>{article?.data.article_content?.text ? truncate(article?.data.article_content?.text) : ""}</p>
              <PrismicLink href={article?.url} className="btn-read-more">
                {slice.primary.read_article_label}
              </PrismicLink>
            </div>
          </div>
        </div>
      </div>
    </section> 
    )
  const articleListings = (articles) => (
    <section className="ArticleListings list">
      <div className="Container">
        <div className="article-list">
          {(active == "All" ? articles.slice(1) : articles).map((item,index) => (
            <div className="card" key={"cat"+slice.id+index}>
              <PrismicLink href={item.url}>
                { item.data.featured_image.thumbnails?.listings_image?.gatsbyImageData ?
                  <GatsbyImage
                    image={item.data.featured_image?.thumbnails.listings_image.gatsbyImageData}
                    alt={item.data.featured_image?.alt || ""}
                    className="card-image"
                  /> : 
                  <img className="card-image" src={Placeholder} alt=""/>
                }
              </PrismicLink>
              <div className="card-copy">
                <h2>{item.data.article_title}</h2>
                <p className="category">{item.tags} </p>
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
          <div className="btn-nav">
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
          <div className="search-input" id="search">
            <h3>{slice.primary.search_header}</h3>
            <div className="input-wrap" >
              <input type="text" onChange={handleSearch} value={searchTerm}/>
              <FaSearch/>
            </div>
          </div>
        </div>
      </div>
    </section>
    {isFr ?
      <>
        { active == "All"  && searchTerm =="" ? featuredSection(frArticles[0]) : null }
        { articleListings(category.filter(cur => cur.lang == "fr-ca"))}
        { active == "All" && category.length > 0 && <div className="Container"><h2>In English</h2></div>}
        { active == "All" && articleListings(category.filter(cur => cur.lang == "en-ca"))}
      </> :
       <>
        { active == "All"  && searchTerm =="" ? featuredSection(enArticles[0]) : null }
        { articleListings(category.filter(cur => cur.lang == "en-ca"))}
      </>
    }
    
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
