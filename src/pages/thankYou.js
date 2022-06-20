import * as React from 'react'
import { withPrismicUnpublishedPreview } from 'gatsby-plugin-prismic-previews'

const ThankYou = () => (
  <div className="thankyou">
    <h1>Thank You for booking!</h1>
    <h3>We will get back to you within 72 hours.</h3>
    <p>
      <a href="/contact">
        <button type="button" className="btn-primary">Return to Contact</button>
      </a>
    </p>
  </div>
)

export default withPrismicUnpublishedPreview(ThankYou)
