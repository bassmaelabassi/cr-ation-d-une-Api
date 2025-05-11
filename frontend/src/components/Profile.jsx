import { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me/session')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Profil Utilisateur</h2>
      <div className="mb-4">
        <p><strong>Nom:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rôle:</strong> {user.role}</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Profile;
