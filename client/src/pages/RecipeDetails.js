import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const RecipeDetails = ({ recipeResults }) => {
  let { recipe_id } = useParams()
  const [thisRecipe, setThisRecipe] = useState()

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
  console.log(nutrients)

  useEffect(() => {
    displayRecipe()
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
          </div>
          <div className="rec-ingredients">
            <ul>
              <h2>Ingredients</h2>
              {thisRecipe?.nutrition?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <h4>{ingredient.name}</h4>
                  <h5>
                    {ingredient.amount}
                    {'  '}
                    {ingredient.unit}
                  </h5>
                </li>
              ))}
            </ul>
          </div>
          <div className="rec-nutrition">
            <ul className="rec-nut-list">
              <h2>Nutrition</h2>
              {nutrients?.map((nutrient) => (
                <li className="rec-nut-item">
                  <h4>{nutrient.name}</h4>
                  <h5>
                    {Math.floor(nutrient.amount)} {nutrient.unit}
                  </h5>
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
