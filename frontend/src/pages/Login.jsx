import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      console.error(err);
    }
  };

  return <AuthForm onSubmit={handleLogin} />;
};

export default Login;
