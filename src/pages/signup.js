import React, { Component, Fragment } from 'react'

import Layout from '../components/layout'
import SignUpForm from '../components/SignUp'
import { navigate } from 'gatsby'
import * as routes from '../constants/routes'
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import Loader from '../components/Loader'

class SignUpPage extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
      isLoading: true,
    }
  }
  componentDidMount() {
    const saveData = cookie.load('authUser')
    if (saveData) {
      this.setState({ user: saveData })
    } else {
      this.setState({ user: '' })
    }
    setTimeout(() => this.setState({ isLoading: false }), 1000)
  }

  render() {
    return (
      <Fragment>
        {this.state.user !== '' ? (
          navigate(routes.LANDING)
        ) : (
          <>
            {this.state.isLoading === true ? <Loader /> : null}
            <Layout>
              <div className="container signinpage">
                {' '}
                <h1>Sign Up</h1> <SignUpForm />{' '}
              </div>
            </Layout>
          </>
        )}
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    users: state,
  }
}
const Page = connect(mapStateToProps)(SignUpPage)
export default () => <Page />
