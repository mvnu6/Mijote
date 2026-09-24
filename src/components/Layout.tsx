import { Outlet } from 'react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}