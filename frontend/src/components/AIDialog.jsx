import React, { useState } from 'react';
import './AIDialog.css';

const AIDialog = ({ onClose, onContinue }) => {
  const [whereInput, setWhereInput] = useState('');
  const [whenInput, setWhenInput] = useState('');
  const [whoInput, setWhoInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle user input submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!whereInput.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response (you'll connect to backend later)
    setTimeout(() => {
      // Mock AI response
      const travelDetails = [
        whereInput.trim(),
        whenInput.trim() ? `for ${whenInput.trim()}` : null,
        whoInput.trim() ? `${whoInput.trim()} guest${Number(whoInput) === 1 ? '' : 's'}` : null
      ].filter(Boolean).join(' • ');
      const mockResponse = `Great choice! I found 15 amazing experiences in ${whereInput}. ${travelDetails ? `Details: ${travelDetails}.` : ''} Select the ones you'd like to explore:`;
      setAiResponse(mockResponse);
      
      // Mock thumbnails based on city input
      const cityLower = whereInput.toLowerCase();
      let mockThumbnails = [];
      
      if (cityLower.includes('london')) {
        mockThumbnails = generateMockThumbnails('london', 15);
      } else if (cityLower.includes('paris')) {
        mockThumbnails = generateMockThumbnails('paris', 15);
      } else if (cityLower.includes('tokyo')) {
        mockThumbnails = generateMockThumbnails('tokyo', 15);
      } else {
        mockThumbnails = generateMockThumbnails('london', 15); // default
      }
      
      setThumbnails(mockThumbnails);
      setIsLoading(false);
    }, 1500);
  };

  // Generate mock thumbnails
  const generateMockThumbnails = (city, count) => {
    const thumbnails = [];
    const basePrices = { london: 35, paris: 45, tokyo: 30 };
    const basePrice = basePrices[city] || 35;
    
    for (let i = 1; i <= count; i++) {
      thumbnails.push({
        id: `${city}-${i}`,
        name: `${city.charAt(0).toUpperCase() + city.slice(1)} Experience ${i}`,
        image: '/images/thumbnails/placeholder.svg',
        price: basePrice + (i * 2) // Varying prices
      });
    }
    return thumbnails;
  };

  // Handle thumbnail selection
  const toggleThumbnail = (id) => {
    if (selectedThumbnails.includes(id)) {
      setSelectedThumbnails(selectedThumbnails.filter(tid => tid !== id));
    } else {
      if (selectedThumbnails.length < 15) {
        setSelectedThumbnails([...selectedThumbnails, id]);
      }
    }
  };

  // Handle final selection
  const handleFinalSelection = () => {
    const selectedExps = thumbnails.filter(t => selectedThumbnails.includes(t.id));
    console.log('Selected experiences:', selectedExps);
    
    // Pass selected experiences to parent (will be used for navigation)
    if (onContinue) {
      onContinue(selectedExps);
    }
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Dialog Header */}
        <div className="dialog-header">
          <h2>AI Travel Assistant</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Dialog Content */}
        <div className="dialog-content">
          
          {/* AI Message Area */}
          <div className="ai-message">
            <p>👋 Hi! Tell me where, when, and who is traveling so I can tailor the results.</p>
            {aiResponse && (
              <p className="ai-response">{aiResponse}</p>
            )}
          </div>

          {/* User Input Form */}
          <form onSubmit={handleSubmit} className="input-form">
            <div className="ai-form-grid">
              <label className="ai-field">
                <span className="ai-label">Where</span>
                <input
                  type="text"
                  value={whereInput}
                  onChange={(e) => setWhereInput(e.target.value)}
                  placeholder="City or destination"
                  className="user-input"
                  disabled={isLoading}
                />
              </label>
              <label className="ai-field">
                <span className="ai-label">When</span>
                <input
                  type="text"
                  value={whenInput}
                  onChange={(e) => setWhenInput(e.target.value)}
                  placeholder="Add dates"
                  className="user-input"
                  disabled={isLoading}
                />
              </label>
              <label className="ai-field">
                <span className="ai-label">Who</span>
                <input
                  type="number"
                  min="1"
                  value={whoInput}
                  onChange={(e) => setWhoInput(e.target.value)}
                  placeholder="Guests"
                  className="user-input"
                  disabled={isLoading}
                />
              </label>
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Thumbnails Grid */}
          {thumbnails.length > 0 && (
            <div className="thumbnails-section">
              <p className="selection-info">
                Select up to 15 experiences ({selectedThumbnails.length}/15 selected)
              </p>
              
              <div className="thumbnails-grid">
                {thumbnails.map((thumb) => (
                  <div
                    key={thumb.id}
                    className={`thumbnail-card ${selectedThumbnails.includes(thumb.id) ? 'selected' : ''}`}
                    onClick={() => toggleThumbnail(thumb.id)}
                  >
                    <img src={thumb.image} alt={thumb.name} />
                    <div className="thumbnail-overlay">
                      {selectedThumbnails.includes(thumb.id) && (
                        <div className="checkmark">✓</div>
                      )}
                    </div>
                    <p className="thumbnail-name">{thumb.name}</p>
                  </div>
                ))}
              </div>

              {selectedThumbnails.length > 0 && (
                <button 
                  className="next-button"
                  onClick={handleFinalSelection}
                >
                  Continue with {selectedThumbnails.length} experiences →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDialog;
