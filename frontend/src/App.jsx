import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        {/* This means "When URL is / show Welcome" */}
        <Route path="/" element={<Welcome />} />
        
        {/* This means "When URL is /signup show SignUp" */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;