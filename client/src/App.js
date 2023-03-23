import './App.css'
import { useState, useEffect } from 'react'
import Profile from './pages/Profile'
import About from './pages/About'
import Calculate from './pages/Calculate'
import Dashboard from './pages/Dashboard'
import FAQ from './pages/FAQ'
import Grocery from './pages/Grocery'
import LoginPage from './pages/LoginPage'
import Recipe from './pages/Recipe'
import RecipeDetails from './pages/RecipeDetails'
import UserRecipe from './pages/UserRecipe'
import NavBar from './components/NavBar'
import axios from 'axios'
import { BASE_URL } from './services/api'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  let initialTDEE = {
    height: '',
    weight: '',
    age: '',
    activity: ''
  }
  const [updateInfo, setUpdateInfo] = useState(initialTDEE)
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [recipeResults, setRecipeResults] = useState(null)
  const [recipeQuery, setRecipeQuery] = useState('')
  const [groceryQuery, setGroceryQuery] = useState('')
  const [groceryResults, setGroceryResults] = useState(null)
  const [gender, setGender] = useState('female')
  const [TDEE, setTDEE] = useState(null)

  const getRecipeResults = async (e) => {
    e.preventDefault()
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${recipeQuery}&number=30&addRecipeInformation=true&addRecipeNutrition=true`
    )
    setRecipeQuery('')
    setRecipeResults(res.data.results)
  }

  const getGroceryResults = async (e) => {
    e.preventDefault()
    const res = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${groceryQuery}&number=20`
    )
    setGroceryQuery('')
    setGroceryResults(res.data.results)
  }

  const getUserDetails = async () => {
    const res = await axios.get(`${BASE_URL}/api/user/details/${user.id}`)
    const userDetails = res.data
    setUserProfile(userDetails)
  }

  const calcFormTDEE = () => {
    let correctionVar
    if (gender === 'male') {
      correctionVar = -161
    } else if (gender === 'female') {
      correctionVar = 5
    }
    let REE =
      10 * updateInfo.weight +
      6.25 * updateInfo.height -
      5 * updateInfo.age +
      correctionVar
    const activityLevel = parseInt(updateInfo.activity)
    switch (activityLevel) {
      case 1:
        setTDEE(REE * 1.2)
        break
      case 2:
        setTDEE(REE * 1.375)
        break
      case 3:
        setTDEE(REE * 1.55)
        break
      case 4:
        setTDEE(REE * 1.725)
        break
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [user, TDEE])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              getUserDetails={getUserDetails}
            />
          }
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/user-recipe/:recipe_id"
          element={<UserRecipe userProfile={userProfile} />}
        ></Route>
        <Route
          path="/calculate"
          element={
            <Calculate
              userProfile={userProfile}
              setGender={setGender}
              gender={gender}
              updateInfo={updateInfo}
              setUpdateInfo={setUpdateInfo}
              initialTDEE={initialTDEE}
              getUserDetails={getUserDetails}
              setTDEE={setTDEE}
              TDEE={TDEE}
              calcFormTDEE={calcFormTDEE}
            />
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              getUserDetails={getUserDetails}
              userProfile={userProfile}
              user={user}
            />
          }
        ></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route
          path="/grocery"
          element={
            <Grocery
              groceryResults={groceryResults}
              getGroceryResults={getGroceryResults}
              groceryQuery={groceryQuery}
              setGroceryQuery={setGroceryQuery}
              userProfile={userProfile}
            />
          }
        ></Route>
        <Route
          path="/"
          element={
            <LoginPage setUser={setUser} getUserDetails={getUserDetails} />
          }
        ></Route>
        <Route
          path="/recipe"
          element={
            <Recipe
              recipeResults={recipeResults}
              getRecipeResults={getRecipeResults}
              recipeQuery={recipeQuery}
              setRecipeQuery={setRecipeQuery}
            />
          }
        ></Route>
        <Route
          path="/recipe-details/:recipe_id"
          element={
            <RecipeDetails
              recipeResults={recipeResults}
              userProfile={userProfile}
            />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App
