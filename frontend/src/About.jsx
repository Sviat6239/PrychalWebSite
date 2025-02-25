// frontend/src/components/About.jsx
import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBlockClick = (blockId) => {
    setExpandedBlock(expandedBlock === blockId ? null : blockId);
  };

  const handleDocumentClick = (event) => {
    if (!event.target.closest('.text-block.full-content')) {
      setExpandedBlock(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <section className={`about-section py-5 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
      <div className="container">
        <h2 className="display-4 text-center mb-4">Про нас</h2>
        <p className="lead text-center">Вас вітає церква ЄХБ в Гдині!</p>
        <p className="text-center">Щонеділі ми збираємось щоб спільно прославляти нашого Бога.</p>
        <div className="row mt-5 justify-content-center">
          <div
            className={`col-md-5 ${isVisible ? 'fade-in visible' : 'fade-in'} text-block left-block ${
              expandedBlock === 'mission' ? 'full-content' : ''
            }`}
            onClick={() => handleBlockClick('mission')}
          >
            <h3>Наша Місія</h3>
            <p>
              Наша місія полягає в тому, щоб поширювати любов і милість Божу серед усіх людей. Ми прагнемо бути світлом у цьому світі, допомагаючи тим, хто потребує, і підтримуючи один одного в вірі.
            </p>
            <p>
              Ми віримо, що кожна людина заслуговує на любов і підтримку, незалежно від її походження чи обставин. Наша церква прагне створити середовище, де кожен може знайти розраду, натхнення і духовне зростання.
            </p>
            <p>
              Ми активно залучаємося до благодійних проектів, допомагаючи тим, хто потребує, і працюємо над зміцненням нашої громади через спільні заходи та ініціативи.
            </p>
          </div>
          <div className={`col-md-5 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            <h3>Наші Цінності</h3>
            <div
              className={`value-item text-block ${expandedBlock === 'love' ? 'full-content' : ''}`}
              onClick={() => handleBlockClick('love')}
            >
              <strong>Любов:</strong> Ми віримо в безумовну любов до всіх людей. Наша церква прагне бути прикладом цієї любові, приймаючи кожного з відкритим серцем і підтримуючи у важкі часи.
            </div>
            <div
              className={`value-item text-block ${expandedBlock === 'community' ? 'full-content' : ''}`}
              onClick={() => handleBlockClick('community')}
            >
              <strong>Спільнота:</strong> Ми створюємо міцні зв`язки між членами нашої церкви. Спільнота для нас - це не просто слово, а спосіб життя, де кожен може знайти підтримку і розуміння.
            </div>
            <div
              className={`value-item text-block ${expandedBlock === 'service' ? 'full-content' : ''}`}
              onClick={() => handleBlockClick('service')}
            >
              <strong>Служіння:</strong> Ми служимо нашій громаді через різні благодійні проекти. Наша церква активно залучається до допомоги тим, хто потребує, і працює над покращенням життя нашої громади.
            </div>
            <div
              className={`value-item text-block ${expandedBlock === 'faith' ? 'full-content' : ''}`}
              onClick={() => handleBlockClick('faith')}
            >
              <strong>Віра:</strong> Ми зміцнюємо нашу віру через молитву і вивчення Святого Письма. Віра для нас - це основа всього, що ми робимо, і ми прагнемо ділитися цією вірою з іншими.
            </div>
          </div>
        </div>
        <div className={`text-center mt-5 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <a className="btn btn-primary btn-lg" href="/contacts" role="button">
            Зв`язатися з нами
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;