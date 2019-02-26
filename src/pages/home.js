import React, { Component, Fragment } from 'react'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import withAuthorization from '../components/Session/withAuthorization'
import { StaticQuery, Link, graphql } from 'gatsby'
import HeadText from '../components/headText'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'

const BlogPost = ({ node }) => {
  return (
    <li>
      <img src={node.node.heroImage.fixed.src} alt={node.node.title} />
      <div className="blogtext">
        <Link to={node.node.slug}>{node.node.title}</Link>
        <p>{node.node.body.childMarkdownRemark.excerpt}</p>
      </div>
    </li>
  )
}

const SearchedBlogListData = ({ searchQuery }) => (
  <StaticQuery
    query={graphql`
      query pagesListQuery1 {
        allContentfulBlog(
          filter: { node_locale: { eq: "en-US" } }
          sort: { fields: [publishDate], order: DESC }
        ) {
          edges {
            node {
              title
              slug
              body {
                childMarkdownRemark {
                  excerpt
                }
              }
              heroImage {
                fixed(height: 300) {
                  src
                }
              }
            }
          }
        }
      }
    `}
    render={data1 => (
      <>
        <ul className="blog-post">
          {data1.allContentfulBlog.edges.map(item => {
            if (searchQuery !== '') {
              if (item.node.title.match(new RegExp(searchQuery, 'gi'))) {
                return <BlogPost node={item} key={Math.random()} />
              }
            } else {
              return <BlogPost node={item} key={Math.random()} />
            }
          })}
        </ul>
      </>
    )}
  />
)
class HomePageBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
    }
  }

  onChange(e) {
    const value = e.target.value
    this.setState({ searchQuery: value })
  }

  render() {
    return (
      <React.Fragment>
        {this.props.users.sessionReducer.authUser ? (
          <div className="container">
            <div className="search-input">
              <input style={styles.input} onChange={this.onChange.bind(this)} />
              <span className="highlight" />
              <span className="bar" />
              <label>Search for blog</label>
              <span className="icon-search" />
            </div>
            <HeadText />
            <SearchedBlogListData searchQuery={this.state.searchQuery} />
          </div>
        ) : (
          navigate('/')
        )}
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

const HomePage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthorization(authCondition)
)(HomePageBase)

class Home extends Component {
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
            <HomePage />
          </Layout>
        ) : (
          this.state.route
        )}
      </Fragment>
    )
  }
}
export default () => <Home />
const styles = {
  container: {
    padding: 10,
    borderBottom: '1px solid #ddd',
  },
  title: {
    fontSize: 18,
  },
  description: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
  },
  input: {
    height: 40,
    width: 300,
    padding: 7,
    fontSize: 15,
    outline: 'none',
  },
}
