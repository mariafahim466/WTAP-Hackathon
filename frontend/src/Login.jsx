import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ userType }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, we skip real authentication and go straight to dashboard
    // In a real app, you would verify password here
    navigate('/dashboard');
  };

  // --- STYLES ---
  const containerStyle = {
    backgroundColor: '#fff',
    borderRadius: '40px',
    padding: '50px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 60px rgba(184, 225, 255, 0.4)',
    textAlign: 'center',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '20px',
    backgroundColor: '#faf9f6',
    border: '1px solid #eee',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: '700',
    color: '#6b705c',
    textAlign: 'left',
    display: 'block',
    marginBottom: '8px',
    marginLeft: '10px'
  };

  const titleColor = userType === 'mentor' ? '#6b705c' : '#6a11cb';
  const roleTitle = userType.charAt(0).toUpperCase() + userType.slice(1); // "Mentee" or "Mentor"

  return (
    <div style={containerStyle}>
      <button 
        onClick={() => navigate('/')} 
        style={{ position: 'absolute', top: '30px', left: '30px', background: 'transparent', color: '#aaa', padding: '0', fontSize: '0.9rem' }}
      >
        ← Back
      </button>

      <h2 style={{ color: titleColor, marginBottom: '10px', fontSize: '2rem' }}>
        {roleTitle} Login
      </h2>
      <p style={{ color: '#999', marginBottom: '40px' }}>Welcome back! Please enter your details.</p>
      
      <form onSubmit={handleLogin}>
        <label style={labelStyle}>Work Email</label>
        <input 
          type="email" 
          style={inputStyle} 
          required 
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={labelStyle}>Password</label>
        <input 
          type="password" 
          style={inputStyle} 
          required 
        />

        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            backgroundColor: userType === 'mentor' ? '#ffdac1' : '#b5ead7', 
            color: '#444', 
            fontSize: '1.2rem', 
            fontWeight: 'bold',
            marginTop: '20px',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          }}
        >
          Sign In ➜
        </button>
      </form>
    </div>
  );
}

export default Login;