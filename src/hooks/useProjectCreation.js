/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react'
import { useContract } from '../web3-contracts'

import { useActivity } from '../components/Activity/ActivityProvider'

import ProjectCreation from '../contracts/GitFundedGrantFactory.json'

const GAS_LIMIT = 3000000

// Project creation contract
function useProjectCreationContract() {
  return useContract(
    ProjectCreation.networks['10'].address,
    ProjectCreation.abi
  )
}

export function useProjectCreationActions() {
  const { addActivity } = useActivity()
  const projectCreationContract = useProjectCreationContract()

  const create = useCallback(
    (id, name, budget) => {
      return addActivity(
        projectCreationContract.newProject(id, name, budget),
        'newProject',
        { id: id, name: name, budget: budget }
      )
    },
    [addActivity, projectCreationContract]
  )
  return { create }
}
