import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import RestaurantOutlined from '@mui/icons-material/RestaurantOutlined'

const Recipe = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const handleChange = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }

  const getSearchResults = async (e) => {
    e.preventDefault()
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&number=30&addRecipeInformation=true&addRecipeNutrition=true`
    )
    setSearchQuery('')
    console.log(res)
    setSearchResults(res.data.results)
  }

  return (
    <div className="recipe">
      <SideBar />
      <div className="recipe-search">
        <form onSubmit={getSearchResults}>
          <h1>
            <RestaurantOutlined /> Search Recipes
          </h1>
          <input
            className="element-input"
            onChange={handleChange}
            type="text"
            placeholder="i.e: pasta"
            value={searchQuery}
            required
          />
          <button type="submit" class="button" id="rec-search-btn">
            Search
          </button>
        </form>
        <div class="recipe-results">
          <RecipeCard searchResults={searchResults} />
        </div>
      </div>
    </div>
  )
}

export default Recipe
