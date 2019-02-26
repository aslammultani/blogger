import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Footer from './Footer'
import './layout.css'
import getFirebase from './Firebase'
import FirebaseContext from './Firebase/FirebaseContext'
import withAuthentication from './Session/withAuthentication'
import Navigation from './header'

const MainLayOut = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulPages {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        {children}
      </>
    )}
  />
)

class Layout extends Component {
  state = {
    firebase: null,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const database = import('firebase/database')

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0])

      this.setState({ firebase, loginSuccess: this.props.loginSuccess })
    })
  }

  render() {
    return (
      <MainLayOut>
        <FirebaseContext.Provider value={this.state.firebase}>
          <AppWithAuthentication {...this.props} />
        </FirebaseContext.Provider>
      </MainLayOut>
    )
  }
}

const AppWithAuthentication = withAuthentication(props => (
  <Fragment>
    <Navigation />
    {props.children}
    <Footer />
  </Fragment>
))

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
