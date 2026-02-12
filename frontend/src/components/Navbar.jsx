import React, { useState } from 'react';
import AIDialog from './AIDialog';
import './Navbar.css';

const Navbar = ({ onContinue }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleContinue = (experiences) => {
    setIsDialogOpen(false);
    if (onContinue) {
      onContinue(experiences);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <svg width="30" height="32" viewBox="0 0 30 32" fill="none">
              <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 27c-6.627 0-12-5.373-12-12S8.373 3 15 3s12 5.373 12 12-5.373 12-12 12z" fill="#ff385c"/>
            </svg>
            <span className="logo-text">airbnb</span>
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <a href="#stays" className="nav-link">Stays</a>
            <a href="#experiences" className="nav-link active">Experiences</a>
          </div>

          {/* Search Bar - triggers AI Dialog */}
          <div
            className="navbar-search"
            onClick={openDialog}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                openDialog();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span className="search-segment">Anywhere</span>
            <span className="search-divider" />
            <span className="search-segment">Any week</span>
            <span className="search-divider" />
            <span className="search-segment search-muted">Add guests</span>
            <button className="search-button" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>

          {/* User Profile */}
          <div className="navbar-profile">
            <button className="profile-button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* AI Dialog Component */}
      {isDialogOpen && (
        <AIDialog 
          onClose={closeDialog} 
          onContinue={handleContinue}
        />
      )}
    </>
  );
};

export default Navbar;
