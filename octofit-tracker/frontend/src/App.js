import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// These will be imported once we create them
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-activity me-2"></i>
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="bi bi-lightning-charge me-1"></i>
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy me-1"></i>
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-people me-1"></i>
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-person me-1"></i>
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-stopwatch me-1"></i>
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="jumbotron text-center py-5 my-4 bg-light rounded">
                <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness journey, compete with teams, and achieve your goals!</p>
                <hr className="my-4" />
                <p>Get started by exploring activities or checking the leaderboard.</p>
                <div className="mt-4">
                  <Link to="/activities" className="btn btn-primary me-2">View Activities</Link>
                  <Link to="/leaderboard" className="btn btn-outline-primary">Check Leaderboard</Link>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
