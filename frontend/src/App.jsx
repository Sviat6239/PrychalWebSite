// frontend/src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import Home from './Home';
import About from './About';
import Contacts from './Contacts';
import SocialMedia from "./SocialMedia.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <BaseLayout
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/socialmedia" element={<SocialMedia />} />
              </Routes>
            </BaseLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;