/* eslint-disable prettier/prettier */

import React, { useCallback, useMemo, useState } from 'react'
import { Header } from '@aragon/ui'

import DisputeDetail from './DisputeDetail'
import DisputeList from './DisputeList'

import { disputes } from '../../mock-data'

import Import from './Import'

function Disputes() {
  const [selectedDispute, selectDispute] = useSelectedDispute(disputes)

  const handleBack = useCallback(() => {
    selectDispute(-1)
  }, [selectDispute])

  return (
    <React.Fragment>
      <Header primary='Dashboard' />
      <Import />
      <br />
      <br />
      {selectedDispute ? (
        <DisputeDetail dispute={selectedDispute} onBack={handleBack} />
      ) : (
        <DisputeList
          disputes={disputes}
          selectDispute={selectDispute}
          // filteredDisputes={filteredDisputes}
          // disputeStatusFilter={disputeStatusFilter}
          // handleDisputeStatusFilterChange={handleDisputeStatusFilterChange}
          // disputeAppFilter={disputeAppFilter}
          // handleDisputeAppFilterChange={handleDisputeAppFilterChange}
          // handleClearFilters={handleClearFilters}
          // executionTargets={executionTargets}
        />
      )}
    </React.Fragment>
  )
}

const useSelectedDispute = (disputes) => {
  const [selectedDisputeId, setSelectedDisputeId] = useState(-1)

  const selectDispute = (disputeId) => setSelectedDisputeId(disputeId)

  const selectedDispute = useMemo(
    () => disputes.find((dispute) => dispute.id === selectedDisputeId) || null,
    [disputes, selectedDisputeId]
  )

  return [selectedDispute, selectDispute]
}

export default Disputes
