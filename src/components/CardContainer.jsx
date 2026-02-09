import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardContainer({ handleClick }) {
  const [cards, setCards] = useState([]);
  const pokemonIds = [1, 5, 15, 50, 150, 250, 350, 450, 550, 650, 750, 850];

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
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          image={card.image}
          handleClick={() => handleClick(card.id)}
        ></Card>
      ))}
    </div>
  );
}
