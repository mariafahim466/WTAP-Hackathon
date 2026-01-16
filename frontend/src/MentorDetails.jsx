import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MentorDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Added 'maxMentees' to state
  const [details, setDetails] = useState({ 
    expertise: '', 
    mentoringStyle: '',
    maxMentees: '' 
  });

  const fullData = { ...state, ...details };

  const handleFinish = () => {
    console.log("Final Payload to Save:", fullData);
    navigate('/dashboard');
  };

  const containerStyle = {
    backgroundColor: '#fff', 
    borderRadius: '40px', 
    padding: '50px',
    width: '100%', 
    maxWidth: '600px', 
    boxShadow: '0 20px 60px rgba(255, 218, 193, 0.6)'
  };

  const labelStyle = { 
    fontWeight: '700', 
    color: '#6b705c', 
    display: 'block', 
    marginTop: '20px',
    marginBottom: '8px' 
  };

  const inputStyle = { 
    width: '100%', 
    backgroundColor: '#faf9f6', 
    border: '1px solid #eee', 
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#6b705c', textAlign: 'center' }}>Mentor Specifics 🌳</h2>
      <p style={{ textAlign: 'center', color: '#888' }}>Customize your mentorship capacity.</p>
      
      {/* 1. Expertise Field */}
      <label style={labelStyle}>What topics can you teach?</label>
      <textarea 
        style={{ ...inputStyle, height: '100px', borderRadius: '20px' }}
        placeholder="e.g. Python, Career Advice, Resume Review..."
        onChange={(e) => setDetails({...details, expertise: e.target.value})}
      />

      {/* 2. Mentoring Style Field (Optional extra) */}
      <label style={labelStyle}>Mentoring Style</label>
      <select 
        style={inputStyle}
        onChange={(e) => setDetails({...details, mentoringStyle: e.target.value})}
      >
         <option value="">Select a style...</option>
         <option value="structured">Structured (Regular agenda)</option>
         <option value="casual">Casual (As needed)</option>
         <option value="hands-on">Hands-on (Code reviews)</option>
      </select>

      {/* 3. NEW FIELD: Max # of Mentees */}
      <label style={labelStyle}>Max # of Mentees (Capacity)</label>
      <input 
        type="number" 
        min="1" 
        max="50"
        placeholder="e.g. 3"
        style={{ ...inputStyle, width: '100px' }} // Make it smaller/cuter
        onChange={(e) => setDetails({...details, maxMentees: e.target.value})}
      />

      <button 
        onClick={handleFinish}
        style={{ 
          width: '100%', 
          marginTop: '40px', 
          backgroundColor: '#ffdac1', // Pastel Orange/Pink
          color: '#444', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          fontSize: '1.1rem',
          boxShadow: '0 10px 20px rgba(255, 218, 193, 0.4)'
        }}
      >
        Enter Dashboard 🚀
      </button>
    </div>
  );
}

export default MentorDetails;