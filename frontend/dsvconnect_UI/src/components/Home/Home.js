import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to DSVConnect</h1>
        <p>Connect, Chat, and Share with your friends and community.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/signup')} className="hero-button signup">
            Sign Up
          </button>
          <button onClick={() => navigate('/login')} className="hero-button login">
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose DSVConnect?</h2>
        <div className="features-list">
          <div className="feature-card">
            <i className="icon fas fa-comments"></i>
            <h3>Real-Time Chat</h3>
            <p>Stay connected with friends instantly.</p>
          </div>
          <div className="feature-card">
            <i className="icon fas fa-users"></i>
            <h3>Make Friends</h3>
            <p>Grow your network and meet new people.</p>
          </div>
          <div className="feature-card">
            <i className="icon fas fa-lock"></i>
            <h3>Private & Secure</h3>
            <p>Your data is safe with us.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 DSVConnect. All Rights Reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
