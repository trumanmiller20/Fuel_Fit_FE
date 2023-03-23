import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'

const Dashboard = ({ getUserDetails }) => {
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className="dashboard">
      <SideBar />
      <div className="user-dashboard"></div>
    </div>
  )
}
export default Dashboard
