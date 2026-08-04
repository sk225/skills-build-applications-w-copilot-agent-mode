import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6">Octofit Tracker</h1>
        <p className="text-muted">
          API base URL uses VITE_CODESPACE_NAME when available and falls back to localhost.
        </p>
      </header>

      <nav className="nav nav-pills mb-4 flex-wrap">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-link" end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<div className="card p-4"><h2 className="h4">Welcome</h2><p>Use the navigation above to inspect the Octofit data.</p></div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
