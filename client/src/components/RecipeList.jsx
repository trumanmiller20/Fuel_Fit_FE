import axios from "axios"
import { BASE_URL } from "../services/api"
import { useState, useEffect } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";

const RecipeList = ({ userProfile, user }) => {
  let navigate = useNavigate()
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

  const deleteUserRecipe = async (id, recipe_id) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(`${BASE_URL}/api/recipe/${id}/${recipe_id}/delete-recipe`, config)
    getUserRecipes()
  }

  useEffect(() => {
    getUserRecipes()
  }, [])

  return (
    <div className="recipe-list">
      <h1>Recipes</h1>
        {userRecipes?.map((recipe) => (
          <div className="ind-rec-li" key={recipe.id}>
            <div className="user-rec-main">
              <img src={recipe.image} />
              <h4>{recipe.title.charAt(0).toUpperCase() +
            recipe.title.slice(1)}</h4>
            </div>
            <div className="user-rec-btns">
              <button className="button" onClick={() => deleteUserRecipe(userProfile.id, recipe.id)}><DeleteOutlineOutlinedIcon /></button>
              <button className="button" onClick={() => navigate(`/user-recipe/${recipe.id}`)}>View</button>
            </div>
          </div>
        ))}
  </div>
  )
}

export default RecipeList