import axios from "axios"
import { BASE_URL } from "../services/api"
import { useState, useEffect } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const RecipeList = ({ userProfile, user }) => {
  const [userRecipes, setUserRecipes] = useState()

  const getUserRecipes = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios.get(`${BASE_URL}/api/recipe/${user.id}`, config)
    setUserRecipes(res.data)
  }

  useEffect(() => {
    getUserRecipes()
  }, [])

  return (
    <div className="recipe-list">
      <h1>Recipe List</h1>
        {userRecipes?.map((recipe) => (
          <div className="ind-rec-li" key={recipe.id}>
            <div className="user-rec-main">
              <img src={recipe.image} />
              <h4>{recipe.title.charAt(0).toUpperCase() +
            recipe.title.slice(1)}</h4>
            </div>
            <div className="user-rec-btns">
              <button className="button"><DeleteOutlineOutlinedIcon /></button>
              <button className="button">View</button>
            </div>
          </div>
        ))}
  </div>
  )
}

export default RecipeList