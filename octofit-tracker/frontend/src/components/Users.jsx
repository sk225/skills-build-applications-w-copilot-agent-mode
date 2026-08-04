import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) {
          throw new Error('Failed to load users');
        }

        const payload = await response.json();
        setUsers(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id || user.username} className="list-group-item">
            <strong>{user.username || 'Anonymous'}</strong>
            {user.email ? <div className="text-muted">{user.email}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
