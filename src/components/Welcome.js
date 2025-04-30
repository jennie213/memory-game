import React from 'react';
import './Welcome.css';
import Gamelogo from '../assets/Gamelogo.png';
import PlayIcon from '../assets/play-icon.png';

function Welcome({ onStart }) {
  return (
    <div className="welcome-container">
      <img src={Gamelogo} alt="Game Logo" className="game-logo" />
      <button className="play-button" onClick={onStart}>
        <img src={PlayIcon} alt="Play" className="play-icon" />
      </button>

      <footer className="welcome-footer">
        &copy; {new Date().getFullYear()} By Jenia
      </footer>
    </div>
  );
}

export default Welcome;
