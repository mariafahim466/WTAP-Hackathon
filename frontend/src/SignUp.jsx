import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isOver18: 'no', alias: '', firstName: '', lastName: '', email: '',
    goals: '', interests: '', careerStage: [], role: 'mentee',
    availability: [], languages: []
  });
  const [emailStatus, setEmailStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setFormData(prev => ({ ...prev, [name]: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailStatus("Validating...");
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/validate', { email: formData.email });
      if (response.data.valid) {
        setEmailStatus("✅ Valid Work Email!");
      } else {
        setEmailStatus(`❌ ${response.data.reason}`);
      }
    } catch (error) {
      setEmailStatus("❌ Server Error");
    }
  };

  // --- STYLES ---
  const containerStyle = {
    backgroundColor: '#fff',
    borderRadius: '40px',
    padding: '50px',
    width: '100%',
    maxWidth: '650px',
    // Soft colorful shadow
    boxShadow: '0 20px 60px rgba(184, 225, 255, 0.4)', 
    textAlign: 'left',
    position: 'relative'
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '20px',
    backgroundColor: '#faf9f6', /* Off-white beige inside input */
    boxSizing: 'border-box',
    border: '1px solid #eee'
  };

  const labelStyle = {
    fontWeight: '700',
    color: '#6b705c', // Earthy Green-Grey
    marginLeft: '15px',
    marginBottom: '8px',
    display: 'block',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  // Small "Back" button styling
  const backButtonStyle = {
    position: 'absolute',
    top: '30px',
    left: '30px',
    background: 'transparent',
    color: '#aaa',
    padding: '5px 10px',
    fontSize: '0.9rem'
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate('/')} style={backButtonStyle}>← Back</button>
      
      <h2 style={{ textAlign: 'center', color: '#6b705c', marginBottom: '40px', fontSize: '2rem' }}>
        Create Profile
      </h2>
      
      <form onSubmit={handleSubmit}>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First Name</label>
            <input name="firstName" style={inputStyle} onChange={handleChange} required />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last Name</label>
            <input name="lastName" style={inputStyle} onChange={handleChange} required />
          </div>
        </div>

        <label style={labelStyle}>Username</label>
        <input name="alias" style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Work Email</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input name="email" type="email" style={inputStyle} onChange={handleChange} required />
          {/* Status Message styling */}
          {emailStatus && (
            <span style={{ 
              padding: '12px', 
              fontSize: '0.9rem', 
              background: emailStatus.includes('✅') ? '#b5ead7' : '#ffdac1',
              borderRadius: '20px',
              height: 'fit-content',
              whiteSpace: 'nowrap'
            }}>
              {emailStatus}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <label style={labelStyle}>Role</label>
                <select name="role" style={inputStyle} onChange={handleChange}>
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                    <option value="both">Both</option>
                </select>
            </div>
            <div style={{ flex: 1 }}>
                <label style={labelStyle}>18+?</label>
                <select name="isOver18" style={inputStyle} onChange={handleChange}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
        </div>

        <label style={labelStyle}>Goals</label>
        <textarea name="goals" style={{ ...inputStyle, borderRadius: '20px', height: '80px' }} onChange={handleChange} />

        <label style={labelStyle}>Career Stage (Select Multiple)</label>
        <select multiple name="careerStage" style={{ ...inputStyle, borderRadius: '20px', height: '100px' }} onChange={handleMultiSelect}>
            <option value="student">🎓 Student</option>
            <option value="early">🌱 Early Career</option>
            <option value="senior">🌳 Senior Career</option>
        </select>

        <button 
            type="submit" 
            style={{ 
                width: '100%', 
                backgroundColor: '#b5ead7', /* Sage Green Button */
                color: '#444', 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                marginTop: '20px',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(181, 234, 215, 0.5)'
            }}
        >
            Complete Profile ✨
        </button>
      </form>
    </div>
  );
}

export default SignUp;