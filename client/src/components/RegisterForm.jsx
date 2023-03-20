import { useState } from 'react'
import { RegisterUser } from '../services/Auth'

const RegisterForm = ({ setProfile }) => {

  let initialState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password
    })
    setFormValues(initialState)
    setProfile(true)
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-element">
            <label className="element-label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="firstName"
              type="text"
              placeholder="John"
              value={formValues.firstName}
              required
            />
          </div>
          <div className="form-element">
            <label className="element-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formValues.lastName}
              required
            />
          </div>
          <div className="form-element">
            <label className="element-label" htmlFor="email">
              Email Address
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="johndoe@gmail.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="form-element">
            <label className="element-label" htmlFor="username">
              Username
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="johndoe123"
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
              type="text"
              value={formValues.password}
              required
            />
          </div>
          <div className="form-element">
            <label className="element-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="element-input"
              onChange={handleChange}
              name="confirmPassword"
              type="text"
              placeholder="Passwords must match"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <div className="register-buttons">
            <button
              className="register-btn"
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.confirmPassword === formValues.password)
              }
            >
              Register Account
            </button>
            <button className="switch-btn" onClick={() => setProfile(true)}>
              Return to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm