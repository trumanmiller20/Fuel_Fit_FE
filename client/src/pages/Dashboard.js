import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import GroceryList from '../components/GroceryList'

const Dashboard = ({ getUserDetails, userProfile }) => {
  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div className="dashboard">
      <SideBar />
      <div className="user-dashboard">
        <GroceryList userProfile={userProfile} />
      </div>
    </div>
  )
}
export default Dashboard
