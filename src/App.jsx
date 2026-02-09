import { useState, useEffect } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import CardContainer from "./components/CardContainer";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const pokemonIds = [1, 5, 15, 50, 150, 250, 350, 450, 550, 650, 750, 850];

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pokemonPromises = pokemonIds.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );
        const responses = await Promise.all(pokemonPromises);
        const pokemonData = await Promise.all(
          responses.map((res) => res.json())
        );
        const formattedCards = pokemonData.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        }));
        setCards(formattedCards);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  return (
    <>
      <Scoreboard
        currentScore={currentScore}
        bestScore={bestScore}
      ></Scoreboard>
      <CardContainer
        handleClick={handleCardClick}
        cards={cards}
      ></CardContainer>
    </>
  );
}

export default App;
