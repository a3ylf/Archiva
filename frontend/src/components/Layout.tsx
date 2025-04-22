import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

