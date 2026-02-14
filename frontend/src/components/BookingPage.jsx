import React, { useState } from 'react';
import './BookingPage.css';

const BookingPage = ({ selectedExperiences, onBack }) => {
  const [bookings, setBookings] = useState(
    selectedExperiences.map(exp => ({
      ...exp,
      date: '',
      time: '',
      guests: 1
    }))
  );
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryPayload, setSummaryPayload] = useState(null);
  const [inlineWarning, setInlineWarning] = useState('');

  // Calculate total cost
  const totalCost = bookings.reduce((sum, booking) => {
    return sum + (booking.price * booking.guests);
  }, 0);

  // Handle booking field changes
  const updateBooking = (index, field, value) => {
    const newBookings = [...bookings];
    newBookings[index][field] = value;
    setBookings(newBookings);
  };

  // Handle final reservation
  const handleReservation = async () => {
    // Validate all fields are filled
    const allFilled = bookings.every(b => b.date && b.time);
    
    if (!allFilled) {
      setInlineWarning('Please fill in date and time for all experiences before continuing.');
      return;
    }
    setInlineWarning('');

    // Prepare reservation data
    const reservationData = {
      bookings: bookings,
      totalCost: totalCost,
      timestamp: new Date().toISOString()
    };

    setSummaryPayload(reservationData);
    setShowSummaryModal(true);
  };

  const handleCloseSummary = () => {
    setShowSummaryModal(false);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  const handleSaveSummary = () => {
    if (!summaryPayload) return;
    const blob = new Blob([JSON.stringify(summaryPayload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-summary-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="booking-page">
      {/* Header */}
      <div className="booking-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1>Complete Your Booking</h1>
        <p className="subtitle">
          You've selected {bookings.length} experience{bookings.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Booking Grid - 3 columns × 2 rows */}
      <div className="booking-grid">
        {bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            {/* Experience Image - 3" wide × 2" height (288px × 192px) */}
            <div className="booking-image-container">
              <img 
                src={booking.image || booking.url} 
                alt={booking.name || booking.title} 
                className="booking-image"
                onError={(e) => {
                  e.currentTarget.src = '/images/paris-notredame.jpg';
                }}
              />
            </div>

            {/* Experience Details */}
            <div className="booking-details">
              <h3 className="experience-title">{booking.name || booking.title}</h3>
              
              {/* Date Picker */}
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={booking.date}
                  onChange={(e) => updateBooking(index, 'date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="date-input"
                />
              </div>

              {/* Time Picker */}
              <div className="form-group">
                <label>Time</label>
                <select
                  value={booking.time}
                  onChange={(e) => updateBooking(index, 'time', e.target.value)}
                  className="time-select"
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              {/* Guests */}
              <div className="form-group">
                <label>Guests</label>
                <select
                  value={booking.guests}
                  onChange={(e) => updateBooking(index, 'guests', parseInt(e.target.value))}
                  className="guests-select"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="price-info">
                <span className="price-label">Price:</span>
                <span className="price-amount">${booking.price} × {booking.guests} = ${booking.price * booking.guests}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Reserve Button */}
      <div className="booking-footer">
        <div className="total-section">
          <div className="total-label">Total Cost:</div>
          <div className="total-amount">${totalCost}</div>
        </div>
        
        <button 
          className="reserve-button"
          onClick={handleReservation}
        >
          Reserve All Experiences
        </button>
      </div>

      {inlineWarning && (
        <div className="booking-inline-warning">
          {inlineWarning}
        </div>
      )}

      {showSummaryModal && summaryPayload && (
        <div className="summary-modal-overlay" onClick={handleCloseSummary}>
          <div className="summary-modal" onClick={(e) => e.stopPropagation()}>
            <div className="summary-header">
              <div className="summary-logo">
                <span className="summary-logo-mark" aria-hidden="true">◎</span>
                <span className="summary-logo-text">airbnb</span>
              </div>
              <h2>Final Booking Summary</h2>
              <p>We keep a record and will make your experience more enjoyable.</p>
            </div>

            <div className="summary-section">
              <h3>Mini Information</h3>
              <div className="summary-grid">
                <div>
                  <span className="summary-label">Experiences</span>
                  <span className="summary-value">{summaryPayload.bookings.length}</span>
                </div>
                <div>
                  <span className="summary-label">Total Guests</span>
                  <span className="summary-value">
                    {summaryPayload.bookings.reduce((sum, b) => sum + b.guests, 0)}
                  </span>
                </div>
                <div>
                  <span className="summary-label">Date Range</span>
                  <span className="summary-value">
                    {summaryPayload.bookings[0]?.date || '—'}
                  </span>
                </div>
                <div>
                  <span className="summary-label">Created</span>
                  <span className="summary-value">
                    {new Date(summaryPayload.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-section">
              <h3>Selected Experiences</h3>
              <div className="summary-list">
                {summaryPayload.bookings.map((booking, index) => (
                  <div key={index} className="summary-item">
                    <div>
                      <div className="summary-item-title">{booking.name || booking.title}</div>
                      <div className="summary-item-meta">
                        {booking.date || 'Date'} · {booking.time || 'Time'} · {booking.guests} guests
                      </div>
                    </div>
                    <div className="summary-item-price">
                      ${booking.price * booking.guests}
                    </div>
                  </div>
                ))}
              </div>
              <p className="summary-note">
                Need to make changes? We can help with adjustments up to two weeks before your experience,
                so everything stays smooth and enjoyable. Learn more about changes and support.
              </p>
              <a className="summary-link" href="#support">
                View change policy
              </a>
            </div>

            <div className="summary-total">
              <span>Total Cost</span>
              <strong>${summaryPayload.totalCost}</strong>
            </div>

            <div className="summary-actions">
              <button className="summary-btn secondary" onClick={handlePrintSummary}>
                Printout
              </button>
              <button className="summary-btn primary" onClick={handleSaveSummary}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
