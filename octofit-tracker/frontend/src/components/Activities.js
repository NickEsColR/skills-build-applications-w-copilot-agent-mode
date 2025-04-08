import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://obscure-tribble-64wxvqwjr45fr55w-8000.app.github.dev/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>Error: {error}</div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0 fs-4">
          <i className="bi bi-lightning-charge me-2"></i>
          Activities
        </h2>
        <button className="btn btn-light btn-sm">
          <i className="bi bi-plus-circle me-1"></i>
          Add Activity
        </button>
      </div>
      <div className="card-body">
        {activities.length === 0 ? (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>
            <div>No activities found</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity._id}>
                    <td>{activity.user ? activity.user : 'Unknown'}</td>
                    <td>
                      <span className="badge bg-primary rounded-pill">
                        {activity.activity_type}
                      </span>
                    </td>
                    <td>{activity.duration}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-outline-primary">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        Total activities: {activities.length}
      </div>
    </div>
  );
}

export default Activities;