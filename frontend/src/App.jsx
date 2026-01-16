import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import SignUp from './SignUp';
import MenteeDetails from './MenteeDetails';
import MentorDetails from './MentorDetails';
import Dashboard from './Dashboard';
import Login from './Login'; // New Component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        
        {/* LOGIN ROUTES */}
        <Route path="/login/mentee" element={<Login userType="mentee" />} />
        <Route path="/login/mentor" element={<Login userType="mentor" />} />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mentee-details" element={<MenteeDetails />} />
        <Route path="/mentor-details" element={<MentorDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;