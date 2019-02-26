import React, { Component, Fragment } from 'react'
import Layout from '../components/layout'
import Map from '../components/Map'
import withAuthorization from '../components/Session/withAuthorization'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'
import { navigate } from 'gatsby'

function validate(email, name, textarea) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    name: name.length === 0,
    textarea: textarea.length === 0,
  }
}

class ContactForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      name: '',
      textarea: '',

      everFocusedEmail: false,
      everFocusedName: false,
      everFocusedTextarea: false,
      inFocus: '',
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(evt) {
    this.setState({ email: evt.target.value })
  }

  handleNameChange(evt) {
    this.setState({ name: evt.target.value })
  }

  handleTextareaChange(evt) {
    this.setState({ textarea: evt.target.value })
  }

  handleSubmit(evt) {
    if (!this.canBeSubmitted()) {
      evt.preventDefault()
      return
    }
  }

  canBeSubmitted() {
    const errors = validate(
      this.state.email,
      this.state.name,
      this.state.textarea
    )
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  render() {
    const errors = validate(
      this.state.email,
      this.state.name,
      this.state.textarea
    )
    const isDisabled = Object.keys(errors).some(x => errors[x])

    return (
      <div className="container">
        <div className="contactform">
          <h3>Contact Form</h3>
          {/* To make form work, use your own formspree credentials in action="" */}
          <form action="" method="POST" onSubmit={this.handleSubmit}>
            <p>
              <label>Your name: </label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </p>
            <p>
              <label>Your email: </label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </p>
            <p>
              <label>Message: </label>
              <textarea
                name="message"
                value={this.state.textarea}
                onChange={this.handleTextareaChange}
              />
            </p>
            <p>
              <input disabled={isDisabled} type="submit" value="Send" />
            </p>
          </form>
          <div className="gmap">
            <Map />
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = authUser => !!authUser
const mapStateToProps = state => {
  return {
    users: state,
  }
}
const ContactPage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthorization(authCondition)
)(ContactForm)

class Contact extends Component {
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
            <ContactPage />
          </Layout>
        ) : (
          this.state.route
        )}
      </Fragment>
    )
  }
}

export default Contact
