import { useState, useEffect, useRef } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import CardContainer from "./components/CardContainer";

const idPicker = () => {
  let idSet = new Set();
  while (idSet.size < 12) {
    let newId = Math.floor(Math.random() * 900) + 1;
    idSet.add(newId);
  }
  return [...idSet];
};

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [pokemonIds, setPokemonIds] = useState(idPicker());
  const [isLoading, setIsLoading] = useState(false);
  const isFirstLoad = useRef(true);

  const handleCardClick = (cardId) => {
    if (clickedCards.includes(cardId)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setPokemonIds(idPicker());
      setCurrentScore(0);
      setClickedCards([]);
      setIsLoading(true);
      setCards([]);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      setClickedCards((prevCards) => [...prevCards, cardId]);
    }
    let shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responses;
        let pokemonPromises = pokemonIds.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
        );
        const timerPromise = new Promise((resolve) =>
          setTimeout(resolve, 1500),
        );
        if (isFirstLoad.current) {
          responses = await Promise.all(pokemonPromises);
          isFirstLoad.current = false;
        } else {
          [responses] = await Promise.all([
            Promise.all(pokemonPromises),
            timerPromise,
          ]);
        }

        const pokemonData = await Promise.all(
          responses.map((res) => res.json()),
        );
        const formattedCards = pokemonData.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        }));
        setCards(formattedCards);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pokemonIds]);

  return (
    <>
      <Scoreboard
        currentScore={currentScore}
        bestScore={bestScore}
      ></Scoreboard>
      <CardContainer
        handleClick={handleCardClick}
        cards={cards}
        isLoading={isLoading}
      ></CardContainer>
    </>
  );
}

export default App;
