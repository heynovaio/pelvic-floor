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

  function listify(item){
    if (item)return item.split(',');
    return [];
  }
  return (
    <section className="AppointmentForm">
      <div className="Container">
        <div className="flex-wrap">
          <div className="form-wrap">
            <h1>{slice.primary.title}</h1>
            <p>{slice.primary.description}</p>
            <form  
            name="appointment" 
            method="POST" 
            data-netlify-honeypot="bot-field"
            data-netlify="true" 
            onSubmit={handleSubmit} 
            action="/thankYou/">
              <input type="hidden" name="form-name" value="appointment" />
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
              </p>
              <label htmlFor="Name">{slice.primary.name_label}</label><input type="text" onChange={handleChange} id="Name" name="Name" required/>
              <label htmlFor="Phone">{slice.primary.phone_number}</label><input type="text" onChange={handleChange} id="Phone" name="Phone" required/>
              <label htmlFor="Email">{slice.primary.email}</label><input type="text" onChange={handleChange} id="Email" name="Email" required/>
              <fieldset>
                <legend>{slice.primary.radio_label}</legend>
                  {listify(slice.primary.radio_options).map((item,index) => (
                   <label className="checkbox" key={index} htmlFor={index}>
                      <input 
                        type="radio" 
                        id={index} 
                        value={item} 
                        name="Source"
                       />{ item }</label> 
                    
                  ))}
              </fieldset> 
              <label htmlFor="Message">{slice.primary.message_label}</label><textarea onChange={handleChange} name="Message" id="Message" required></textarea>
              <p>{slice.primary.privacy_notice}</p>
              <button type="submit" className="btn-primary">{slice.primary.submit_label}</button>
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
      name_label
      phone_number
      email
      radio_label
      radio_options
      message_label
      privacy_notice
      submit_label
    }
  }
`
