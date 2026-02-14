import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import AIDialog from './AIDialog';
import './Navbar.css';

const Navbar = ({ onContinue }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [hasSelectedDates, setHasSelectedDates] = useState(false);

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

  const handleNameChange = (e) => {
    setGuestName(e.target.value);
  };

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
    setHasSelectedDates(true);
  };

  const formatDateRange = () => {
    if (hasSelectedDates && dateRange[0].startDate && dateRange[0].endDate) {
      const start = format(dateRange[0].startDate, 'MMM d');
      const end = format(dateRange[0].endDate, 'MMM d');
      
      // If same date, just show one date
      if (start === end) {
        return start;
      }
      return `${start} - ${end}`;
    }
    return 'Add dates';
  };

  // Close calendar when clicking outside
  const handleCalendarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <nav className="navbar">
        {/* Row 1: Logo and Main Navigation */}
        <div className="navbar-top-row">
          <div className="navbar-container">
            {/* Logo */}
            <div className="navbar-logo">
              <svg width="30" height="32" viewBox="0 0 30 32" fill="none">
                <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zm0 27c-6.627 0-12-5.373-12-12S8.373 3 15 3s12 5.373 12 12-5.373 12-12 12z" fill="#ff385c"/>
              </svg>
              <span className="logo-text">airbnb</span>
            </div>

            {/* Navigation Links - Homes, Experiences, Services */}
            <div className="navbar-main-links">
              <a href="#homes" className="nav-link">
                <span>Homes</span>
              </a>
              <a href="#experiences" className="nav-link active">
                <span>Experiences</span>
                <span className="new-badge">NEW</span>
              </a>
              <a href="#services" className="nav-link">
                <span>Services</span>
                <span className="new-badge">NEW</span>
              </a>
            </div>

            {/* Right Side - Become a host, Globe, Profile */}
            <div className="navbar-right">
              <a href="#host" className="become-host">Become a host</a>
              <button className="globe-button" aria-label="Language and currency">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1 8a7 7 0 0 1 13.89-1.615l-1.38.46a5.5 5.5 0 0 0-10.51 0l-1.38-.46A7.001 7.001 0 0 1 1 8zm13.89 1.615A7.001 7.001 0 0 1 1 8c0-.34.025-.673.072-1l1.38.46a5.5 5.5 0 0 0 10.51 0l1.38-.46c.047.327.072.66.072 1a7 7 0 0 1-13.89 1.615z"/>
                </svg>
              </button>
              <button className="profile-menu">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="navbar-search-row">
          <div className="navbar-search">
            <div className="search-field">
              <label className="search-label">Where</label>
              <input 
                type="text" 
                placeholder="Search by city or landmark" 
                className="search-input"
              />
            </div>
            <span className="search-divider" />
            <div className="search-field" style={{ position: 'relative' }}>
              <label className="search-label">When</label>
              <input 
                type="text" 
                placeholder={formatDateRange()}
                className="search-input"
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
                value={formatDateRange()}
              />
              {showCalendar && (
                <div className="calendar-popup" onClick={handleCalendarClick}>
                 <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateChange}
                  months={1}
                  direction="vertical"
                  showDateDisplay={false}
                  showPreview={false}
                  showMonthAndYearPickers={false}
                  staticRanges={[]}
                  inputRanges={[]}
                  minDate={new Date()}
                  rangeColors={['#FF385C']}
                />
                  <div style={{ padding: '16px', textAlign: 'right', borderTop: '1px solid #eee' }}>
                    <button 
                      onClick={() => setShowCalendar(false)}
                      style={{
                        padding: '8px 16px',
                        background: '#FF385C',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
            <span className="search-divider" />
            <div className="search-field">
              <label className="search-label">Who</label>
              <input 
                type="text" 
                placeholder={hasSelectedDates ? "Add guests" : "Add dates first"}
                className={`search-input ${!hasSelectedDates ? 'search-muted' : ''}`}
                value={guestName}
                onChange={handleNameChange}
                disabled={!hasSelectedDates}
              />
            </div>
            <button className="search-button" aria-label="Search" onClick={openDialog}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* AI Dialog Component */}
      <AIDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog}
        userName={guestName}
      />
    </>
  );
};

export default Navbar;