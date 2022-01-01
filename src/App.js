import { useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import NewGame from "./components/NewGame";
import PlayerAuthority from "./components/PlayerAuthority";

export default function App() {
  const [showNewGame, setShowNewGame] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [game, setGame] = useState();
  const [history, setHistory] = useState();

  const onSave = (data) => {
    setHistory([data]);
    setGame(data);
  };

  const nextTurn = () => {
    setHistory((prevState) => [...prevState, game]);
    setGame((prevState) => ({ ...prevState, turn: prevState.turn + 1 }));
  };

  const onChangeAuthority = (player, value) => {
    setGame((prevState) => ({
      ...prevState,
      [player]: { ...prevState[player], authority: value },
    }));
  };

  return (
    <div>
      <div className="hidden lg:block">
        <Navigation />
      </div>
      <div>
        {game ? (
          <>
            <div className="lg:container flex flex-col sm:flex-row lg:gap-12">
              <div className="sm:w-6/12 flex justify-center">
                <div className="h-full w-full" style={{ maxWidth: "420px" }}>
                  <PlayerAuthority
                    player={game?.player1}
                    onChangeAuthority={(authority) =>
                      onChangeAuthority("player1", authority)
                    }
                  ></PlayerAuthority>
                </div>
              </div>
              <div className="sm:w-6/12">
                <div className="h-full w-full" style={{ maxWidth: "420px" }}>
                  <PlayerAuthority
                    player={game?.player2}
                    onChangeAuthority={(authority) =>
                      onChangeAuthority("player2", authority)
                    }
                  ></PlayerAuthority>
                </div>
              </div>
            </div>
            <div className="hidden lg:block container">
              <div className="flex items-center my-12 gap-8">
                <div>Turn: {game.turn}</div>
                <button onClick={nextTurn} className="py-1 px-2 bg-primary-600">
                  Next Turn
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="py-1 px-2 underline"
                >
                  Show History
                </button>
              </div>
            </div>
          </>
        ) : showNewGame ? (
          <NewGame onSave={onSave} />
        ) : (
          <div
            className="container flex justify-center items-center"
            style={{ height: "70vh" }}
          >
            <button
              className="primary-button"
              onClick={() => setShowNewGame(!showNewGame)}
            >
              New Game
            </button>
          </div>
        )}
      </div>
      {showHistory && (
        <>
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <div className="bg-tertiary-300">
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
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-2 py-1 bg-primary-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          ></div>
        </>
      )}
    </div>
  );
}
