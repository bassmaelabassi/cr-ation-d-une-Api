import { useEffect, useState } from 'react'
import { getProfileBasic, getProfileSession, logout } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authMethod, setAuthMethod] = useState('session')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = authMethod === 'session' 
          ? await getProfileSession() 
          : await getProfileBasic()
        setUser(data)
      } catch (err) {
        setError(err.error || 'Erreur de chargement du profil')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [authMethod])

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      setError(err.error || 'Erreur lors de la déconnexion')
    }
  }

  if (loading) return <div className="text-center mt-10">Chargement...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Méthode d'authentification:</label>
        <select 
          value={authMethod}
          onChange={(e) => setAuthMethod(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="session">Session</option>
          <option value="basic">Basic Auth</option>
        </select>
      </div>
      
      {user && (
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Nom:</h2>
            <p>{user.name}</p>
          </div>
          <div>
            <h2 className="font-semibold">Email:</h2>
            <p>{user.email}</p>
          </div>
        </div>
      )}
      
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Déconnexion
      </button>
    </div>
  )
}

export default Profile