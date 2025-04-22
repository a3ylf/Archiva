import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(form.username, form.password);
      alert('✅ Conta criada com sucesso!');
      navigate('/login');
    } catch (err) {
      alert('❌ Erro ao registrar usuário.');
    }
  };

  return (
    <div className="auth-container">
      <h2>📝 Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Usuário" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Signup;

