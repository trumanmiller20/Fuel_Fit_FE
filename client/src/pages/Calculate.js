import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Calculate = ({
  userProfile,
  setGender,
  gender,
  updateInfo,
  setUpdateInfo
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
    setInches(e.target.value)
  }

  return (
    <div className="calculate">
      <SideBar />
      <div className="calculate-macros">
        <div className="calc-macros-hdr">
          <h1>Calculate TDEE</h1>
          {gender ? (
            <div>
              <button className="button" onClick={() => setGender(!gender)}>
                Toggle Sex
              </button>
              <h4>FEMALE</h4>
            </div>
          ) : (
            <div>
              <button className="button" onClick={() => setGender(!gender)}>
                Toggle Sex
              </button>
              <h4>MALE</h4>
            </div>
          )}
          <div className="secondary-calc">
            <h2>Conversions</h2>
            <form className="lbs-kilo">
              <label className="label">Lbs to Kgs</label>
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
              <label className="label">Inches to Cm</label>
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
      </div>
    </div>
  )
}

export default Calculate
