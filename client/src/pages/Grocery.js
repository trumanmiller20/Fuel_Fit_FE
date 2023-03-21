import SideBar from '../components/SideBar'
import { BASE_URL } from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Grocery = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }
  const API_KEY = process.env.REACT_APP_SPOONACULAR_KEY

  const getSearchResults = async () => {
    const res = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${API_KEY}&query=${searchQuery}&number=5&metaInformation=true`
    )
    console.log(res)
    // setSearchResults(res.products)
  }

  return (
    <div className="grocery">
      <SideBar />
      <form className="grocery-search" onSubmit={getSearchResults}>
        <h1>Search Grocery Items</h1>
        <div className="form-element">
          {/* <label className="element-label" htmlFor="query">
            Search Query:
          </label> */}
          <input
            className="element-input"
            onChange={handleChange}
            type="text"
            placeholder="i.e: chicken breast"
            value={searchQuery}
            required
          />
        </div>
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default Grocery
