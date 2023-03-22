import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'
import RestaurantOutlined from '@mui/icons-material/RestaurantOutlined'

const Recipe = ({
  recipeResults,
  getRecipeResults,
  recipeQuery,
  setRecipeQuery
}) => {
  const handleChange = (e) => {
    e.preventDefault()
    setRecipeQuery(e.target.value)
  }

  return (
    <div className="recipe">
      <SideBar />
      <div className="recipe-search">
        <form onSubmit={getRecipeResults}>
          <h1>
            <RestaurantOutlined /> Search Recipes
          </h1>
          <input
            className="element-input"
            onChange={handleChange}
            type="text"
            placeholder="i.e: pasta"
            value={recipeQuery}
            required
          />
          <button type="submit" className="button" id="rec-search-btn">
            Search
          </button>
        </form>
        <div className="recipe-results">
          <RecipeCard recipeResults={recipeResults} />
        </div>
      </div>
    </div>
  )
}

export default Recipe
