import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import withAuthorization from '../components/Session/withAuthorization'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'

const InnerPageContent = ({ data }) => (
  <div className="innerpage">
    <div className="bannerImg">
      <img
        src={data.contentfulPages.heroImage.file.url}
        alt={data.contentfulPages.heroImage.file.fileName}
      />
    </div>
    <div className="container">
      <Helmet>
        <title>{`${data.contentfulPages.title}`}</title>
      </Helmet>
      <div
        className="innerpage_content"
        dangerouslySetInnerHTML={{
          __html: data.contentfulPages.body.childMarkdownRemark.html,
        }}
      />
    </div>
  </div>
)
class InnerContentPage extends Component {
  render() {
    return (
      <React.Fragment>
        <InnerPageContent data={this.props.data} />
      </React.Fragment>
    )
  }
}

const authCondition = authUser => !!authUser
const mapStateToProps = state => {
  return {
    users: state,
  }
}
const NewContentFulPage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthorization(authCondition)
)(InnerContentPage)
class InnerPage extends Component {
  constructor() {
    super()
    this.state = {
      route: '',
    }
  }
  componentDidMount() {
    const saveData = cookie.load('authUser')
    if (saveData) {
      this.setState({ route: '' })
    } else {
      this.setState({ route: navigate('/') })
    }
  }

  render() {
    const saveData = cookie.load('authUser')
    return (
      <Fragment>
        {saveData ? (
          <Layout>
            <NewContentFulPage data={this.props.data} />
          </Layout>
        ) : (
          this.state.route
        )}
      </Fragment>
    )
  }
}

InnerPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default InnerPage

export const query = graphql`
  query pagesPostQuery($slug: String!) {
    contentfulPages(slug: { eq: $slug }) {
      title
      slug
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
      heroImage {
        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`
