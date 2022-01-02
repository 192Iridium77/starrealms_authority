export default function Navigation({ history, onBack }) {
  return (
    <>
      <div className="text-2xl font-bold p-8">History</div>
      <div
        className="px-8"
        style={{
          overflowY: "auto",
          minWidth: "600px",
          maxHeight: "50vh",
          paddingTop: "1px",
          paddingBottom: "1px",
        }}
      >
        <div className="flex uppercase">
          <div
            className="w-4/12 p-2 bg-tertiary-800"
            style={{ outline: "1px solid white" }}
          >
            Turn
          </div>
          <div
            className="w-4/12 p-2 bg-tertiary-800"
            style={{ outline: "1px solid white" }}
          >
            P1 Authority
          </div>
          <div
            className="w-4/12 p-2 bg-tertiary-800"
            style={{ outline: "1px solid white" }}
          >
            P2 Authority
          </div>
        </div>
        {history.map((game) => (
          <div className="flex" key={game.turn}>
            <div
              className="w-4/12 p-2 bg-tertiary-800"
              style={{ outline: "1px solid white" }}
            >
              {game?.turn}
            </div>
            <div
              className="w-4/12 p-2 bg-tertiary-800"
              style={{ outline: "1px solid white" }}
            >
              {game?.player1.authority}
            </div>
            <div
              className="w-4/12 p-2 bg-tertiary-800"
              style={{ outline: "1px solid white" }}
            >
              {game?.player2.authority}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end p-8">
        <button onClick={onBack} className="px-2 py-1 bg-primary-600">
          Back
        </button>
      </div>
    </>
  );
}
