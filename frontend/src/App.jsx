import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingPage from './components/BookingPage';
import { experiences } from './data/experiences';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search/filter
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = experiences.filter(exp => {
      // Search by city
      if (exp.city.toLowerCase().includes(lowerQuery)) return true;
      
      // Search by location
      if (exp.location.toLowerCase().includes(lowerQuery)) return true;
      
      // Search by title
      if (exp.title.toLowerCase().includes(lowerQuery)) return true;
      
      // Search by keywords
      if (exp.keywords.some(keyword => keyword.includes(lowerQuery))) return true;
      
      return false;
    });

    setFilteredExperiences(filtered);
  };

  // Handle experience selection
  const handleExperienceClick = (experience) => {
    setSelectedExperiences(prev => {
      const isSelected = prev.some(exp => exp.id === experience.id);
      if (isSelected) {
        return prev.filter(exp => exp.id !== experience.id);
      } else {
        return [...prev, experience];
      }
    });
  };

  // Clear all selections
  const handleClearAll = () => {
    setSelectedExperiences([]);
  };

  // Go to booking page
  const handleFinalizeSelection = () => {
    if (selectedExperiences.length > 0) {
      setCurrentPage('booking');
    }
  };

  // Handle back to home
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedExperiences([]);
    setSearchQuery('');
    setFilteredExperiences(experiences);
  };

  return (
    <div className="app">
      {/* Navigation Bar */}
      <Navbar onSearch={handleSearch} />

      {/* Conditional Page Rendering */}
      {currentPage === 'home' ? (
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-image-container">
              <img 
                src="/images/background-new.jpg" 
                alt="Airbnb Experiences" 
                className="hero-image"
              />
            </div>
          </section>

          {/* Experiences Section */}
          <section className="experiences-section">
            <div className="experiences-header">
              <h2>Popular experiences in New York</h2>
              {searchQuery && (
                <p className="search-results">
                  Showing {filteredExperiences.length} results for "{searchQuery}"
                </p>
              )}
            </div>

            <div className="experiences-grid">
              {filteredExperiences.map((experience, index) => {
                const isSelected = selectedExperiences.some(exp => exp.id === experience.id);
                
                return (
                  <div
                    key={experience.id}
                    className={`experience-card ${isSelected ? 'selected' : ''} slide-in`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleExperienceClick(experience)}
                  >
                    {/* Selection Checkmark */}
                    {isSelected && (
                      <div className="experience-checkmark">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="experience-badge">{experience.category}</div>

                    {/* Image */}
                    <img 
                      src={experience.image} 
                      alt={experience.title}
                      className="experience-image"
                    />

                    {/* Content */}
                    <div className="experience-content">
                      <h3 className="experience-title">{experience.title}</h3>
                      <p className="experience-location">{experience.location}</p>
                      <div className="experience-footer">
                        <span className="experience-price">From ${experience.price} / guest</span>
                        <span className="experience-rating">★ {experience.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results Message */}
            {filteredExperiences.length === 0 && (
              <div className="no-results">
                <p>No experiences found for "{searchQuery}"</p>
                <button onClick={() => handleSearch('')}>Clear Search</button>
              </div>
            )}
          </section>

          {/* Floating Action Buttons */}
          {selectedExperiences.length > 0 && (
            <div className="floating-actions">
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear All
              </button>
              <button className="finalize-btn" onClick={handleFinalizeSelection}>
                Finalize Selection ({selectedExperiences.length})
              </button>
            </div>
          )}
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