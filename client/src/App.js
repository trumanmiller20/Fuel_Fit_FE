import './App.css'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/calculate" element={<Calculate />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/food-details/:food_id" element={<FoodDetails />}></Route>
        <Route path="/grocery" element={<Grocery />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/recipe" element={<Recipe />}></Route>
        <Route
          path="/recipe-details/:recipe_id"
          element={<RecipeDetails />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
