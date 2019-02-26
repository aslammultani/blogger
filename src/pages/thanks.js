import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

export default () => (
  <Layout>
    <div className="thankyoupage">
      <h1>Thank you!</h1>
      <p>
        Thanks a bunch for filling that out. It means a lot to us, just like you
        do! We really appreciate you giving us a moment of your time today.
        Thanks for being you.
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  </Layout>
)
