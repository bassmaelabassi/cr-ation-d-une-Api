import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-amber-900">
            AuthApp
          </Link>
          <div className="flex space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
                Connexion
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
                Inscription
              </button>
            </Link>
            <Link to="/profile">
              <button className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
                Profil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
