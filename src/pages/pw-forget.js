import React, { Fragment } from 'react'

import Layout from '../components/layout'
import PasswordForgetForm from '../components/PasswordForget'

const PasswordForgetPage = () => (
  <Fragment>
    <div className="pwdforgot signinpage">
      <h1>Forget Password</h1>
      <PasswordForgetForm />
    </div>
  </Fragment>
)

export default () => (
  <Layout>
    <div className="container">
      <PasswordForgetPage />
    </div>
  </Layout>
)
