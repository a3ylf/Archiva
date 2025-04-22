import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preservar from './pages/Preservar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {}
          <Route element={<Layout />}>
            <Route path="/" element={<h1>Bem-vindo ao Sistema de Preservação</h1>} />
            <Route path="/preservar" element={<Preservar />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

