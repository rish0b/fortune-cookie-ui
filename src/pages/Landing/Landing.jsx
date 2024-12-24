import React, { useState } from "react";
import "./Landing.scss";

const Landing = () => {
  const [isPressed, setIsPressed] = useState(false);  // Track button press state
  const [showFortunePaper, setShowFortunePaper] = useState(false);
  const [fortune, setFortune] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [revealYourFortuneButtonText, setRevealYourFortuneButtonText] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const fetchFortune = async () => {
      setLoading(true);
      setError('');
      try {
          const response = await fetch('http://localhost:8000/fortune');
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          console.log(response)
          const data = await response.json(); 
          setFortune(data.fortune); 
          setLuckyNumbers(data.lucky_numbers);
      } catch (err) {
          setError('Failed to fetch fortune. Please try again.');
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  const handleGenerateFortune = () => {

    waitForCookieToDisappear();

    if(!showFortunePaper) {
        setFortune('');
        setLuckyNumbers([]);
        fetchFortune();
    }

    setShowFortunePaper(!showFortunePaper);

  };

  const waitForCookieToDisappear = async () => {
    if(revealYourFortuneButtonText)
        await sleep(2000)
    setRevealYourFortuneButtonText(!revealYourFortuneButtonText)
  }

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
            <img src="/assets/fortune_cookie.png" alt="Fortune Cookie" className={`fortune-cookie${showFortunePaper ? "-reveal" : ""}`} />
        
        {showFortunePaper && !revealYourFortuneButtonText && (
            <div className="fortune-text">
                <h3>{fortune}</h3>
                <p>{luckyNumbers.length != 0 ? "Lucky Numbers: " + luckyNumbers.join(', ') : ""}</p>
            </div>
        )}
      </div>

      <div className="button-container"> 
        <button 
          className={`generate-button ${isPressed ? 'pressed' : ''}`} 
          onClick={handleGenerateFortune} 
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
          onMouseLeave={handleMouseLeave} 
          disabled={showFortunePaper && revealYourFortuneButtonText} // need to disable the button in transit.
        > 
          {!showFortunePaper || revealYourFortuneButtonText ? "Reveal your fortune" : "Open another cookie"}
        </button>
      </div>
      <div className="landing-footer">
        <p>❤️&nbsp;Made by <a className="personal-link" href="#">rishab</a></p>
      </div>
    </div>
  );
};

export default Landing;
