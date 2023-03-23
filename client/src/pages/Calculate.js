import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Calculate = ({ userProfile }) => {
  let initialTDEE = {
    height: '',
    weight: '',
    age: '',
    activity: ''
  }
  const [updateInfo, setUpdateInfo] = useState(initialTDEE)
  const [gender, setGender] = useState(true)
  const [lbs, setLbs] = useState()
  const [inches, setInches] = useState()

  // let updatedUser = userProfile
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
        activity: updateInfo.activity
      },
      config
    )
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
    setInches({ [e.target.name]: e.target.value })
  }

  return (
    <div className="calculate">
      <SideBar />
      <div className="calculate-macros-hdr">
        <h1>Calculate Your Macros</h1>
        {gender ? (
          <div>
            <button className="button" onClick={() => setGender(!gender)}>
              Toggle Sex
            </button>
            <h4>Female</h4>
          </div>
        ) : (
          <div>
            <button className="button" onClick={() => setGender(!gender)}>
              Toggle Sex
            </button>
            <h4>Male</h4>
          </div>
        )}
        <div className="macro-calculators">
          <div className="secondary-calc">
            <form className="lbs-kilo">
              <label className="label">Convert pounds to kilograms:</label>
              <input
                className="element-input"
                onChange={handleLbs}
                type="text"
                name="lbs"
                value={lbs}
                required
              />
              {lbs ? (
                <h3>{parseInt(lbs) * 0.453592} kg</h3>
              ) : (
                <h4>* Enter weight to see conversion *</h4>
              )}
            </form>
            <form className="in-cm">
              <label className="label">Convert inches to centimeters:</label>
              <input
                className="element-input"
                onChange={() => handleInches}
                type="text"
                name="inches"
                value={inches}
                required
              />
              {inches ? (
                <h3>{parseInt(inches) * 2.54} kg</h3>
              ) : (
                <h4>* Enter height to see conversion *</h4>
              )}
            </form>
          </div>
          <div className="TDEE-calc">
            <form onSubmit={() => updateUserDetails}>
              <h1>TDEE Calculator</h1>
              <label className="label">Height (in)</label>
              <input
                className="element-input"
                onChange={() => handleInfoChange}
                type="text"
                name="height"
                value={updateInfo.height}
                required
              />
              <label className="label">Weight (kg)</label>
              <input
                className="element-input"
                onChange={() => handleInfoChange}
                type="text"
                name="weight"
                value={updateInfo.weight}
                required
              />
              <label className="label">Age (yr)</label>
              <input
                className="element-input"
                onChange={() => handleInfoChange}
                type="text"
                name="age"
                value={updateInfo.age}
                required
              />
              <label className="label">Activity Level</label>
              <input
                className="element-input"
                onChange={() => handleInfoChange}
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
        </div>
      </div>
    </div>
  )
}

export default Calculate
