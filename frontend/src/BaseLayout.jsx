// frontend/src/components/BaseLayout.jsx (navbar section)
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'; // Added useEffect for Bootstrap initialization
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure JS is imported here too
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer text-center py-3 bg-light shadow-sm">
      <div className="container">
        <span className="text-muted">© 2025 Prychal</span>
        <div className="mt-3">
          <p>Для пожертвувань:</p>
          <p>Банківський рахунок: 1234567890</p>
          <p>PayPal: donate@example.com</p>
          <p>Дякуємо за вашу підтримку!</p>
        </div>
      </div>
    </footer>
  );
};

const BaseLayout = ({ children, isAuthenticated, handleLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Initialize Bootstrap collapse when the component mounts
  useEffect(() => {
    // Ensure Bootstrap's JavaScript is loaded and works with the navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      // Bootstrap should handle this automatically, but we can log to confirm
      console.log('Navbar toggler found, Bootstrap JS should handle collapse');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  // Set initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  }, []);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            Церква Причал
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacts">
                  Contacts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/socialmedia">
                  Social Media
                </NavLink>
              </li>

              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => {
                        handleLogout();
                        navigate('/login');
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>

            <button
              className="btn btn-theme ml-auto"
              onClick={toggleTheme}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div id="flash-message" className="flash-message"></div>
        {children}
      </div>

      <Footer />
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BaseLayout;