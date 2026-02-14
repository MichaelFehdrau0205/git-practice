import React, { useState, useEffect, useRef } from 'react';
import './AIDialog.css';

const AIDialog = ({ isOpen, onClose, userName }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [showPhotos, setShowPhotos] = useState(false);
  const hasShownGreeting = useRef(false);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [viewMode, setViewMode] = useState('chat'); // 'chat' or 'review'

  // Sample AI responses with photo suggestions
  const aiResponses = {
    greeting: {
      text: userName 
        ? `Hello ${userName.split(' ')[0]}! Which experience do you want to explore? Try church, city, winery, food, or adventure!`
        : "Which experience do you want to explore? Try church, city, winery, food, or adventure!",
      photos: []
    },
    church: {
      text: "Here are beautiful church experiences!",
      photos: [
        { id: 1, url: 'https://images.unsplash.com/photo-1564594143981-f84277ab9d3c?w=400', title: 'Historic Cathedral Tour' },
        { id: 2, url: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=400', title: 'Chapel Art & Architecture' },
        { id: 3, url: 'https://images.unsplash.com/photo-1605962228706-0f52292dda28?w=400', title: 'Sacred Sites Walk' }
      ]
    },
    city: {
      text: "Check out these amazing city experiences!",
      photos: [
        { id: 4, url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400', title: 'Urban Walking Tour' },
        { id: 5, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', title: 'City Lights Experience' },
        { id: 6, url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400', title: 'Street Food Adventure' }
      ]
    },
    winery: {
      text: "Perfect! Here are wine experiences for you!",
      photos: [
        { id: 7, url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400', title: 'Vineyard Tour & Tasting' },
        { id: 8, url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400', title: 'Wine Making Workshop' },
        { id: 9, url: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400', title: 'Sunset Wine Experience' }
      ]
    },
    food: {
      text: "Check out these incredible culinary experiences!",
      photos: [
        { id: 10, url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400', title: 'Cooking Class' },
        { id: 11, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', title: 'Food Tasting' },
        { id: 12, url: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=400', title: 'Culinary Tour' }
      ]
    },
    adventure: {
      text: "Here are some amazing adventure experiences!",
      photos: [
        { id: 13, url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400', title: 'Mountain Hiking' },
        { id: 14, url: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400', title: 'Rock Climbing' },
        { id: 15, url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', title: 'Kayaking Adventure' }
      ]
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (isTyping && currentTypingText) {
      if (typingIndex < currentTypingText.length) {
        const timeout = setTimeout(() => {
          setTypingIndex(typingIndex + 1);
        }, 30); // Speed of typing (30ms per character)
        return () => clearTimeout(timeout);
      } else {
        // Typing complete
        setIsTyping(false);
        setShowPhotos(true);
      }
    }
  }, [typingIndex, currentTypingText, isTyping]);

  // Initial greeting - only show once
  useEffect(() => {
    if (isOpen && !hasShownGreeting.current) {
      hasShownGreeting.current = true;
      handleAIResponse(aiResponses.greeting);
    }
    
    // Reset when dialog closes
    if (!isOpen) {
      hasShownGreeting.current = false;
      setMessages([]);
    }
  }, [isOpen]);

  const handleAIResponse = (response) => {
    setIsTyping(true);
    setCurrentTypingText(response.text);
    setTypingIndex(0);
    setShowPhotos(false);
    
    setMessages(prev => [...prev, {
      type: 'ai',
      text: response.text,
      photos: response.photos,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      text: userInput,
      timestamp: new Date()
    }]);

    // Determine AI response based on keywords
    const input = userInput.toLowerCase();
    let response = aiResponses.greeting;

    if (input.includes('church') || input.includes('cathedral') || input.includes('chapel')) {
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
    
    // Delay AI response slightly for realism
    setTimeout(() => {
      handleAIResponse(response);
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
    setViewMode('chat');
    hasShownGreeting.current = false;
    // Trigger greeting again
    setTimeout(() => {
      handleAIResponse(aiResponses.greeting);
    }, 100);
  };

  const handleReview = () => {
    setViewMode('review');
  };

  const handleBackToChat = () => {
    setViewMode('chat');
  };

  if (!isOpen) return null;

  return (
    <div className="ai-dialog-overlay" onClick={onClose}>
      <div className="ai-dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="ai-dialog-header">
          <div className="ai-dialog-title">
            <span className="ai-icon">🤖</span>
            AI Experience Guide
          </div>
          <button className="ai-dialog-close" onClick={onClose}>×</button>
        </div>

        {viewMode === 'chat' ? (
          <>
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
                      {message.type === 'ai' && index === messages.length - 1 && isTyping && (
                        <span className="typing-cursor">|</span>
                      )}
                    </div>
                    
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
                              <img src={photo.url} alt={photo.title} />
                              <div className="photo-title">{photo.title}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
              <button className="ai-dialog-send" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="ai-dialog-review">
            <div className="review-header">
              <h2>Review Your Selections</h2>
              <p>
                {userName 
                  ? `Hey ${userName.split(' ')[0]}, great choice! You selected ${selectedExperiences.length} experience${selectedExperiences.length !== 1 ? 's' : ''}.`
                  : `You selected ${selectedExperiences.length} experience${selectedExperiences.length !== 1 ? 's' : ''}.`
                }
              </p>
            </div>
            
            <div className="review-experiences">
              {selectedExperiences.map((exp) => (
                <div key={exp.id} className="review-card">
                  <img src={exp.url} alt={exp.title} />
                  <div className="review-card-content">
                    <h3>{exp.title}</h3>
                    <button 
                      className="remove-btn"
                      onClick={() => handlePhotoClick(exp)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="review-actions">
              <button className="back-to-chat-btn" onClick={handleBackToChat}>
                ← Add More Experiences
              </button>
              <button className="confirm-booking-btn">
                Confirm & Book
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      {viewMode === 'chat' && (
        <div className="ai-dialog-floating-actions">
          <button className="floating-btn ghost-btn" onClick={handleStartOver}>
            Start Over
          </button>
          {selectedExperiences.length > 0 && (
            <button className="floating-btn primary-btn" onClick={handleReview}>
              Review ({selectedExperiences.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AIDialog;