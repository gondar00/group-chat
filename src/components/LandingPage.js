import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import '../App.css'

const addUser = gql`
  mutation ($username: String!) {
    insert_user (
      objects: [{
        username: $username
      }]
    ) {
      returning {
        id
        username
      }
    }
  }
`

const LandingPage = (props) => {
  const reactLogo = require('../images/React-logo.png')
  const graphql = require('../images/graphql.png')
  const hasuraLogo = require('../images/green-logo-white.svg')
  const apolloLogo = require('../images/apollo.png')
  const rightImg = require('../images/chat-app.png')
  const handleKeyPress = (key, mutate, loading) => {
    if (!loading && key.charCode === 13) {
      mutate()
    }
  }
  return (
    <Mutation
      mutation={addUser}
      variables={{
        username: props.username
      }}
      onCompleted={(data) => {
        props.login(data.insert_user.returning[0].id)
      }}
      onError={() => {
        alert('Please try again with a different username.')
        props.setUsername('')
      }}
    >
      {
        (insert_user, { data, loading, error }) => {
          return (
            <div className='container-fluid minHeight'>
              <div className='bgImage' />
              <div>
                <div className='headerWrapper'>
                  <div className='headerDescription'>
                    Group chat application <i className='em em-sunglasses' />
                  </div>
                </div>
                <div className='mainWrapper'>
                  <div className='col-md-5 col-sm-6 col-xs-12 noPadd'>
                    <div className='formGroupWrapper'>
                      <div className='input-group inputGroup'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter your username'
                          value={props.username}
                          onChange={(e) => props.setUsername(e.target.value)}
                          onKeyPress={(key) => handleKeyPress(key, insert_user, loading)}
                          disabled={loading}
                        />
                        <div className='input-group-append groupAppend'>
                          <button
                            className='btn btn-outline-secondary'
                            type='submit'
                            onClick={(e) => {
                              e.preventDefault()
                              if (props.username.match(/^[a-z0-9_-]{3,15}$/g)) {
                                insert_user()
                              } else {
                                alert('Invalid username. Spaces and special characters not allowed. Please try again')
                                props.setUsername('')
                              }
                            }}
                            disabled={loading || props.username === ''}
                          >
                            {loading ? 'Please wait ...' : 'Get Started'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      }
    </Mutation>
  )
}

LandingPage.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default LandingPage
