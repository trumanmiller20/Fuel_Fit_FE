import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import { Link } from 'react-router-dom'

const Calculate = ({
  userProfile,
  setGender,
  gender,
  updateInfo,
  setUpdateInfo,
  initialTDEE,
  getUserDetails,
  setTDEE,
  TDEE,
  calcFormTDEE
}) => {
  const [lbs, setLbs] = useState()
  const [inches, setInches] = useState()
  const [maleDisabled, setMaleDisabled] = useState(false)
  const [femaleDisabled, setFemaleDisabled] = useState(true)

  const resetTDEEForms = () => {
    setUpdateInfo(initialTDEE)
    setLbs()
    setInches()
    getUserDetails()
    setGender('female')
  }

  const updateUserDetails = async (e) => {
    e.preventDefault()
    console.log(updateInfo)
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.put(
      `${BASE_URL}/api/user/update/${userProfile.id}`,
      {
        height: updateInfo.height,
        weight: updateInfo.weight,
        age: updateInfo.age,
        activity: updateInfo.activity,
        gender: gender
      },
      config
    )
    calcFormTDEE()
    resetTDEEForms()
  }

  const handleInfoChange = (e) => {
    e.preventDefault()
    setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value })
  }

  const handleLbs = (e) => {
    e.preventDefault()
    setLbs(e.target.value)
  }
  const handleInches = (e) => {
    e.preventDefault()
    setInches(e.target.value)
  }

  const setFemale = () => {
    setGender('female')
    setFemaleDisabled(true)
    setMaleDisabled(false)
  }
  const setMale = () => {
    setGender('male')
    setMaleDisabled(true)
    setFemaleDisabled(false)
  }

  return (
    <div className="calculate">
      <SideBar />
      <div className="calculate-macros">
        <div className="calc-macros-hdr">
          <h1>Calculate TDEE</h1>
          <div className="macros-hdr-btns">
            <button
              className="button"
              disabled={maleDisabled}
              onClick={() => setMale()}
            >
              <MaleIcon fontSize="large" />
            </button>
            <button
              className="button"
              disabled={femaleDisabled}
              onClick={() => setFemale()}
            >
              <FemaleIcon fontSize="large" />
            </button>
          </div>
          {gender === 'male' ? (
            <h5>Calculator calibrated for male</h5>
          ) : (
            <h5>Calculator calibrated for female</h5>
          )}
          <div className="secondary-calc">
            <h2>Conversions</h2>
            <form className="lbs-kilo">
              <label className="label">Pounds to kilograms</label>
              <input
                className="element-input"
                onChange={handleLbs}
                type="text"
                value={lbs}
                required
              />
              {lbs ? (
                <h3>{Math.round(parseInt(lbs) * 0.453592)} kg</h3>
              ) : (
                <h4></h4>
              )}
            </form>

            <form className="in-cm">
              <label className="label">Inches to centimeters</label>
              <input
                className="element-input"
                onChange={handleInches}
                type="text"
                value={inches}
                required
              />
              {inches ? (
                <h3>{Math.round(parseInt(inches) * 2.54)} cm</h3>
              ) : (
                <h4></h4>
              )}
            </form>
          </div>
        </div>
        <div className="TDEE-calc">
          <form onSubmit={updateUserDetails}>
            <h2>TDEE Calculator</h2>
            <label className="label">Height (cm)</label>
            <input
              className="element-input"
              onChange={handleInfoChange}
              type="text"
              name="height"
              value={updateInfo.height}
              required
            />
            <label className="label">Weight (kg)</label>
            <input
              className="element-input"
              onChange={handleInfoChange}
              type="text"
              name="weight"
              value={updateInfo.weight}
              required
            />
            <label className="label">Age (yr)</label>
            <input
              className="element-input"
              onChange={handleInfoChange}
              type="text"
              name="age"
              value={updateInfo.age}
              required
            />
            <label className="label">Activity Level</label>
            <input
              className="element-input"
              onChange={handleInfoChange}
              type="text"
              name="activity"
              placeholder="1-4"
              value={updateInfo.activity}
              required
            />
            <button type="submit" className="button" id="macro-calc-btn">
              Calculate
            </button>
          </form>
        </div>
        <div className="macro-supplement">
          <h1>My TDEE: {Math.round(TDEE)} cal</h1>
          <Accordion
            className="macro-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>How to use my TDEE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                1g protein = 4 calories
                <br />
                1g carbohydrate = 4 calories
                <br />
                1g fat = 9 calories
                <br />
                GENERALLY, an adult diet's macro split is about 45-65% carbs,
                10-35% protein, and 20-35% fat. A negative daily caloric
                difference ie: Caloric intake less than TDEE will assist in
                weight loss, the opposite being true for a positive daily
                caloric difference. The rate and sustainability of these changes
                is highly dependent on exercise (or changes in exercise habits),
                and quality of macronutrients consumed.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="macro-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Activity level</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                (1) Sedentary: Everyday activities like light walking, eating,
                talking etc.
                <br />
                (2) Light activity: Activity that burns additional 200-400 cal
                for females or 250-500 cal for males.
                <br />
                (3) Moderate activity: Activity that burns additional 400-650
                cal for females or 500-800 cal for males.
                <br />
                (4) High activity: Activity that burns additional 650+ cal for
                females or 800+ cal for males.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="macro-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Limitations of TDEE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Those who are extremely lean may not find that the TDEE is as
                useful a tool as it can be for others. It utilizes a body fat
                approximation that would produce a lower than necessary TDEE.
                Read more{' '}
                <Link to="https://healthyeater.com/flexible-dieting-calculator">
                  HERE
                </Link>
                .
                <br />
                Similarly those who are obese will not find the TDEE to be as
                effective as others. Fat tissue isn't active tissue and requires
                very little energy to maintain itself. Read more{' '}
                <Link to="https://healthyeater.com/flexible-dieting-calculator">
                  HERE
                </Link>
                .
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="macro-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Healthy fats examples</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li>Avocados</li>
                  <li>Cheese</li>
                  <li>Dark chocolate</li>
                  <li>Whole eggs</li>
                  <li>Fish</li>
                  <li>Nuts</li>
                  <li>Chia seeds</li>
                  <li>Olive oil</li>
                  <li>Full-fat yogurt</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="macro-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Healthy carbs examples</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li>Quinoa</li>
                  <li>Oats</li>
                  <li>Buckwheat</li>
                  <li>Bananas</li>
                  <li>Sweet Potatoes</li>
                  <li>Beets</li>
                  <li>Oranges</li>
                  <li>Blueberries</li>
                  <li>Grapefruit</li>
                  <li>Kidney Beans</li>
                  <li>Chickpeas</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="macro-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Healthy protein examples</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li>Eggs</li>
                  <li>Almonds</li>
                  <li>Chicken</li>
                  <li>Cottage cheese</li>
                  <li>Greek yogurt</li>
                  <li>Milk</li>
                  <li>Lentils</li>
                  <li>Lean beef</li>
                  <li>Fish</li>
                  <li>Turkey</li>
                  <li>Peanut butter</li>
                  <li>Pea or whey protein powder</li>
                  <li>Shellfish</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Calculate
