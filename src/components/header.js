import React from 'react'
import { Link, StaticQuery } from 'gatsby'
import { connect } from 'react-redux'
import * as routes from '../constants/routes'
import SignOutButton from './SignOut'
import Logo from '../images/logo.png'
import './header.css'

const Navigation = props => (
  <header>
    <div className="container">
      <div className="logo">
        <h1 style={{ margin: 0 }}>
          <Link to={routes.LANDING}>
            {' '}
            <img src={Logo} alt="Site Logo" />{' '}
          </Link>
        </h1>
      </div>
      {props.users.sessionReducer.authUser ? (
        <NavigationAuth />
      ) : (
        <NavigationNonAuth />
      )}
    </div>
  </header>
)

const NavigationAuth = () => (
  <StaticQuery
    query={graphql`
      query pagesMenuQuery {
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
        <ul className="menulist">
          <li>
            <Link to={routes.HOME}> Blogs </Link>
          </li>
          {data.allContentfulPages.edges.map(({ node }) => (
            <li key={Math.random()}>
              <Link to={node.slug}> {node.title} </Link>
            </li>
          ))}
          <li>
            <Link to="/Contact"> Contact </Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </>
    )}
  />
)

const NavigationNonAuth = () => (
  <ul className="menulist">
    <li>
      <Link to={routes.SIGN_UP}>New User?</Link>
    </li>
  </ul>
)

const mapStateToProps = state => {
  return {
    users: state,
  }
}

export default connect(
  mapStateToProps,
  null
)(Navigation)
