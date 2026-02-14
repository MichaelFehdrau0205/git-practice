import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedExperiences, setSelectedExperiences] = useState([]);

  const handleSearch = (query) => {
    // Search functionality placeholder
  };

  const handleGoToBooking = (experiences) => {
    setSelectedExperiences(experiences);
    setCurrentPage('booking');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedExperiences([]);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} onGoToBooking={handleGoToBooking} />

      {currentPage === 'home' ? (
        <main className="main-content">
          <section className="hero-section">
            <div className="hero-image-container">
              <img 
                src="/images/background-new.jpg" 
                alt="Airbnb Experiences" 
                className="hero-image"
              />
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