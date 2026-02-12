import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'booking'
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const popularExperiences = [
    { id: 1, title: 'Brooklyn Story Walk', location: 'New York', price: '$49' },
    { id: 2, title: 'Tokyo Night Eats', location: 'Tokyo', price: '$65' },
    { id: 3, title: 'Louvre in an Hour', location: 'Paris', price: '$55' },
    { id: 4, title: 'Sunset Thames Cruise', location: 'London', price: '$60' },
    { id: 5, title: 'Street Art Safari', location: 'Lisbon', price: '$35' },
    { id: 6, title: 'Desert Tea Ceremony', location: 'Marrakesh', price: '$42' },
    { id: 7, title: 'Hidden Ramen Tour', location: 'Osaka', price: '$52' },
    { id: 8, title: 'Historic Photo Walk', location: 'Rome', price: '$39' }
  ];

  // Handle navigation to booking page
  const handleContinueToBooking = (experiences) => {
    setSelectedExperiences(experiences);
    setCurrentPage('booking');
  };

  // Handle back to home
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedExperiences([]);
  };

  return (
    <div className="app">
      {/* Navigation Bar - always visible */}
      <Navbar onContinue={handleContinueToBooking} />

      {/* Conditional Page Rendering */}
      {currentPage === 'home' ? (
        <main className="main-content">
          {/* Hero Section with Background Image */}
          <section className="hero-section">
            <div className="hero-image-container">
              <img 
                src="/images/background.jpg" 
                alt="Airbnb Experiences" 
                className="hero-image"
              />
              <div className="hero-overlay">
                <h1 className="hero-title">Not sure where to go? Perfect.</h1>
                <p className="hero-subtitle">
                  Find stays, experiences, and memories around the world.
                </p>
              </div>
            </div>
          </section>

          {/* Additional content */}
          <section className="content-section">
            <div className="container">
              <h2>Popular destinations</h2>
              <p>Start planning by choosing a city in the search bar.</p>
            </div>
          </section>

          <section className="experience-section">
            <div className="container">
              <div className="section-header">
                <h2>Popular experiences</h2>
                <p>Handpicked activities people love right now.</p>
              </div>
              <div className="experience-grid">
                {popularExperiences.map((experience) => (
                  <div className="experience-card" key={experience.id}>
                    <img
                      src="/images/thumbnails/placeholder.svg"
                      alt={experience.title}
                      className="experience-image"
                    />
                    <div className="experience-card-body">
                      <div className="experience-title">{experience.title}</div>
                      <div className="experience-meta">
                        <span>{experience.location}</span>
                        <span>{experience.price} / person</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="main-content">
          <BookingPage 
            selectedExperiences={selectedExperiences}
            onBack={handleBackToHome}
          />
        </main>
      )}
    </div>
  );
}

export default App;
