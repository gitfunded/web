/* eslint-disable prettier/prettier */
import React from 'react'
import { Header, Split } from '@aragon/ui'
import ProfileHeader from './ProfileHeader'
import DashboardStats from './DashboardStats'

function Profile() {
  return (
    <React.Fragment>
      <Header primary='Profile' />
      <ProfileHeader active />
      <Split secondary={<DashboardStats />} />
    </React.Fragment>
  )
}

export default Profile
