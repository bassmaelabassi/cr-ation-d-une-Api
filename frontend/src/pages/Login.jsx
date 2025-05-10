import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { login } from '../services/auth'

const Login = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (credentials) => {
    try {
      const { token } = await login(credentials)
      if (token) {
        localStorage.setItem('token', token)
        navigate('/profile')
      }
    } catch (err) {
      setError(err.error || 'Une erreur est survenue')
    }
  }

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} error={error} />
    </div>
  )
}

export default Login