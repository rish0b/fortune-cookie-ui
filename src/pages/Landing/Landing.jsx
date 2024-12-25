import React, { useState } from "react";
import "./Landing.scss";

const Landing = () => {
  const [isPressed, setIsPressed] = useState(false);  // Track button press state
  const [showFortunePaper, setShowFortunePaper] = useState(false);
  const [fortune, setFortune] = useState('');
  const [luckyNumbers, setLuckyNumbers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const RISHAB_SITE = import.meta.env.VITE_RISHAB_SITE;
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const loadingTexts = [
    "Unlocking wisdom...",
    "Unraveling paper...",
    "Crafting your destiny...",
    "Aligning the stars...",
    "Decoding message...",
    "Summoning answers...",
    "Charging your luck...",
    "Shuffling the numbers...",
    "Sealing your fate...",
    "Calculating your path..."
  ];

  const errorTexts = [
    "Oops! The paper got crumpled—try again!",
    "Uh-oh! The message got lost in the folds—retry?",
    "Whoops! The paper tore—give it another shot!",
    "The paper got stuck—let’s try that again!",
    "Oops! The ink smudged—retry your fate!",
    "The paper slipped—let’s give it another try!",
    "Something’s off with the parchment—try again!",
    "The paper jammed—time to try once more!",
    "Oops! The scroll got tangled—retry?",
    "The paper fluttered away—let’s give it another shot!"
  ];

  const fetchFortune = async () => {
    setError('');
    const controller = new AbortController();  
    const timeoutId = setTimeout(() => {
        controller.abort();  // Abort the fetch if it takes too long
    }, 2500);  // Timeout after 2.5 seconds

    try {

        const response = await fetch(API_ENDPOINT, {
            signal: controller.signal  // Pass the controller signal to the fetch request
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        setFortune(data.fortune);
        setLuckyNumbers(data.lucky_numbers);

    } catch (err) {
        
        if (err.name === 'AbortError') {
            setError('Request timed out. Please try again.');
        } else {
            setError('Failed to fetch fortune. Please try again.');
        }

        setFortune(errorTexts[Math.floor(Math.random() * errorTexts.length)]);
        setLuckyNumbers([]);

    } finally {

        clearTimeout(timeoutId);  

    } 
  };


  const handleGenerateFortune = () => {

    if(!showFortunePaper) {
        setLoading(true)
        setFortune('');
        setLuckyNumbers([]);

        waitForCookieToDisappear();

        fetchFortune();
    }

    setShowFortunePaper(!showFortunePaper);

  };

  const waitForCookieToDisappear = async () => {
    await sleep(2500);
    setLoading(false);
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
            {(!showFortunePaper || loading) && (
                <img src="/assets/fortune_cookie.png" alt="Fortune Cookie" className={`fortune-cookie${showFortunePaper ? "-reveal" : ""}`} />
            )}

            {/* NEED TO SHOW A DIFFERENT PAPER IF LOADING */}
            {showFortunePaper && !loading && (
                <div className="fortune-text">
                    <h3>{fortune}</h3>
                    {luckyNumbers.length != 0 && (
                        <p >{"Lucky Numbers: " + luckyNumbers.join(', ')}</p>
                    )}
                </div>
            )}
      </div>



      <div className="button-container"> 

        {!loading && (
            <button 
            className={`generate-button ${isPressed ? 'pressed' : ''} ${loading ? 'loading' : ''}`} 
            onClick={handleGenerateFortune} 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            onMouseLeave={handleMouseLeave} 
            > 
                {!showFortunePaper ? "Reveal your fortune" : "🔁 Open another cookie"}
            </button>
        )}
        {loading && (
            <button 
            className={`generate-button-loading`} 
            > 
                {loadingTexts[Math.floor(Math.random() * loadingTexts.length)]}
            </button>
        )}
        
      </div>



      <div className="landing-footer">
        <p>❤️&nbsp;Made by <a className="personal-link" target="_blank" rel="noopener noreferrer" href={RISHAB_SITE}>rishab</a></p>
      </div>
    </div>
  );
};

export default Landing;
