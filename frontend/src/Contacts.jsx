// frontend/src/components/Contacts.jsx
import { useState, useEffect } from 'react';

const Contacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    // Trigger fade-in animation when the component mounts
    setIsVisible(true);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setFlashMessage(`Copied: ${text}`);
        setTimeout(() => setFlashMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch((err) => {
        console.error('Copy error: ', err);
      });
  };

  const handleButtonClick = (text) => {
    copyToClipboard(text);
    // Update button text temporarily (optional, if you want to mimic the Django behavior)
    const button = document.querySelector(`button[data-copy="${text}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <section className={`contact-section py-5 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
      <div className="container">
        <h2 className="display-4 text-center mb-4">Контакти</h2>
        <p className="lead text-center mb-5">Ми завжди раді допомогти вам. Зв`яжіться з нами за будь-якими питаннями або пропозиціями.</p>
        <div className="row">
          <div className={`col-md-6 mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="card h-100 bg-green-highlight">
              <div className="card-body text-center">
                <h5 className="card-title">Адреса</h5>
                <p className="card-text">📍 Oficerska 15, 81-548 Gdynia</p>
                <a
                  href="https://www.google.com/maps/place/Oficerska+15,+81-548+Gdynia/@54.4763179,18.5406696,17.82z/data=!4m6!3m5!1s0x46fda0912f59f32d:0x90ed26aab0da3161!8m2!3d54.4761401!4d18.5417186!16s%2Fg%2F11crqmz59s?authuser=0&entry=ttu"
                  target="_blank"
                  className="btn btn-primary animated-button"
                  rel="noopener noreferrer" // Security best practice for external links
                >
                  Відкрити на карті
                </a>
              </div>
            </div>
          </div>
          <div className={`col-md-6 mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="card h-100 bg-green-highlight">
              <div className="card-body text-center">
                <h5 className="card-title">Телефон</h5>
                <p className="card-text">📞 +48 575 077 680</p>
                <button
                  className="btn btn-primary animated-button"
                  onClick={() => handleButtonClick('+48 575 077 680')}
                  data-copy="+48 575 077 680"
                >
                  Скопіювати номер
                </button>
              </div>
            </div>
          </div>
          <div className={`col-md-6 mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="card h-100 bg-green-highlight">
              <div className="card-body text-center">
                <h5 className="card-title">Електронна пошта</h5>
                <p className="card-text">✉️ example@example.com</p>
                <button
                  className="btn btn-primary animated-button"
                  onClick={() => handleButtonClick('example@example.com')}
                  data-copy="example@example.com"
                >
                  Скопіювати email
                </button>
              </div>
            </div>
          </div>
          <div className={`col-md-6 mb-4 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <div className="card h-100 bg-green-highlight">
              <div className="card-body text-center">
                <h5 className="card-title">Години роботи</h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
        {/* Flash message for copy feedback */}
        {flashMessage && (
          <div className="flash-message show" id="flash-message">
            {flashMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contacts;