import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import GroceryList from '../components/GroceryList'
import RecipeList from '../components/RecipeList'

const Dashboard = ({ getUserDetails, userProfile, user }) => {
  const [userTDEE, setUserTDEE] = useState()

  const calcUserTDEE = async () => {
    await userProfile
    let correctionVar
    if (userProfile.gender === 'male') {
      correctionVar = -161
    } else if (userProfile.gender === 'female') {
      correctionVar = 5
    }
    let REE =
      10 * userProfile.weight +
      6.25 * userProfile.height -
      5 * userProfile.age +
      correctionVar
    const activityLevel = userProfile.activity
    switch (activityLevel) {
      case 1:
        setUserTDEE(Math.floor(REE * 1.2))
        break
      case 2:
        setUserTDEE(Math.floor(REE * 1.375))
        break
      case 3:
        setUserTDEE(Math.floor(REE * 1.55))
        break
      case 4:
        setUserTDEE(Math.floor(REE * 1.725))
        break
    }
  }
  useEffect(() => {
    calcUserTDEE()
  }, [userProfile])
  console.log(userProfile)
  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-all">
        <div className="user-card">
          <h1>Dashboard</h1>
          <div className="user-card-data">
            <h2>
              {userProfile?.firstName} {userProfile?.lastName}
            </h2>
            <hr />
            <h3>TDEE: {userTDEE} cal</h3>
            <h3>Height: {userProfile?.height} cm</h3>
            <h3>Weight: {userProfile?.weight} kg</h3>
            <h3>Age: {userProfile?.age} yrs</h3>
            <h3>Activity Level: {userProfile?.activity}</h3>
          </div>
        </div>
        <RecipeList userProfile={userProfile} user={user} />
        <GroceryList userProfile={userProfile} user={user} />
      </div>
    </div>
  )
}
export default Dashboard
