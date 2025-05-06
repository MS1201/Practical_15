import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(`${API_URL}/message`);
      setMessage(response.data.message);
    } catch (err) {
      console.error('Error fetching message:', err);
      setError('Failed to load message from server');
      setMessage('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/submit`, formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>React + Node.js Integration</h1>
      </header>
      
      <main>
        <section className="message-section">
          <h2>Message from Server</h2>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="message-box">{message}</div>
          )}
        </section>

        <section className="form-section">
          <h2>Submit Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          
          {responseMessage && (
            <div className="response-message">
              <h3>Response:</h3>
              <p>{responseMessage}</p>
            </div>
          )}
        </section>
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} Full Stack Demo</p>
      </footer>
    </div>
  );
}

export default App;