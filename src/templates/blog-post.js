import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Disqus from '../components/Disqus'
import withAuthorization from '../components/Session/withAuthorization'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'
import { navigate } from 'gatsby'

const BlogPageContent = ({ data }) => (
  <>
    <Helmet title={`${data.title}`} />
    <div className="container blogdetails">
      <h1>{data.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data.body.childMarkdownRemark.html }}
      />
      <Disqus slug={data.slug} title={data.title} />
    </div>
  </>
)

const authCondition = authUser => !!authUser
const mapStateToProps = state => {
  return {
    users: state,
  }
}

const BlogPagePost = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthorization(authCondition)
)(BlogPageContent)

class BlogPost extends Component {
  handleNewComment(comment) {
    console.log(comment.text)
  }
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
            <BlogPagePost data={this.props.data.contentfulBlog} />
          </Layout>
        ) : (
          this.state.route
        )}
      </Fragment>
    )
  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BlogPost

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
