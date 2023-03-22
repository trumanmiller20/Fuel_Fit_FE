import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const RecipeDetails = ({ recipeResults, userProfile }) => {
  let navigate = useNavigate()
  let { recipe_id } = useParams()
  const [thisRecipe, setThisRecipe] = useState()
  const [showInstruct, setShowInstruct] = useState(true)

  const displayRecipe = () => {
    const result = recipeResults.filter(
      (recipe) => recipe.id === parseInt(recipe_id)
    )
    setThisRecipe(result[0])
  }

  let glutenFree
  const checkGluten = () => {
    if (thisRecipe?.glutenFree === true) {
      glutenFree = <h4>GLUTEN FREE</h4>
    }
    return glutenFree
  }

  let dairyFree
  const checkDairy = () => {
    if (thisRecipe?.dairyFree === true) {
      dairyFree = <h4>DAIRY FREE</h4>
    }
    return dairyFree
  }

  checkGluten()
  checkDairy()

  let nutrients = []
  const getNutrients = () => {
    for (let i = 0; i < 9; i++) {
      nutrients.push(thisRecipe?.nutrition.nutrients[i])
    }
  }
  getNutrients()

  const toggleInstructions = () => {
    if (showInstruct === true) {
      setShowInstruct(false)
    } else {
      setShowInstruct(true)
    }
  }

  let formattedInstructions = []
  const formatInstructions = () => {
    for (
      let i = 0;
      i < thisRecipe?.analyzedInstructions[0]?.steps.length;
      i++
    ) {
      formattedInstructions.push(
        thisRecipe?.analyzedInstructions[0].steps[i].step
      )
    }
    return formattedInstructions
  }

  let formattedIngredients = []
  const formatIngredients = () => {
    for (let i = 0; i < thisRecipe?.nutrition.ingredients.length; i++) {
      formattedIngredients.push(thisRecipe?.nutrition.ingredients[i].name)
    }
    return formattedIngredients
  }

  const reqBody = {
    title: thisRecipe?.title,
    api_id: thisRecipe?.id,
    image: thisRecipe?.image,
    ingredients: formattedIngredients,
    instructions: formattedInstructions,
    calories: Math.floor(nutrients[0]?.amount),
    fat: Math.floor(nutrients[1]?.amount),
    protein: Math.floor(nutrients[8]?.amount),
    carbs: Math.floor(nutrients[3]?.amount)
  }

  console.log(userProfile)

  const saveUserRecipe = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.post(
      `${BASE_URL}/api/recipe/${userProfile.id}/add-recipe`,
      reqBody,
      config
    )
  }

  useEffect(() => {
    displayRecipe()
    formatInstructions()
    formatIngredients()
  }, [recipeResults])

  console.log(thisRecipe)

  return (
    <div className="selected-recipe">
      {thisRecipe ? (
        <div className="this-recipe">
          <div className="recipe-header">
            <img src={thisRecipe.image} />
            <h1>{thisRecipe.title}</h1>
            <div className="recipe-tags">
              {glutenFree} {dairyFree}
            </div>
            <h4>Prep time: {thisRecipe.readyInMinutes} min.</h4>
            <h4>Servings: {thisRecipe.servings}</h4>
            <div className="rec-hdr-btns">
              <button className="button" onClick={saveUserRecipe}>
                SAVE
              </button>
              <button className="button" onClick={() => navigate('/recipe')}>
                Return to Search
              </button>
            </div>
          </div>
          {showInstruct ? (
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
                {thisRecipe?.nutrition?.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <div className="ind-ing-item">
                      <h3>
                        {ingredient.amount}
                        {'  '}
                        {ingredient.unit}
                      </h3>
                      <h3>-</h3>
                      <h3>
                        {ingredient.name.charAt(0).toUpperCase() +
                          ingredient.name.slice(1)}
                      </h3>
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
                {thisRecipe?.analyzedInstructions[0]?.steps.map(
                  (step, index) => (
                    <li key={index}>
                      <div className="ind-inst-item">
                        <p>{step.step}</p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <div className="rec-nutrition">
            <ul className="rec-nut-list">
              <h2>Nutrition</h2>
              <hr />
              {nutrients?.map((nutrient, index) => (
                <li className="rec-nut-item" key={index}>
                  <h4>{nutrient.name}:</h4>
                  <h4>
                    {Math.floor(nutrient.amount)} {nutrient.unit}
                  </h4>
                </li>
              ))}
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

export default RecipeDetails
