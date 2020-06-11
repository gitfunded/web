/* eslint-disable */
import { useEffect, useState, useCallback } from 'react'
import { useContract } from '../web3-contracts'

import { useActivity } from '../components/Activity/ActivityProvider'

import GitFundedGrantFactory from '../contracts/GitFundedGrantFactory.json'

const GAS_LIMIT = 3000000

// Project creation contract
function useProjectFetchContract() {
  return useContract(
    GitFundedGrantFactory.networks['10'].address,
    GitFundedGrantFactory.abi
  )
}

export function useProjectAddActions() {
  const { addActivity } = useActivity()
  const projectFetchContract = useProjectFetchContract()

  const fetch = useCallback(
    (id, name, budget) => {
      return addActivity(
        projectFetchContract.fetchProject(id, name, budget),
        'fetchProject',
        { id: id, name: name, budget: budget }
      )
    },
    [addActivity, projectFetchContract]
  )
  return { fetch }
}
