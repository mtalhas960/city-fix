import React from 'react'
import PageTitle from '../../components/PageTitle'
import Issues from '../../components/Issues'

const LiveMap = () => {
  return (
    <>
      <PageTitle
        title="Live City Map"
        description="Explore and track reported issues in your area"
        pageName="Live Map"
      />
      <Issues />
    </>
  )
}

export default LiveMap