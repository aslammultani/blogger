import React, { Component } from 'react'
import { Link } from 'gatsby'

import * as routes from '../../constants/routes'
import { withFirebase } from '../Firebase/FirebaseContext'

const INITIAL_STATE = {
  email: '',
  error: null,
  message: '',
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({
          email: '',
          error: null,
          message: 'Password Reset Link is sent to your Email Address',
        }))
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    const { email, error } = this.state
    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={event =>
            this.setState({ [event.target.name]: event.target.value })
          }
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        <p className="signup_success">{this.state.message}</p>

        {error && <p className="signup_error">{error.message}</p>}
      </form>
    )
  }
}

const PasswordForgetLink = () => (
  <p className="forgotpwd_link">
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export { PasswordForgetLink }

export default withFirebase(PasswordForgetForm)
