import { useNavigate, useParams } from "react-router-dom"

const FoodCard = ({ groceryResults }) => {
  let navigate = useNavigate()

  return (
  <div className="grocery-cards">
    {groceryResults?.map((grocery, index) => (
      <div className="ind-grocery" key={index}>
        <h4>{grocery.name}</h4>
        <img src={`https://spoonacular.com/cdn/ingredients_500x500/${grocery.image}`}/>
      </div>
    ))}
  </div>
  )
}

export default FoodCard