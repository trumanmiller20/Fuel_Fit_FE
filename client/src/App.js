import './App.css'
import { useState, useEffect } from 'react'
import NavBar from './components/TopBar'
import About from './pages/About'
import Calculate from './pages/Calculate'
import Dashboard from './pages/Dashboard'
import FAQ from './pages/FAQ'
import FoodDetails from './pages/FoodDetails'
import Grocery from './pages/Grocery'
import LoginPage from './pages/LoginPage'
import Recipe from './pages/Recipe'
import RecipeDetails from './pages/RecipeDetails'
import axios from 'axios'
import { BASE_URL } from './services/api'
import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { ColorModeContext, useMode } from './theme'

const App = () => {
  const [user, setUser] = useState(null)
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <main className="content">
            <Routes>
              <Route path="/about" element={<About />}></Route>
              <Route path="/calculate" element={<Calculate />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/faq" element={<FAQ />}></Route>
              <Route
                path="/food-details/:food_id"
                element={<FoodDetails />}
              ></Route>
              <Route path="/grocery" element={<Grocery />}></Route>
              <Route path="/" element={<LoginPage setUser={setUser} />}></Route>
              <Route path="/recipe" element={<Recipe />}></Route>
              <Route
                path="/recipe-details/:recipe_id"
                element={<RecipeDetails />}
              ></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
