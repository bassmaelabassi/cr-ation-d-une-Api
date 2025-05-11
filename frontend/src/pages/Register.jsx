import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await api.post('/auth/register', data);
      const res = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token', res.data.token);
      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      console.error(err);
    }
  };

  return <AuthForm onSubmit={handleRegister} isRegister />;
};

export default Register;
