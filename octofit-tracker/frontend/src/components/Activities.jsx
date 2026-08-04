import { useEffect, useState } from 'react';
import { getApiUrl, normalizeCollection } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Failed to load activities');
        }

        const payload = await response.json();
        setActivities(normalizeCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id || `${activity.type}-${activity.user}`} className="list-group-item">
            <strong>{activity.type || 'Activity'}</strong>
            <div className="text-muted">{activity.user || 'Unknown user'} • {activity.duration || 0} min</div>
            {activity.notes ? <div>{activity.notes}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
