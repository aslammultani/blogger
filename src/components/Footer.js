import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer style={{ textAlign: 'center' }}>
        <p>
          {' '}
          Copyright © 2019 Powered by{' '}
          <b>
            <a
              href="https://www.multidots.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#8193fe' }}
            >
              Multidots
            </a>
            .
          </b>{' '}
          All rights reserved.{' '}
        </p>
      </footer>
    )
  }
}

export default Footer
