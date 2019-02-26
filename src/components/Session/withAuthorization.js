import React from 'react'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import * as routes from '../../constants/routes'
import AuthUserContext from '../Session/AuthUserContext'
import { withFirebase } from '../Firebase/FirebaseContext'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    _initFirebase = false
    firebaseInit = () => {
      if (this.props.firebase && !this._initFirebase) {
        this._initFirebase = true

        this.listener = this.props.firebase.onAuthUserListener(
          authUser => {
            if (!condition(authUser)) {
              navigate(routes.SIGN_IN)
            }
          },
          () => navigate(routes.LANDING)
        )
      }
    }

    componentDidMount() {
      this.firebaseInit()
    }

    componentDidUpdate() {
      this.firebaseInit()
    }

    componentWillUnmount() {
      this.listener && this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      authUser: state.sessionReducer.authUser,
    }
  }

  return compose(
    withFirebase,
    connect(mapStateToProps)
  )(WithAuthorization)
}

export default withAuthorization
