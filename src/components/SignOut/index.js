import React, { Component } from 'react'
import { withFirebase } from '../Firebase/FirebaseContext'

const SignOutButton = data => (
  <button
    type="button"
    onClick={data.data.firebase ? data.data.firebase.doSignOut : () => {}}
  >
    Sign Out
  </button>
)

const SignOutData = SignOutButton
class SignUP extends Component {
  render() {
    return <SignOutData data={this.props} />
  }
}

export default withFirebase(SignUP)
