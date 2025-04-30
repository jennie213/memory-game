import flipSfx from './assets/flip.mp3';
import matchSfx from './assets/match.mp3';
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import Welcome from './components/Welcome'; 

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const flipSound = useRef(null);
  const matchSound = useRef(null);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle card choice
  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
      flipSound.current.play();  // Play flip sound when card is clicked
    } else {
      setChoiceTwo(card);
      flipSound.current.play();  // Play flip sound for second card
    }
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // Match found, play match sound
        matchSound.current.play();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices after each turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      {showWelcome ? (
        <Welcome onStart={() => setShowWelcome(false)} />
      ) : (
        <>
          <h1>MystiMatch</h1>
          <button onClick={shuffleCards}>New Game</button>

          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            ))}
          </div>
          <p>Turns: {turns}</p>
        </>
      )}

      <audio ref={flipSound} src={flipSfx} preload="auto" />
      <audio ref={matchSound} src={matchSfx} preload="auto" />
    </div>
  );
}

export default App;
