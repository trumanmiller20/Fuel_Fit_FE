import './App.css'
import { useState, useEffect } from 'react'
import Profile from './pages/Profile'
import About from './pages/About'
import Calculate from './pages/Calculate'
import Dashboard from './pages/Dashboard'
import FAQ from './pages/FAQ'
import FoodDetails from './pages/FoodDetails'
import Grocery from './pages/Grocery'
import LoginPage from './pages/LoginPage'
import Recipe from './pages/Recipe'
import RecipeDetails from './pages/RecipeDetails'
import NavBar from './components/NavBar'
import axios from 'axios'
import { BASE_URL } from './services/api'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [recipeResults, setRecipeResults] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const getRecipeResults = async (e) => {
    e.preventDefault()
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&number=30&addRecipeInformation=true&addRecipeNutrition=true`
    )
    setSearchQuery('')
    setRecipeResults(res.data.results)
  }

  const getUserDetails = async () => {
    const res = await axios.get(`${BASE_URL}/api/user/details/${user.id}`)
    const userDetails = res.data
    setUserProfile(userDetails)
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/calculate" element={<Calculate />}></Route>
        <Route
          path="/dashboard"
          element={<Dashboard getUserDetails={getUserDetails} />}
        ></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/food-details/:food_id" element={<FoodDetails />}></Route>
        <Route path="/grocery" element={<Grocery />}></Route>
        <Route path="/" element={<LoginPage setUser={setUser} />}></Route>
        <Route
          path="/recipe"
          element={
            <Recipe
              recipeResults={recipeResults}
              getRecipeResults={getRecipeResults}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        ></Route>
        <Route
          path="/recipe-details/:recipe_id"
          element={<RecipeDetails recipeResults={recipeResults} />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
