const RecipeCard = ({ searchResults }) => {
  return (
  <div className="recipe-cards">
    {searchResults?.map((recipe, index) => (
      <div className="ind-recipe" key={index}>
        <h3>{recipe.title}</h3>
        <img src={recipe.image}/>
        <h4>Cal/srv: {recipe.nutrition.nutrients[0].amount}</h4>
        <h4>Prep time: {recipe.readyInMinutes} min.</h4>
      </div>
    ))}
  </div>
  )
}

export default RecipeCard