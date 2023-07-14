import React from 'react'
import HabitDashboard from '../../components/habbbit-dashboard/HabitDashboard'

function Exercise() {
  return (
    <>
    <HabitDashboard type="exercise" setPage={setPage}/>
    </>
  )
}

export default Exercise