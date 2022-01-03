import { useState } from "react";

import { ReactComponent as SwitchVertical } from "./icons/SwitchVertical.svg";
import { Howl } from "howler";

function PlayerAuthority({ player, onChangeAuthority }) {
  const [flip, setFlip] = useState(false);

  const laserAudio = new Howl({
    src: ["/sfx/laser_1.mp3"],
    volume: 0.2,
  });
  const authorityAudio = new Howl({
    src: ["/sfx/authority_gain_1.wav"],
    volume: 0.9,
  });
  const explosionAudio = new Howl({
    src: ["/sfx/explosion_1.mp3"],
    volume: 0.6,
  });

  const PlusIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    );
  };

  const MinusIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 12H4"
        />
      </svg>
    );
  };

  const onAddAuthority = () => {
    authorityAudio.play();
    onChangeAuthority(player.authority + 1);
  };

  const onTakeAuthority = () => {
    laserAudio.play();
    onChangeAuthority(player.authority - 1);
  };

  const roundAuth = () => {
    if (player.authority > 50) return 50;
    if (player.authority === 0) {
      setTimeout(() => {
        explosionAudio.play();
      }, 400);
      return 0;
    }
    if (player.authority < 0) return 0;
    return Math.ceil(player.authority / 10) * 10;
  };

  const getImage = () => {
    return `url(images/authority_${roundAuth()}.jpeg)`;
  };

  return (
    <div className="bg-black p-1 lg:p-4 h-50vh sm:h-screen lg:h-70vh">
      <div
        className={`relative h-full p-8 bg-no-repeat bg-center bg-cover transform ${
          flip && "rotate-180"
        }`}
        style={{
          backgroundImage: getImage(),
        }}
      >
        <div className="font-bold text-2xl text-center">{player.name}</div>
        <div
          className="flex justify-between items-center"
          style={{ height: "80%" }}
        >
          <div>
            <button
              className="bg-primary-600 font-bold w-16 h-16 rounded-full flex justify-center items-center"
              onClick={onAddAuthority}
            >
              <PlusIcon></PlusIcon>
            </button>
          </div>
          <div className="w-32 lg:w-40 h-24 lg:h-32 relative select-none">
            <img
              width="100%"
              className="absolute inset-0 z-0"
              src="/images/authority.png"
              alt="authority background"
            />
            <div className="absolute inset-x-0 flex justify-center items-center pt-6 lg:pt-8">
              <div className="text-3xl text-black">{player.authority}</div>
            </div>
          </div>
          <div>
            <button
              className="bg-primary-600 font-bold w-16 h-16 rounded-full flex justify-center items-center"
              onClick={onTakeAuthority}
            >
              <MinusIcon></MinusIcon>
            </button>
          </div>
        </div>
        <button
          onClick={() => setFlip(!flip)}
          className="lg:hidden absolute bottom-0 left-0 p-4"
        >
          <SwitchVertical className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default PlayerAuthority;
