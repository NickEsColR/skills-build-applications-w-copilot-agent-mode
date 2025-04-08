import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://obscure-tribble-64wxvqwjr45fr55w-8000.app.github.dev/api/users/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
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
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0 fs-4">
          <i className="bi bi-person me-2"></i>
          Users
        </h2>
        <button className="btn btn-light btn-sm">
          <i className="bi bi-person-plus me-1"></i>
          Add User
        </button>
      </div>
      <div className="card-body">
        {users.length === 0 ? (
          <div className="alert alert-warning d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>
            <div>No users found</div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {users.map(user => (
              <div key={user._id} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                           style={{ width: "64px", height: "64px", fontSize: "1.5rem" }}>
                        {user.username ? user.username.charAt(0).toUpperCase() : "?"}
                      </div>
                    </div>
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text text-muted">
                      <i className="bi bi-envelope me-1"></i>
                      {user.email}
                    </p>
                    <div className="d-flex justify-content-center mt-3">
                      <button className="btn btn-outline-primary btn-sm me-2">
                        <i className="bi bi-person-lines-fill me-1"></i>
                        Profile
                      </button>
                      <button className="btn btn-outline-success btn-sm">
                        <i className="bi bi-chat me-1"></i>
                        Message
                      </button>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-top-0 text-center">
                    <small className="text-muted">
                      <i className="bi bi-circle-fill text-success me-1" style={{ fontSize: "0.5rem" }}></i>
                      Active User
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        Total users: {users.length}
      </div>
    </div>
  );
}

export default Users;