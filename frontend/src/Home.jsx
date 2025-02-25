// frontend/src/components/Home.jsx
import { useState, useEffect } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container mt-5">
      <div className={`jumbotron text-center ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
        <h1 className="display-4">Раді вітати!</h1>
        <hr className="my-4" />
        <p>Ми раді вітати Вас в нашій церкві!</p>
        <a
          className="btn btn-primary btn-lg animated-button"
          href="/about"
          role="button"
        >
          Про нас
        </a>
      </div>

      <div className="row mt-5">
        <div className={`col-md-6 mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="card h-100 bg-green-highlight">
            <div className="card-body text-center">
              <h5 className="card-title">Події</h5>
              <p className="card-text">Приєднуйтесь до наших подій та заходів.</p>
              <a
                href="/socialmedia"
                className="btn btn-outline-primary animated-button"
              >
                Дізнатися більше
              </a>
            </div>
          </div>
        </div>
        <div className={`col-md-6 mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <div className="card h-100 bg-green-highlight">
            <div className="card-body text-center">
              <h5 className="card-title">Контакти</h5>
              <p className="card-text">Зв`яжіться з нами для будь-яких питань.</p>
              <a
                href="/contacts"
                className="btn btn-outline-primary animated-button"
              >
                Дізнатися більше
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;