import { useNavigate, useParams } from "react-router-dom"


const RecipeCard = ({ recipeResults }) => {
  let navigate = useNavigate()
  return (
  <div className="recipe-cards">
    {recipeResults?.map((recipe, index) => (
      <div className="ind-recipe" key={index} onClick={() => navigate(`/recipe-details/${recipe.id}`)}>
        <img src={recipe.image}/>
        <h4>{recipe.title}</h4>
        <h5>{Math.round(parseInt(recipe.nutrition.nutrients[0].amount)).toString()} cal/serving</h5>
        <h5>{recipe.readyInMinutes} min.</h5>
      </div>
    ))}
  </div>
  )
}

export default RecipeCard