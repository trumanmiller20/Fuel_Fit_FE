import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RecipeDetails = ({ recipeResults }) => {
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

  const formatInstructions = () => {
    let instructions = []
    for (
      let i = 0;
      i < thisRecipe?.analyzedInstructions[0]?.steps.length;
      i++
    ) {
      instructions.push(thisRecipe?.analyzedInstructions[0].steps[i].step)
    }
    return instructions
  }

  const formatIngredients = () => {
    let ingredients = []
    for (let i = 0; i < thisRecipe?.nutrition.ingredients.length; i++) {
      ingredients.push(thisRecipe?.nutrition.ingredients[i].name)
    }
    return ingredients
  }

  formatInstructions()
  formatIngredients()
  console.log(thisRecipe)

  useEffect(() => {
    displayRecipe()
  }, [recipeResults])

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
              <button className="button">SAVE</button>
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
