import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const LoginPage = ({ setUser, getUserDetails }) => {
  const [hasProfile, setProfile] = useState(true)

  return (
    <div className="user-login">
      {hasProfile ? (
        <LoginForm
          setUser={setUser}
          setProfile={setProfile}
          getUserDetails={getUserDetails}
        />
      ) : (
        <RegisterForm setProfile={setProfile} />
      )}
    </div>
  )
}

export default LoginPage
