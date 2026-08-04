import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Failed to load workouts');
        }

        const payload = await response.json();
        setWorkouts(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id || workout.name} className="list-group-item">
            <strong>{workout.name || 'Workout'}</strong>
            {workout.description ? <div className="text-muted">{workout.description}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
