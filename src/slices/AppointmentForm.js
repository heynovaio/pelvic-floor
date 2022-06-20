import * as React from 'react'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

export const AppointmentForm = ({ slice }) => {
  var index = 0;

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }


  function switchInput(item){
    switch(item.input_type) {
      case "No Input":
        return <p>{item.label}</p>;
      case "text":
        return <><label htmlFor={(item.label).replace(/ +/g, "")}>{item.label}</label><input type="text" onChange={handleChange} id={(item.label).replace(/ +/g, "")} name={(item.label).replace(/ +/g, "")} required={item.required}/></>;
      case "textarea":
        return <><label htmlFor={(item.label).replace(/ +/g, "")}>{item.label}</label><textarea onChange={handleChange} name={(item.label).replace(/ +/g, "")} id={(item.label).replace(/ +/g, "")} required={item.required}></textarea></>;
      case "submit":
        return <button type="submit" className="btn-primary">Send</button>;
      case "radio":
        return (
          <>
            <label>{item.label}</label>
            <PrismicRichText
              field={item.radio_options?.richText}
              components={{
                listItem: ({ text,children }) => <div key={(index = index+1)} className="radio"><input type="radio" name={item.label} value={text} required={item.required}/>{children}</div>,
              }}
            />
          </>
        );
      default:
        return null;
    }
  }
  return (
    <section className="AppointmentForm">
      <div className="Container">
        <div className="flex-wrap">
          <div className="form-wrap">
            <h1>{slice.primary.title}</h1>
            <p>{slice.primary.description}</p>
            <form  name="appointment" method="POST" data-netlify="true" onSubmit={handleSubmit} action="/thankYou/">
              <input type="hidden" name="form-name" value="appointment" />
              {slice.items.map((item,index) => (
                <div className="form-item" key={slice.id + index}>
                  
                    {switchInput(item)}
                </div>
              ))}

            </form>
          </div>
          <div className="featured-image">
            {slice.primary.featured_image?.gatsbyImageData && 
              <GatsbyImage
                image={slice.primary.featured_image?.gatsbyImageData}
                alt={slice.primary.featured_image?.alt || ""} 
              />
            }
          </div>
        </div>
      </div>
    </section>
  )
}
export const query = graphql`
  fragment PageDataBodyAppointmentForm on PrismicPageDataBodyAppointmentForm {
    id
    primary {
      title 
      description 
      featured_image {
        gatsbyImageData 
        alt 
      }
    }
    items {
      label 
      input_type
      required
      radio_options {
        richText
      }
    }
  }
`
