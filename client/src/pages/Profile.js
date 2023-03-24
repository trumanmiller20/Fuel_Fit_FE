import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import AccountCircle from '@mui/icons-material/AccountCircle'

const Profile = ({ setUserProfile, userProfile, getUserDetails }) => {
  let navigate = useNavigate()

  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    e.preventDefault()
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const updateUserPassword = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.put(
      `${BASE_URL}/api/user/update_password/${userProfile.id}`,
      {
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword
      },
      config
    )
    setFormValues(initialState)
    alert('Password Updated!')
    getUserDetails()
  }

  const deleteUser = async () => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    await axios.delete(`${BASE_URL}/api/user/delete/${userProfile.id}`, config)
  }

  const logoutUser = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="user-profile">
      <SideBar />
      <div className="user-profile-info">
        <div className="user-profile-card">
          <AccountCircle fontSize="large" />
          <h1>Update Password</h1>
          <form onSubmit={updateUserPassword}>
            <div className="form-element">
              <label className="element-label">Old Password:</label>
              <input
                className="element-input"
                onChange={handleChange}
                name="oldPassword"
                type="password"
                value={formValues.oldPassword}
                required
              />
            </div>
            <div className="form-element">
              <label className="element-label">New Password:</label>
              <input
                className="element-input"
                onChange={handleChange}
                name="newPassword"
                type="password"
                value={formValues.newPassword}
                required
              />
            </div>
            <div className="form-element">
              <label className="element-label">Confirm Password:</label>
              <input
                className="element-input"
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                required
              />
            </div>
            <div className="login-buttons">
              <button className="button" onClick={() => logoutUser()}>
                Logout
              </button>
              <button
                className="button"
                type="submit"
                disabled={
                  (!formValues.newPassword &&
                    !formValues.newPassword &&
                    !formValues.confirmPassword) ||
                  formValues.newPassword !== formValues.confirmPassword
                }
              >
                Update Password
              </button>
              <button
                className="button"
                id="delete-user"
                onClick={() => deleteUser()}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
