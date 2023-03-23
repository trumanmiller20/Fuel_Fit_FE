import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const UserRecipe = ({ userProfile }) => {
  let navigate = useNavigate()
  let { recipe_id } = useParams()
  const [userRecipe, setUserRecipe] = useState()
  const [showInstructions, setShowInstructions] = useState(true)

  const getUserRecipe = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios.get(
      `${BASE_URL}/api/recipe/${userProfile.id}/${recipe_id}`,
      config
    )
    setUserRecipe(res.data)
    console.log(userRecipe)
  }

  const toggleInstructions = () => {
    if (showInstructions === true) {
      setShowInstructions(false)
    } else {
      setShowInstructions(true)
    }
  }

  useEffect(() => {
    getUserRecipe()
  }, [])

  return (
    <div className="selected-user-recipe">
      <SideBar />
      {userRecipe ? (
        <div className="this-recipe">
          <div className="recipe-header">
            <img src={userRecipe.image} />
            <h1>{userRecipe.title}</h1>
            <div className="rec-hdr-btns">
              <button className="button" onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </button>
            </div>
          </div>
          {showInstructions ? (
            <div className="rec-ingredients">
              <ul className="rec-ing-list">
                <div className="ing-hdr">
                  <h2>Ingredients</h2>
                  <button
                    className="button"
                    onClick={() => toggleInstructions()}
                  >
                    Recipe Instructions
                  </button>
                </div>
                <hr />
                {userRecipe?.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <div className="ind-ing-item">
                      <h3>{ingredient}</h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rec-instructions">
              <ul className="rec-inst-list">
                <div className="inst-hdr">
                  <h2>Instructions</h2>
                  <button
                    className="button"
                    onClick={() => toggleInstructions()}
                  >
                    Ingredients
                  </button>
                </div>
                <hr />
                {userRecipe?.instructions.map((step, index) => (
                  <li key={index}>
                    <div className="ind-inst-item">
                      <p>{step}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rec-nutrition">
            <ul className="rec-nut-list">
              <h2>Nutrition</h2>
              <hr />
              <li className="rec-nut-item">
                <h4>Calories: {userRecipe.calories} cal</h4>
              </li>
              <li className="rec-nut-item">
                <h4>Fat: {userRecipe.fat} g</h4>
              </li>
              <li className="rec-nut-item">
                <h4>Carbs: {userRecipe.carbs} g</h4>
              </li>
              <li className="rec-nut-item">
                <h4>Protein: {userRecipe.protein} g</h4>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h1>Recipe Loading...</h1>
        </div>
      )}
    </div>
  )
}

export default UserRecipe
