/* eslint-disable  */
import React, { useState, useRef } from 'react'
import {
  SidePanel,
  Button,
  DropDown,
  TextInput,
  LoadingRing,
  ToastHub,
  Toast,
} from '@aragon/ui'
import { Octokit } from '@octokit/rest'
import { useWallet } from 'use-wallet'
import { useProjectCreationActions } from '../../hooks/useProjectCreation'

function Import() {
  const wallet = useWallet()

  const [USERNAME, SETUSERNAME] = useState(null)

  const [opened, setOpened] = useState(false)

  const [list, setList] = useState([])

  // const [loading, setLoading] = useState(false)

  const { create } = useProjectCreationActions()

  const TOKEN = localStorage.getItem('ACCESS TOKEN')

  const octokit = new Octokit({
    auth: TOKEN,
  })

  const [publicRepos, setPublicRepos] = useState(0)
  async function userInfo() {
    const { data } = await octokit.request('/user')
    let num = data.public_repos
    setPublicRepos(num - 1)
    return data
  }

  async function listUserRepos() {
    setOpened(true)
    let repoList = []
    const user = await userInfo()
    for (let page = 1; page <= Math.ceil(user.public_repos / 100); page++) {
      const { data } = await octokit.repos.listForAuthenticatedUser({
        per_page: 100,
        page: page,
      })
      let repoIndex = 0
      while (repoIndex < data.length) {
        repoList.push({ name: data[repoIndex].name, id: data[repoIndex].id })
        repoIndex++
      }
      setList([...repoList])
    }

    return repoList
  }

  function handleClose() {
    setOpened(false)
  }

  const [selected, setSelected] = useState(-1)

  function handleOnChange(index, items) {
    setSelected(index)
  }

  const inputBudget = useRef(null)
  const inputName = useRef(null)
  const inputDropdown = useRef(null)

  async function handleProjectCreation() {
    let nameInput = inputName.current.value
    let budgetInput = inputBudget.current.value
    let dropdownInput = list[selected].id
    await create(dropdownInput.toString(), nameInput, budgetInput)
  }

  return (
    <>
      {wallet.account !== null &&
      localStorage.getItem('ACCESS TOKEN') !== null ? (
        <Button mode='strong' onClick={listUserRepos}>
          Import Project
        </Button>
      ) : (
        <ToastHub timeout={100}>
          <Toast>
            {(toast) => (
              <Button onClick={() => toast('Please Connect to Github first')}>
                Import Project
              </Button>
            )}
          </Toast>
        </ToastHub>
      )}

      <SidePanel onClose={handleClose} title='Repository' opened={opened}>
        {list.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '4rem',
            }}
          >
            <LoadingRing mode='half-circle' />
          </div>
        ) : (
          <>
            <DropDown
              selected={selected}
              onChange={handleOnChange}
              items={[...list.map((i) => i.name)]}
              ref={inputDropdown}
              style={{
                marginTop: '4rem',
              }}
            />
            {console.log(selected)}
            <TextInput
              ref={inputName}
              style={{ marginTop: '2rem' }}
              placeholder='Provide a Name'
            />
            <TextInput
              ref={inputBudget}
              style={{ marginTop: '2rem' }}
              placeholder='Budget'
            />
            <Button
              onClick={handleProjectCreation}
              style={{ marginTop: '4rem' }}
              mode='positive'
            >
              Import Project
            </Button>
          </>
        )}
      </SidePanel>
    </>
  )
}

export default Import
