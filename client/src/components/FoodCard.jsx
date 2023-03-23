import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"
import { BASE_URL } from "../services/api"

const FoodCard = ({ groceryResults, userProfile}) => {
  let navigate = useNavigate()

  const addUserGroceryItem = async (id, name, image) => {
    let groceryItem = {
        name: name,
        api_id: id,
        image: image
      }
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.post(
      `${BASE_URL}/api/grocery/${userProfile.id}/add-grocery-item`,
      groceryItem,
      config
    )
  }

  return (
  <div className="grocery-cards">
    {groceryResults?.map((grocery, index) => (
      <div className="ind-grocery" key={index}>
        <h4>{grocery.name.charAt(0).toUpperCase() +
          grocery.name.slice(1)}
        </h4>
        <button className="button" onClick={() => {addUserGroceryItem(grocery.id, grocery.name, grocery.image)}}>Add to List</button>
        <img src={`https://spoonacular.com/cdn/ingredients_500x500/${grocery.image}`}/>
      </div>
    ))}
  </div>
  )
}

export default FoodCard