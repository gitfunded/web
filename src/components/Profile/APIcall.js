/* eslint-disable */
import React, { useState, useEffect } from 'react'
import GitHubLogin from 'react-github-login'
import { Button, Split, Box, DataView, textStyle, theme } from '@aragon/ui'
import './buttonCustomStyle.css'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: localStorage.getItem('ACCESS TOKEN'),
})

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

  let TokenSave = localStorage.getItem('ACCESS TOKEN')

  ///// USER INFO

  const [name, setName] = useState(null)
  const [company, setCompany] = useState(null)
  const [repos, setRepos] = useState(null)
  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)

  async function a() {
    const { data } = await octokit.request('/user')
    console.log({ data })
    setName(data.name)
    setCompany(data.company)
    setRepos(data.public_repos)
    setFollowers(data.followers)
    setFollowing(data.following)
  }
  a()

  /////

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button mode='normal'>
          {localStorage.getItem('ACCESS TOKEN') ? (
            <GitHubLogin
              clientId='69bc88033c4b1bc2b4dc'
              redirectUri='http://localhost:3000/'
              onSuccess={onSuccess_disconnect}
              onFailure={onFailure_disconnect}
              buttonText={boolButtonText_disconnect}
              className='buttonCustomStyle'
            />
          ) : (
            <GitHubLogin
              clientId='69bc88033c4b1bc2b4dc'
              redirectUri='http://localhost:3000/'
              onSuccess={onSuccess}
              onFailure={onFailure}
              buttonText={boolButtonText}
              className='buttonCustomStyle'
            />
          )}
        </Button>
      </div>

      {localStorage.getItem('ACCESS TOKEN') ? (
        <Box heading='github stats'>
          <div style={{ textAlign: 'center' }}>
            <Box heading='name'>
              <div
                css={`
                  ${textStyle('title2')};
                `}
              >
                {name}
              </div>
            </Box>
            <Box heading='company'>
              <div
                css={`
                  ${textStyle('title2')};
                `}
              >
                {company}
              </div>
            </Box>
            <Box heading='followers'>
              <div
                css={`
                  ${textStyle('title2')};
                `}
              >
                {followers}
              </div>
            </Box>
            <Box heading='following'>
              <div
                css={`
                  ${textStyle('title2')};
                `}
              >
                {following}
              </div>
            </Box>
            <Box heading='repos'>
              <div
                css={`
                  ${textStyle('title2')};
                `}
              >
                {repos}
              </div>
            </Box>
          </div>
        </Box>
      ) : null}
    </>
  )
}

export default APIcall
