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
  const [lbs, setLbs] = useState('')
  const [inches, setInches] = useState('')

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

  const handleChange = (e) => {
    setUpdateInfo({ [e.target.name]: e.target.value })
  }

  return (
    <div className="calculate">
      <SideBar />
      <div className="calculate-macros-hdr">
        <h1>Calculate Your Macros</h1>
        <button className="button" onClick={() => setGender(!gender)}>
          Toggle Gender
        </button>
        <div className="macro-calculators">
          <div className="secondary-calc">
            <form className="lbs-kilo">
              <label className="label">Convert pounds to kilograms:</label>
              <input
                className="element-input"
                onChange={() => handleChange}
                type="text"
                value={lbs}
                required
              />
            </form>
            <form className="in-cm">
              <label className="label">Convert inches to centimeters:</label>
              <input
                className="element-input"
                onChange={() => handleChange}
                type="text"
                value={inches}
                required
              />
            </form>
          </div>
          <div className="TDEE-calc">
            <form onSubmit={() => updateUserDetails}>
              <h1>TDEE Calculator</h1>
              <label className="label">Height (in)</label>
              <input
                className="element-input"
                onChange={() => handleChange}
                type="text"
                value={updateInfo.height}
                required
              />
              <label className="label">Weight (kg)</label>
              <input
                className="element-input"
                onChange={() => handleChange}
                type="text"
                value={updateInfo.weight}
                required
              />
              <label className="label">Age (yr)</label>
              <input
                className="element-input"
                onChange={() => handleChange}
                type="text"
                value={updateInfo.age}
                required
              />
              <label className="label">Activity Level</label>
              <input
                className="element-input"
                onChange={() => handleChange}
                type="text"
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
