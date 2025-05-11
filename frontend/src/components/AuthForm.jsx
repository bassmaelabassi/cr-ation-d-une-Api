import { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister = false, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isRegister ? "Inscription" : "Connexion"}
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength="8"
          />
        </div>

        {isRegister && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="role">Rôle</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-400 transition duration-200"
        >
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
