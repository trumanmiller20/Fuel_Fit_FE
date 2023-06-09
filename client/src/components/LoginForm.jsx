import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const LoginForm = ( { setUser, setProfile, getUserDetails }) => {
  let navigate = useNavigate()

  const initialState = { username: '', password: '' }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    e.preventDefault()
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setUser(payload)
    setFormValues(initialState)
    navigate('/dashboard')
    getUserDetails()
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login to Continue</h1>
          <div className="form-element">
            <label className="element-label" htmlFor="username">
              Username
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="username"
              type="text"
              value={formValues.username}
              required
            />
          </div>
          <div className="form-element">
            <label className="element-label" htmlFor="password">
              Password
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="password"
              type="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="login-buttons">
            <button
              className="button"
              disabled={
                !formValues.email && !formValues.password 
              }
            >
              Sign In
            </button>
            <button className="button" onClick={() => setProfile(false)}>
              Register for Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm