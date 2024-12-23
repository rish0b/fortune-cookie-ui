import React, { useState } from "react";
import "./Landing.scss";

const Landing = () => {
  const [isPressed, setIsPressed] = useState(false);  // Track button press state
  const [showFortunePaper, setShowFortunePaper] = useState(false);

  const handleGenerateFortune = () => {
    setShowFortunePaper(!showFortunePaper);
  };

  // Handle mouse down (button pressed)
  const handleMouseDown = () => {
    setIsPressed(true);
  };

  // Handle mouse up (button released)
  const handleMouseUp = () => {
    setIsPressed(false);
  };

  // Optional: Handle mouse leave (if the mouse leaves the button area)
  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <div className="landing-container">
      <div className="landing-title">
        <h1>Fortune Cookie 2.0</h1>
      </div>
      <div className="subtitle">
        <h3>Fortune cookies just got their latest update—now powered by AI ✨</h3>
      </div>
      
      <div className="image-container">
        <img src="/assets/fortune_cookie.png" alt="Fortune Cookie" className="fortune-cookie" />
        {showFortunePaper && (
            <img
                src="/assets/fortune_cookie_paper.png"
                alt="Fortune Cookie Paper"
                className="fortune-cookie-paper"
            />
        )}
      </div>

      <div className="button-container">
        <button 
          className={`generate-button ${isPressed ? 'pressed' : ''}`} 
          onClick={handleGenerateFortune} 
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
          onMouseLeave={handleMouseLeave}
        >
          Reveal your fortune
        </button>
      </div>
      <div className="landing-footer">
        <p>❤️&nbsp;Made by <a className="personal-link" href="#">rishab</a></p>
      </div>
    </div>
  );
};

export default Landing;
