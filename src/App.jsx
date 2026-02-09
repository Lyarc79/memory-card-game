import { useState } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import CardContainer from "./components/CardContainer";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCards([]);
      return;
    }
    setCurrentScore((prevScore) => prevScore + 1);
    setClickedCards((prevCards) => [...prevCards, cardId]);
  };

  return (
    <>
      <Scoreboard
        currentScore={currentScore}
        bestScore={bestScore}
      ></Scoreboard>
      <CardContainer handleClick={handleCardClick}></CardContainer>
    </>
  );
}

export default App;
