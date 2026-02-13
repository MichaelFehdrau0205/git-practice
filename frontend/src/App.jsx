import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookingPage from './components/BookingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'booking'
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [popularExperiences, setPopularExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch experiences from backend API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${API_URL}/experiences`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched experiences:', data); // For debugging
        setPopularExperiences(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences. Make sure the backend is running.');
        // Fallback to hardcoded data if API fails
        setPopularExperiences([
          { id: 1, title: 'Brooklyn Story Walk', location: 'New York', price: '$49' },
          { id: 2, title: 'Tokyo Night Eats', location: 'Tokyo', price: '$65' },
          { id: 3, title: 'Louvre in an Hour', location: 'Paris', price: '$55' },
          { id: 4, title: 'Sunset Thames Cruise', location: 'London', price: '$60' },
          { id: 5, title: 'Street Art Safari', location: 'Lisbon', price: '$35' },
          { id: 6, title: 'Desert Tea Ceremony', location: 'Marrakesh', price: '$42' },
          { id: 7, title: 'Hidden Ramen Tour', location: 'Osaka', price: '$52' },
          { id: 8, title: 'Historic Photo Walk', location: 'Rome', price: '$39' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []); // Empty dependency array means this runs once when component mounts

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
                src="/images/background.svg" 
                alt="Airbnb Experiences" 
                className="hero-image"
              />
            </div>
          </section>  
          {/* Additional content */}
         
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