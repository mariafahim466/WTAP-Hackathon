import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MenteeDetails() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Retrieve data from previous page
  const [details, setDetails] = useState({ specificHelp: '', idealMentor: '' });

  // Merge old data with new data
  const fullData = { ...state, ...details };

  const handleNext = () => {
    if (state.role === 'both') {
      navigate('/mentor-details', { state: fullData });
    } else {
      console.log("Final Payload to Save:", fullData); // This is where you'd save to DB
      navigate('/dashboard');
    }
  };

  const containerStyle = {
    backgroundColor: '#fff', borderRadius: '40px', padding: '50px',
    width: '100%', maxWidth: '600px', boxShadow: '0 20px 60px rgba(184, 225, 255, 0.4)'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#6b705c', textAlign: 'center' }}>Mentee Specifics 🌱</h2>
      <p style={{ textAlign: 'center', color: '#888' }}>Tell us what you are looking for.</p>

      <label style={{ fontWeight: '700', color: '#6b705c', display: 'block', marginTop: '20px' }}>
        What specific topics do you need help with?
      </label>
      <textarea 
        style={{ width: '100%', height: '100px', backgroundColor: '#faf9f6', border: '1px solid #eee', marginBottom: '20px' }}
        onChange={(e) => setDetails({...details, specificHelp: e.target.value})}
      />

      <label style={{ fontWeight: '700', color: '#6b705c', display: 'block' }}>
        Describe your ideal mentor
      </label>
      <input 
        style={{ width: '100%', backgroundColor: '#faf9f6', border: '1px solid #eee' }}
        placeholder="e.g. Someone with 5+ years in AI..."
        onChange={(e) => setDetails({...details, idealMentor: e.target.value})}
      />

      <button 
        onClick={handleNext}
        style={{ width: '100%', marginTop: '30px', backgroundColor: '#b5ead7', color: '#444', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {state.role === 'both' ? 'Next: Mentor Profile →' : 'Finish & Go to Dashboard 🚀'}
      </button>
    </div>
  );
}

export default MenteeDetails;