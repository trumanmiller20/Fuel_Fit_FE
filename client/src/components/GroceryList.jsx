import axios from "axios"
import { BASE_URL } from "../services/api"
import { useState, useEffect } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const GroceryList = ({ userProfile, user }) => {
  const [userGroceries, setUserGroceries] = useState()

  const getUserGroceries = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios.get(`${BASE_URL}/api/grocery/${user.id}/groceries`, config)
    setUserGroceries(res.data)
  }

  const deleteUserGrocery = async (id, grocery_id) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(`${BASE_URL}/api/grocery/${id}/${grocery_id}/delete-grocery-item`, config)
    getUserGroceries()
  }

  useEffect(() => {
    getUserGroceries()
  }, [])

  return (
    <div className="grocery-list">
      <h1>Grocery List</h1>
        {userGroceries?.map((grocery) => (
          <div className="ind-groc-li" key={grocery.id}>
            <img src={`https://spoonacular.com/cdn/ingredients_500x500/${grocery.image}`} />
            <h4>{grocery.name.charAt(0).toUpperCase() +
          grocery.name.slice(1)}</h4>
            <button className="button" onClick={() => deleteUserGrocery(userProfile.id, grocery.id)}><DeleteOutlineOutlinedIcon /></button>
          </div>
        ))}
  </div>
  )
}

export default GroceryList