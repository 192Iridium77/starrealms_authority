import { usePersistedState } from "./usePersistedState";
import { useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import Navigation from "./components/Navigation";
import NewGame from "./components/NewGame";
import PlayerAuthority from "./components/PlayerAuthority";
import Modal from "./components/Modal";
import History from "./components/History";

export default function App() {
  const [showNewGame, setShowNewGame] = usePersistedState(false, "showNewGame");
  const [game, setGame] = usePersistedState(undefined, "game");
  const [history, setHistory] = usePersistedState(undefined, "history");

  const [showHistory, setShowHistory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  const onShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const clearPersistedState = () => {
    setShowMenu(false);
    setShowHistory(false);
    setHistory(undefined);
    setGame(undefined);
    setShowNewGame(true);
  };

  return (
    <div>
      <div className="hidden lg:block">
        <Navigation onOpenMenu={onShowMenu} />
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
      {showMenu && (
        <Modal>
          {showHistory ? (
            <History
              history={history}
              onBack={() => setShowHistory(!showHistory)}
            ></History>
          ) : (
            <>
              <div className="text-2xl font-bold p-8">Settings</div>
              <div className="px-8 flex justify-center flex-col">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-3 bg-primary-600 block"
                >
                  Match History
                </button>
                <button
                  onClick={clearPersistedState}
                  className="px-4 py-3 bg-primary-600 block mt-4"
                >
                  New Game
                </button>
              </div>
              <div className="flex justify-end p-8">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="px-2 py-1 bg-primary-600"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
