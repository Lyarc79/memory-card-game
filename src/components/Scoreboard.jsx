export default function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard">
      <div>Score:{currentScore}</div>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}
