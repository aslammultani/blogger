import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Map = ({ data }) => (
  <div className="mapsbox">
    <iframe
      title={data.contentfulPages.title}
      src={
        'https://maps.google.com/maps?q=' +
        data.contentfulPages.location.lat +
        ',' +
        data.contentfulPages.location.lon +
        '&hl=es;z=14&output=embed'
      }
    />
  </div>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulPages {
          title
          location {
            lon
            lat
          }
        }
      }
    `}
    render={data => <Map data={data} {...props} />}
  />
)
