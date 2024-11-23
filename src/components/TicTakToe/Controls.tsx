export default function Controls({
  handleReset,
  handlePreviousMove,
  handleNextMove,
}: {
  handleReset: CallableFunction;
  handlePreviousMove: CallableFunction;
  handleNextMove: CallableFunction;
}) {
  return (
    <div>
      <button className="btn-primary" onClick={() => handleReset()}>
        Reset
      </button>
      <button className="btn-primary" onClick={() => handlePreviousMove()}>
        Previous Move
      </button>
      <button className="btn-primary" onClick={() => handleNextMove()}>
        Next Move
      </button>
    </div>
  );
}
