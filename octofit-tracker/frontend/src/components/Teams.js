import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://obscure-tribble-64wxvqwjr45fr55w-8000.app.github.dev/api/teams/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
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
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-heading">
          <i className="bi bi-people me-2"></i>
          Teams
        </h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>
          Create Team
        </button>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>
          <div>No teams found</div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {teams.map(team => (
            <div key={team._id} className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-people-fill me-2"></i>
                    {team.name}
                  </h5>
                  <span className="badge bg-light text-dark rounded-pill">
                    {team.members ? team.members.length : 0} members
                  </span>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-3 text-muted">Team Members</h6>
                  {team.members && team.members.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {team.members.slice(0, 5).map(member => (
                        <li key={member._id || member} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                          <div>
                            <i className="bi bi-person-circle me-2"></i>
                            {member.username || 'Unknown member'}
                          </div>
                          <span className="badge bg-primary rounded-pill">Active</span>
                        </li>
                      ))}
                      {team.members.length > 5 && (
                        <li className="list-group-item text-center text-muted border-0 px-0">
                          + {team.members.length - 5} more members
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="card-text text-muted">No members in this team</p>
                  )}
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>
                    <button className="btn btn-outline-success btn-sm">
                      <i className="bi bi-person-plus me-1"></i>
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Teams;