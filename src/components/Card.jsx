export default function Card({ name, image, handleClick }) {
  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
}
