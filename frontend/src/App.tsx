import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Preservar from './pages/Preservar';
import Signup from './pages/Signup';
import Login from './pages/Login';
function App() {
    return (
        <Router>
            <nav>
                <Link to="/">🏠 Início</Link> | <Link to="/preservar">📄 Preservar</Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Bem-vindo ao Sistema de Preservação</h1>} />
                <Route path="/preservar" element={<Preservar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;

