import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const RecipeDetails = ({ recipeResults }) => {
  let { recipe_id } = useParams()
  const [thisRecipe, setThisRecipe] = useState({})

  const result = recipeResults.filter(
    (recipe) => recipe.id === parseInt(recipe_id)
  )

  const displayRecipe = () => {
    setThisRecipe(result)
  }

  // useEffect(() => {
  //   if (result) {
  //     displayRecipe()
  //   }
  // }, [result])

  return <div></div>
}

export default RecipeDetails
