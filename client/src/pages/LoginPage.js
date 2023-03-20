import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const LoginPage = ({ setUser }) => {
  const [hasProfile, setProfile] = useState(true)

  return (
    <div className="user-login">
      {hasProfile ? (
        <LoginForm setUser={setUser} setProfile={setProfile} />
      ) : (
        <RegisterForm setProfile={setProfile} />
      )}
    </div>
  )
}

export default LoginPage
