import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'

const Dashboard = ({ getUserDetails }) => {
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className="dashboard">
      <SideBar />
    </div>
  )
}
export default Dashboard
