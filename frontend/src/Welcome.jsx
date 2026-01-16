import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    backdropFilter: 'blur(10px)',
    borderRadius: '40px', 
    padding: '60px',
    boxShadow: '0 20px 40px rgba(181, 234, 215, 0.3)', 
    textAlign: 'center',
    width: '100%',
    maxWidth: '550px'
  };

  const titleStyle = {
    color: '#556b2f', 
    fontSize: '3.5rem',
    marginBottom: '10px',
    fontWeight: '700'
  };

  const buttonBase = {
    border: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
    color: '#555', padding: '15px 30px', minWidth: '120px'
  };

  return (
    <div style={cardStyle}>
      <h1 style={titleStyle}>Welcome! 🌿</h1>
      <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '50px' }}>
        Start your journey with us.
      </p>
      
      {!showLoginOptions ? (
        // STATE 1: STANDARD BUTTONS
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => alert("About clicked!")} style={{ ...buttonBase, backgroundColor: '#ffdac1' }}>
            About
          </button>
          
          <button 
            onClick={() => navigate('/signup')}
            style={{ ...buttonBase, backgroundColor: '#b5ead7', color: '#334', transform: 'scale(1.1)' }}
          >
            Get Started
          </button>
          
          <button 
            onClick={() => setShowLoginOptions(true)}
            style={{ ...buttonBase, backgroundColor: '#b8e1ff' }}
          >
            Login
          </button>
        </div>
      ) : (
        // STATE 2: LOGIN SELECTION
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <p style={{ fontWeight: 'bold', color: '#555' }}>Login as:</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              onClick={() => navigate('/login/mentee')}
              style={{ ...buttonBase, backgroundColor: '#b5ead7' }}
            >
              Mentee
            </button>
            <button 
              onClick={() => navigate('/login/mentor')}
              style={{ ...buttonBase, backgroundColor: '#ffdac1' }}
            >
              Mentor
            </button>
          </div>
          <button 
            onClick={() => setShowLoginOptions(false)}
            style={{ marginTop: '20px', background: 'transparent', border: 'none', color: '#999', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Welcome;