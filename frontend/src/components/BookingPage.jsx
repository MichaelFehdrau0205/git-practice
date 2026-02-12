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
      alert('Please fill in date and time for all experiences');
      return;
    }

    // Prepare reservation data
    const reservationData = {
      bookings: bookings,
      totalCost: totalCost,
      timestamp: new Date().toISOString()
    };

    console.log('Reservation Data:', reservationData);
    
    // TODO: Send to backend API in Phase 2
    // For now, just show confirmation
    alert(`Reservation confirmed! Total: $${totalCost}\n\nCheck console for details.`);
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
                src={booking.image} 
                alt={booking.name} 
                className="booking-image"
              />
            </div>

            {/* Experience Details */}
            <div className="booking-details">
              <h3 className="experience-title">{booking.name}</h3>
              
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
    </div>
  );
};

export default BookingPage;
