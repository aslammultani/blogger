import React, { Component, Fragment } from 'react'
import Layout from '../components/layout'

import SignInForm from '../components/SignIn'
import { SignUpLink } from '../components/SignUp'
import { PasswordForgetLink } from '../components/PasswordForget'
import { navigate } from 'gatsby'
import * as routes from '../constants/routes'
import getFirebase from '../components/Firebase'
import FirebaseContext from '../components/Firebase/FirebaseContext'
import withAuthentication from '../components/Session/withAuthentication'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'
import Loader from '../components/Loader'
class SignInPage extends Component {
  state = {
    firebase: null,
    isLoading: true,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const database = import('firebase/database')

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0])
      this.setState({ firebase })
    })
    setTimeout(() => this.setState({ isLoading: false }), 1000)
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <SignInPageData {...this.props} load={this.state.isLoading} />
      </FirebaseContext.Provider>
    )
  }
}

const SignInPageData = props => {
  const saveData = cookie.load('authUser')
  return (
    <Fragment>
      {saveData ? (
        navigate(routes.LANDING)
      ) : (
        <>
          {props.load === true ? <Loader /> : null}
          <Layout>
            <div className="container signinpage">
              {' '}
              <h1>Log In</h1> <SignInForm /> <PasswordForgetLink />{' '}
              <SignUpLink />{' '}
            </div>
          </Layout>
        </>
      )}
    </Fragment>
  )
}
const mapStateToProps = state => {
  return {
    users: state,
  }
}

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthentication
)(SignInPage)
