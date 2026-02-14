import React, { useState, useEffect, useRef } from 'react';
import ConfirmationModal from './ConfirmationModal';
import './AIDialog.css';

const AIDialog = ({ isOpen, onClose, userName, onGoToBooking }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [showPhotos, setShowPhotos] = useState(false);
  const hasShownGreeting = useRef(false);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showConfirmButtons, setShowConfirmButtons] = useState(false);
  const messagesEndRef = useRef(null);

  const aiResponses = {
    greeting: {
      text: userName 
        ? `Hello ${userName.split(' ')[0]}! Which experience do you want to explore? Try church, city, winery, food, or adventure! Or you can browse all the experiences we can offer to you.`
        : "Which experience do you want to explore? Try church, city, winery, food, or adventure! Or you can browse all the experiences we can offer to you.",
      photos: []
    },
    church: {
      text: "Here are beautiful church experiences!",
      photos: [
        { id: 1, url: '/images/paris-notredame.jpg', title: 'Historic Cathedral Tour', price: 55 },
        { id: 2, url: '/images/paris-chapelle.jpg', title: 'Chapel Art & Architecture', price: 45 },
        { id: 3, url: '/images/london-stpaul.jpg', title: 'Sacred Sites Walk', price: 39 }
      ]
    },
    city: {
      text: "Check out these amazing city experiences!",
      photos: [
        { id: 4, url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400', title: 'Urban Walking Tour', price: 49 },
        { id: 5, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', title: 'City Lights Experience', price: 79 },
        { id: 6, url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400', title: 'Street Food Adventure', price: 65 }
      ]
    },
    winery: {
      text: "Perfect! Here are wine experiences for you!",
      photos: [
        { id: 7, url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400', title: 'Vineyard Tour & Tasting', price: 89 },
        { id: 8, url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400', title: 'Wine Making Workshop', price: 95 },
        { id: 9, url: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400', title: 'Sunset Wine Experience', price: 119 }
      ]
    },
    food: {
      text: "Check out these incredible culinary experiences!",
      photos: [
        { id: 10, url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', title: 'Cooking Class', price: 75 },
        { id: 11, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', title: 'Food Tasting', price: 85 },
        { id: 12, url: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=400', title: 'Culinary Tour', price: 99 }
      ]
    },
    adventure: {
      text: "Here are some amazing adventure experiences!",
      photos: [
        { id: 13, url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400', title: 'Mountain Hiking', price: 69 },
        { id: 14, url: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400', title: 'Rock Climbing', price: 129 },
        { id: 15, url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', title: 'Kayaking Adventure', price: 89 }
      ]
    }
  };

  useEffect(() => {
    if (isTyping && currentTypingText) {
      if (typingIndex < currentTypingText.length) {
        const timeout = setTimeout(() => {
          setTypingIndex(typingIndex + 1);
        }, 18);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        setShowPhotos(true);
      }
    }
  }, [typingIndex, currentTypingText, isTyping]);

  useEffect(() => {
    if (isOpen && !hasShownGreeting.current) {
      hasShownGreeting.current = true;
      handleAIResponse(aiResponses.greeting);
    }
    
    if (!isOpen) {
      hasShownGreeting.current = false;
      setMessages([]);
      setShowConfirmButtons(false);
    }
  }, [isOpen, aiResponses.greeting]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, showPhotos, showConfirmButtons]);

  const handleAIResponse = (response) => {
    setIsTyping(true);
    setCurrentTypingText(response.text);
    setTypingIndex(0);
    setShowPhotos(false);
    setShowConfirmButtons(false);
    
    setMessages(prev => [...prev, {
      type: 'ai',
      text: response.text,
      photos: response.photos,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setMessages(prev => [...prev, {
      type: 'user',
      text: userInput,
      timestamp: new Date()
    }]);

    const input = userInput.toLowerCase();
    let response = aiResponses.greeting;

    if (input.includes('all') || input.includes('browse') || input.includes('everything')) {
      response = {
        text: "Here's a selection of all our amazing experiences!",
        photos: [
          ...aiResponses.church.photos.slice(0, 2),
          ...aiResponses.city.photos.slice(0, 2),
          ...aiResponses.food.photos.slice(0, 2),
          ...aiResponses.winery.photos.slice(0, 2),
          ...aiResponses.adventure.photos.slice(0, 2)
        ]
      };
    } else if (input.includes('church') || input.includes('cathedral') || input.includes('chapel')) {
      response = aiResponses.church;
    } else if (input.includes('city') || input.includes('urban') || input.includes('downtown')) {
      response = aiResponses.city;
    } else if (input.includes('winery') || input.includes('wine') || input.includes('vineyard')) {
      response = aiResponses.winery;
    } else if (input.includes('adventure') || input.includes('hiking') || input.includes('outdoor')) {
      response = aiResponses.adventure;
    } else if (input.includes('food') || input.includes('cooking') || input.includes('culinary')) {
      response = aiResponses.food;
    }

    setUserInput('');

    setTimeout(() => {
      handleAIResponse(response);
      setShowPhotos(true);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedExperiences(prev => {
      const isSelected = prev.some(exp => exp.id === photo.id);
      if (isSelected) {
        return prev.filter(exp => exp.id !== photo.id);
      } else {
        return [...prev, photo];
      }
    });
  };

  const handleStartOver = () => {
    setSelectedExperiences([]);
    setMessages([]);
    setShowConfirmButtons(false);
    hasShownGreeting.current = false;
    setTimeout(() => {
      handleAIResponse(aiResponses.greeting);
    }, 100);
  };

  const handleReview = () => {
    if (selectedExperiences.length === 0) return;
    setShowConfirmButtons(true);
  };

  const handleConfirmBooking = () => {
    setShowConfirmationModal(true);
    onClose();
  };

  const handleCancelBooking = () => {
    handleStartOver();
  };

  const handleConfirmationCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmationConfirm = () => {
    setShowConfirmationModal(false);
    if (onGoToBooking) {
      onGoToBooking(selectedExperiences);
    }
    setSelectedExperiences([]);
  };

  if (!isOpen) return (
    <>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        selectedExperiences={selectedExperiences}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
        userName={userName}
      />
    </>
  );

  return (
    <>
      <div className="ai-dialog-overlay" onClick={onClose}>
        <div className="ai-dialog-container" onClick={(e) => e.stopPropagation()}>
          <div className="ai-dialog-header">
            <div className="ai-dialog-title">
              <span className="ai-icon">🤖</span>
              AI Experience Guide
            </div>
            <button className="ai-dialog-close" onClick={onClose}>×</button>
          </div>

          <div className="ai-dialog-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'ai' && (
                  <div className="ai-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-text">
                    {message.type === 'ai' && index === messages.length - 1 && isTyping
                      ? currentTypingText.substring(0, typingIndex)
                      : message.text}
                  </div>
                  
                  {showConfirmButtons && index === messages.length - 1 && (
                    <div className="confirmation-inline">
                      <span className="confirmation-text">Ready to confirm?</span>
                      <div className="confirmation-buttons">
                        <button className="icon-cancel-btn" onClick={handleCancelBooking} aria-label="Cancel">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
                        <button className="icon-confirm-btn" onClick={handleConfirmBooking} aria-label="Confirm Booking">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19V5M5 12l7-7 7 7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {message.photos && message.photos.length > 0 && (
                    <div className="message-photos">
                      {message.photos.map((photo, photoIndex) => {
                        const isSelected = selectedExperiences.some(exp => exp.id === photo.id);
                        return (
                          <div
                            key={photo.id}
                            className={`photo-card ${
                              index === messages.length - 1 && showPhotos ? 'animate-in' : ''
                            } ${isSelected ? 'selected' : ''}`}
                            style={{
                              animationDelay: index === messages.length - 1 && showPhotos
                                ? `${photoIndex * 0.2}s`
                                : '0s'
                            }}
                            onClick={() => handlePhotoClick(photo)}
                          >
                            {isSelected && (
                              <div className="photo-checkmark">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                                  <path d="M7.629 14.566l-4.242-4.243L2 11.71l5.629 5.629L18.5 6.468 17.114 5.082z"/>
                                </svg>
                              </div>
                            )}
                            <img
                              src={photo.url}
                              alt={photo.title}
                              onError={(e) => {
                                e.currentTarget.src = '/images/paris-notredame.jpg';
                              }}
                            />
                            <div className="photo-title">{photo.title}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-dialog-input-container">
            <input
              type="text"
              className="ai-dialog-input"
              placeholder="Tell me what you're interested in..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="icon-x-btn" onClick={handleStartOver} aria-label="Cancel">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 8.586L3.707 2.293 2.293 3.707 8.586 10l-6.293 6.293 1.414 1.414L10 11.414l6.293 6.293 1.414-1.414L11.414 10l6.293-6.293-1.414-1.414L10 8.586z"/>
              </svg>
            </button>
            <button className="icon-arrow-btn" onClick={selectedExperiences.length > 0 && userInput.trim() === '' ? handleReview : handleSendMessage} aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        selectedExperiences={selectedExperiences}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
      />
    </>
  );
};

export default AIDialog;