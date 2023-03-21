const RecipeCard = ({ searchResults }) => {
  return (
  <div className="recipe-cards">
    {searchResults?.map((recipe, index) => (
      <div className="ind-recipe" key={index}>
        <img src={recipe.image}/>
        <h4>{recipe.title}</h4>
        <h5>{Math.round(parseInt(recipe.nutrition.nutrients[0].amount)).toString()} cal/serving</h5>
        <h5>{recipe.readyInMinutes} min.</h5>
        {/* <button className="button" id="rec-det-btn">VIEW</button> */}
      </div>
    ))}
  </div>
  )
}

export default RecipeCard