import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
    if (thisRecipe.glutenFree === true) {
      glutenFree = <h5>GLUTEN FREE</h5>
    }
    return glutenFree
  }

  checkGluten()

  useEffect(() => {
    displayRecipe()
  }, [recipeResults])
  console.log(thisRecipe)
  return (
    <div className="selected-recipe">
      {thisRecipe ? (
        <div className="this-recipe">
          <img src={thisRecipe.image} />
          <h1>{thisRecipe.title}</h1>
          {glutenFree}
          <h2>Prep time: {thisRecipe.readyInMinutes} min.</h2>
          <h2>Servings: {thisRecipe.servings}</h2>
          <div className="ingredients">
            <ul>
              {thisRecipe?.nutrition?.ingredients.map((ingredient, index) => (
                <li className="ind-ingredient" key={index}>
                  <h4>{ingredient.name}</h4>
                  <h4>
                    {ingredient.amount}
                    {'  '}
                    {ingredient.unit}
                  </h4>
                  <h4></h4>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className='' */}
          <h2></h2>
          <h2></h2>
          <h2></h2>
          <h2></h2>
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
