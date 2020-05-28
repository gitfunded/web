/* eslint-disable */
import React, { useState, useEffect } from 'react'
import GitHubLogin from 'react-github-login'
import { Button } from '@aragon/ui'
import './test.css'

function APIcall() {
  const [boolButtonText, setBoolButtonText] = useState('CONNECT')
  const [boolButtonText_disconnect, setBoolButtonText_disconnect] = useState(
    'DISCONNECT'
  )

  const onSuccess = function(details) {
    const code = details.code

    fetch(`https://gitfund-oauth.herokuapp.com/authenticate/${code}`)
      .then((response) => response.json())
      .then(({ token }) => localStorage.setItem('ACCESS TOKEN', token))

    // if (boolButtonText === 'CONNECT') {
    //   setBoolButtonText('DISCONNECT')
    // } else {
    //   setBoolButtonText('CONNECT')
    // }
    setBoolButtonText('DISCONNECT')
  }

  const onSuccess_disconnect = function() {
    localStorage.removeItem('ACCESS TOKEN')
    setBoolButtonText_disconnect('CONNECT')
  }

  const onFailure_disconnect = function() {
    return null
  }

  const onFailure = (response) => console.error(response)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button mode='normal'>
        {localStorage.getItem('ACCESS TOKEN') ? (
          <GitHubLogin
            clientId='69bc88033c4b1bc2b4dc'
            redirectUri='http://localhost:3000/'
            onSuccess={onSuccess_disconnect}
            onFailure={onFailure_disconnect}
            buttonText={boolButtonText_disconnect}
            // buttonText='DISCONNECT'
            className='testcss'
          />
        ) : (
          <GitHubLogin
            clientId='69bc88033c4b1bc2b4dc'
            redirectUri='http://localhost:3000/'
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText={boolButtonText}
            //buttonText='CONNECT'
            className='testcss'
          />
        )}

        {/* <GitHubLogin
          clientId='69bc88033c4b1bc2b4dc'
          redirectUri='http://localhost:3000/'
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText={boolButtonText}
          className='testcss'
        /> */}
      </Button>
    </div>
  )
}

export default APIcall
