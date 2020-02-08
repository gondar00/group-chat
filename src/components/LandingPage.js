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
      onError={(e) => {
        console.log(e)
        alert('Error')
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
                    Group chat application
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
                              insert_user()
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
