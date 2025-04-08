import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://obscure-tribble-64wxvqwjr45fr55w-8000.app.github.dev/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
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

  // Sort the leaderboard by score (highest first)
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  return (
    <div className="card">
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h2 className="mb-0 fs-4">
          <i className="bi bi-trophy me-2"></i>
          Leaderboard
        </h2>
        <div className="dropdown">
          <button className="btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul className="dropdown-menu" aria-labelledby="filterDropdown">
            <li><button className="dropdown-item" type="button">All Time</button></li>
            <li><button className="dropdown-item" type="button">This Month</button></li>
            <li><button className="dropdown-item" type="button">This Week</button></li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        {leaderboard.length === 0 ? (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>
            <div>No leaderboard data found</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" width="10%">Rank</th>
                  <th scope="col" width="60%">User</th>
                  <th scope="col" width="30%">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((entry, index) => {
                  // Apply special styling for top three ranks
                  let rankBadgeClass = "bg-secondary";
                  if (index === 0) rankBadgeClass = "bg-warning text-dark"; // Gold for 1st
                  else if (index === 1) rankBadgeClass = "bg-light text-dark border"; // Silver for 2nd
                  else if (index === 2) rankBadgeClass = "bg-bronze text-dark"; // Bronze for 3rd
                  
                  return (
                    <tr key={entry._id}>
                      <td>
                        <span className={`badge ${rankBadgeClass} rounded-pill`}>
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <strong>{entry.user ? (entry.user.username ? entry.user.username : 'Unknown') : 'Unknown'}</strong>
                      </td>
                      <td>
                        <span className="fw-bold">{entry.score}</span> pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        Updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

export default Leaderboard;