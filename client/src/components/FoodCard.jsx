import { useNavigate, useParams } from "react-router-dom"

const FoodCard = ({ groceryResults }) => {
  let navigate = useNavigate()

  return (
  <div className="grocery-cards">
    {groceryResults?.map((grocery, index) => (
      <div className="ind-grocery" key={index}>
        <div className="grocery-title">
          <h4>{grocery.name.charAt(0).toUpperCase() +
                          grocery.name.slice(1)}</h4>
        </div>
        <img src={`https://spoonacular.com/cdn/ingredients_500x500/${grocery.image}`}/>
      </div>
    ))}
  </div>
  )
}

export default FoodCard