import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { register } from '../services/auth'

const Register = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (userData) => {
    try {
      await register(userData)
      navigate('/login')
    } catch (err) {
      setError(err.error || 'Une erreur est survenue lors de l\'inscription')
    }
  }

  return (
    <div>
      <AuthForm type="register" onSubmit={handleRegister} error={error} />
    </div>
  )
}

export default Register