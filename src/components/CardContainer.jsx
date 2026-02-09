import Card from "./Card";

export default function CardContainer({ handleClick, cards }) {
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
