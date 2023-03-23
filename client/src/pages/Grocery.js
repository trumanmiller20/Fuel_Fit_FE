import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FoodCard from '../components/FoodCard'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'

const Grocery = ({
  groceryResults,
  getGroceryResults,
  groceryQuery,
  setGroceryQuery,
  userProfile
}) => {
  const handleChange = (e) => {
    e.preventDefault()
    setGroceryQuery(e.target.value)
  }
  console.log(groceryResults)

  return (
    <div className="grocery">
      <SideBar />
      <div className="grocery-search">
        <form onSubmit={getGroceryResults}>
          <h1>
            <ShoppingCartOutlined /> Search Grocery Items
          </h1>
          <input
            className="element-input"
            onChange={handleChange}
            type="text"
            placeholder="i.e: chicken breast"
            value={groceryQuery}
            required
          />
          <button type="submit" className="button" id="gro-search-btn">
            Search
          </button>
        </form>
        <div className="recipe-results">
          <FoodCard groceryResults={groceryResults} userProfile={userProfile} />
        </div>
      </div>
    </div>
  )
}

export default Grocery
