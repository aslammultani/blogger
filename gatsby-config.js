module.exports = {
  siteMetadata: {
    title: 'Blogger',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CF_SPACE || '',
        accessToken: process.env.CF_TOKEN || ''
      },
    },
    'gatsby-transformer-remark',
    `gatsby-plugin-react-helmet`,
    `gatsby-remark-images-contentful`,
    'gatsby-plugin-styled-components'
  ],
}