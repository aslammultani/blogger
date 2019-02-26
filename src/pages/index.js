import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import * as routes from '../constants/routes'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withAuthentication from '../components/Session/withAuthentication'
import * as Actions from '../actions/action'
class IndexPageBase extends Component {
  render() {
    const { users } = this.props
    return (
      <div className="mainparent">
        <div className="landingpage">
          <div className="container">
            <h1>
              {' '}
              Welcome To
              <br />
              Gatsby + Contentful + Firebase Demo{' '}
            </h1>
            {users.sessionReducer.authUser ? (
              <Link
                onClick={() => this.props.clickedOnBlog(true)}
                to={routes.HOME}
                className="signinlink"
              >
                Check Out Our Blogs
              </Link>
            ) : (
              <Link to={routes.SIGN_IN} className="signinlink">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state,
  }
}

const mapDispatchToProps = dispatch => ({
  clickedOnBlog: () => dispatch(Actions.clickedOnBlog(true)),
})

const Index1 = compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(IndexPageBase)

export default () => (
  <Layout>
    <Index1 />
  </Layout>
)
