import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../api';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }

        const payload = await response.json();
        setLeaders(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <ul className="list-group">
        {leaders.map((entry, index) => (
          <li key={entry._id || entry.id || `${entry.username || 'entry'}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{entry.username || entry.user || `Rank ${index + 1}`}</span>
            <span className="badge bg-primary rounded-pill">{entry.score || entry.points || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
