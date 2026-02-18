export default function Scoreboard({ currentScore, bestScore }) {
  return (
    <>
      <h1 className="title">
        <span className="title-left">Pokémon </span>
        <span className="title-right">Memory Game</span>
      </h1>
      <div className="scoreboard">
        <div>SCORE: {currentScore}</div>
        <div>HIGH SCORE: {bestScore}</div>
      </div>
    </>
  );
}
