import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Failed to load teams');
        }

        const payload = await response.json();
        setTeams(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id || team.name} className="list-group-item">
            <strong>{team.name || 'Untitled Team'}</strong>
            {team.description ? <div className="text-muted">{team.description}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
