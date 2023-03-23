import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

const Calculate = ({
  userProfile,
  setGender,
  gender,
  updateInfo,
  setUpdateInfo,
  initialTDEE,
  getUserDetails
}) => {
  const [lbs, setLbs] = useState()
  const [inches, setInches] = useState()

  const updateUserDetails = async () => {
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
    setUpdateInfo(initialTDEE)
    setLbs()
    setInches()
    getUserDetails()
    setGender('female')
  }

  const handleInfoChange = (e) => {
    e.preventDefault()
    setUpdateInfo({ [e.target.name]: e.target.value })
  }

  const handleLbs = (e) => {
    e.preventDefault()
    setLbs(e.target.value)
  }
  const handleInches = (e) => {
    e.preventDefault()
    setInches(e.target.value)
  }

  return (
    <div className="calculate">
      <SideBar />
      <div className="calculate-macros">
        <div className="calc-macros-hdr">
          <h1>Calculate TDEE</h1>
          {gender === 'female' ? (
            <div>
              <button className="button" onClick={() => setGender('male')}>
                Toggle Sex
              </button>
              <h4>FEMALE</h4>
            </div>
          ) : (
            <div>
              <button className="button" onClick={() => setGender('female')}>
                Toggle Sex
              </button>
              <h4>MALE</h4>
            </div>
          )}
          <div className="secondary-calc">
            <h2>Conversions</h2>
            <form className="lbs-kilo">
              <label className="label">Lbs to kgs</label>
              <input
                className="element-input"
                onChange={handleLbs}
                type="text"
                value={lbs}
                required
              />
              {lbs ? <h3>{parseInt(lbs) * 0.453592} kg</h3> : <h4></h4>}
            </form>

            <form className="in-cm">
              <label className="label">Inches to cm</label>
              <input
                className="element-input"
                onChange={handleInches}
                type="text"
                value={inches}
                required
              />
              {inches ? <h3>{parseInt(inches) * 2.54} cm</h3> : <h4></h4>}
            </form>
          </div>
        </div>
        <div className="TDEE-calc">
          <form onSubmit={() => updateUserDetails}>
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
              placeholder="1-5"
              value={updateInfo.activity}
              required
            />
            <button type="submit" className="button" id="macro-calc-btn">
              Calculate
            </button>
          </form>
        </div>
        <div className="macro-supplement">
          <h1>My TDEE: 1000</h1>
          <Accordion
            className="faq-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What are macronutrients?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Macronutrients, or macros, are essential nutrients the body
                needs in large quantities to remain healthy. Macronutrients
                provide the body with energy, help prevent disease, and allow
                the body to function correctly. There are three main types of
                macronutrients: proteins, fats, and carbohydrates.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="faq-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Why are macros important?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Each individual is different in their macronutrient and caloric
                needs. These needs are highly dependent upon myriad factors
                including but not limited to: age, sex, height, weight, activity
                level, etc. Deviating from this standard in excess or deficit
                can cause unwanted weight gain or weight loss.
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
              <Typography>What do TDEE and REE mean?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                REE is an acronym for Resting Energy Expenditure. In a nutshell,
                it represents the approximate number of calories your body will
                burn when at rest ie: not moving, resting heart rate. When REE
                is muliplied by a coefficient relating to your activity levels,
                age, sex, height and weight, it produces the TDEE, or Total
                Daily Energy Expenditure. TDEE acts as a reasonable
                approximation of the number of calories your body needs to
                maintain its current weight without a change in exercise habits.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="faq-accordion"
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>How reliable is TDEE?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                TDEE stands as a reasonable approximation. Planning caloric
                intake based on TDEE can produce excellent results, but it is
                not the most accurate tool available. In a clinical setting
                there are a number of methods to more precisely determine
                metabolic rate. One such example is the RQ or respiratory
                quotient. Read more{' '}
                <Link to="https://www.vacumed.com/293.html">HERE</Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Calculate
