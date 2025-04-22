import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <h3>Menu</h3>
      {user ? (
        <p>Logado</p>
      ) : (
        <p>Não autenticado</p>
      )}
    </div>
  );
};

export default Sidebar;

