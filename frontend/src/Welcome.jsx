import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Clean white glass
    backdropFilter: 'blur(10px)',
    borderRadius: '40px', // Extra rounded
    padding: '60px',
    boxShadow: '0 20px 40px rgba(181, 234, 215, 0.3)', // Soft green shadow
    textAlign: 'center',
    width: '100%',
    maxWidth: '550px'
  };

  const titleStyle = {
    color: '#556b2f', // Dark olive green for text contrast
    fontSize: '3.5rem',
    marginBottom: '10px',
    fontWeight: '700'
  };

  const buttonBase = {
    border: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    color: '#555',
    padding: '15px 30px',
    minWidth: '120px'
  };

  return (
    <div style={cardStyle}>
      <h1 style={titleStyle}>Welcome! 🌿</h1>
      <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '50px' }}>
        Start your journey with us.
      </p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* About: Pastel Pink */}
        <button 
          onClick={() => alert("About clicked!")}
          style={{ ...buttonBase, backgroundColor: '#ffdac1' }}
        >
          About
        </button>
        
        {/* Get Started: Pastel Green (Main) */}
        <button 
          onClick={() => navigate('/signup')}
          style={{ 
            ...buttonBase, 
            backgroundColor: '#b5ead7',
            color: '#334', // Darker text for readability
            transform: 'scale(1.1)' // Make this one slightly bigger
          }}
        >
          Get Started
        </button>
        
        {/* Login: Pastel Blue */}
        <button 
          onClick={() => alert("Login clicked!")}
          style={{ ...buttonBase, backgroundColor: '#b8e1ff' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Welcome;