import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://obscure-tribble-64wxvqwjr45fr55w-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
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
      <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0 fs-4">
          <i className="bi bi-stopwatch me-2"></i>
          Workouts
        </h2>
        <button className="btn btn-light btn-sm">
          <i className="bi bi-plus-circle me-1"></i>
          Create Workout
        </button>
      </div>
      <div className="card-body">
        {workouts.length === 0 ? (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>
            <div>No workouts found</div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {workouts.map(workout => (
              <div key={workout._id} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                      <i className="bi bi-activity me-2"></i>
                      {workout.name}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="card-text mb-3">
                      {workout.description}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-clock me-1"></i>
                        30-60 min
                      </span>
                      <span className="badge bg-light text-dark">
                        <i className="bi bi-speedometer2 me-1"></i>
                        Intermediate
                      </span>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center bg-transparent">
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-play-circle me-1"></i>
                      Start
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-bookmark me-1"></i>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        Total workouts: {workouts.length}
      </div>
    </div>
  );
}

export default Workouts;