import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LoginForm from '../components/LoginForm'

const LoginPage = ({ setUser, getUserDetails }) => {
  const [hasProfile, setProfile] = useState(true)

  return (
    <div className="user-login">
      {hasProfile ? (
        <div className="login-form-1">
          <LoginForm
            setUser={setUser}
            setProfile={setProfile}
            getUserDetails={getUserDetails}
          />
        </div>
      ) : (
        <div className="login-form-2">
          <RegisterForm setProfile={setProfile} />
        </div>
      )}
    </div>
  )
}

export default LoginPage
