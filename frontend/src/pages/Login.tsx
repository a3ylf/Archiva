import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(form.username, form.password);
            localStorage.setItem('token', response.access_token);
            alert('✅ Login realizado com sucesso!');
            navigate('/');
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('userId', response.data.id);

        } catch (err) {
            alert('❌ Erro ao fazer login.');
        }
    };

    return (
        <div className="auth-container">
            <h2>🔐 Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Usuário" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;

