import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, selectedExperiences, onCancel, onConfirm, userName }) => {
  if (!isOpen) return null;

  const firstName = userName ? userName.trim().split(' ')[0] : '';
  const headline = firstName ? `${firstName}, is this your final decision?` : 'Is this your final decision?';

  return (
    <div className="confirmation-modal-overlay" onClick={onCancel}>
      <div className="confirmation-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-modal-header">
          <h2>{headline}</h2>
          <p>Review your selected experiences before booking.</p>
        </div>

        <hr className="confirmation-divider" />

        <div className="confirmation-experiences-grid">
          {selectedExperiences.map((experience) => (
            <div key={experience.id} className="confirmation-experience-card">
              <img 
                src={experience.url || experience.image} 
                alt={experience.title} 
                className="confirmation-experience-image"
                onError={(e) => {
                  e.currentTarget.src = '/images/paris-notredame.jpg';
                }}
              />
              <div className="confirmation-experience-info">
                <h3>{experience.title}</h3>
                <p className="confirmation-price">From ${experience.price || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="confirmation-modal-actions">
          <button className="confirmation-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirmation-confirm-btn" onClick={onConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
