import Card from "./Card";

export default function CardContainer({ handleClick, cards, isLoading }) {
  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <div className="pokeball"></div>
          <p>Catching new Pokemon...</p>
        </div>
      ) : (
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
      )}
    </>
  );
}
