import { useMemo } from "react";

function PlayerAuthority({ player, onChangeAuthority }) {
  const laserAudio = useMemo(() => {
    const audio = new Audio("/sfx/laser_1.mp3");
    audio.volume = 0.2;
    return audio;
  }, []);
  const authorityAudio = useMemo(() => {
    const audio = new Audio("/sfx/authority_gain_1.wav");
    audio.volume = 0.9;
    return audio;
  }, []);
  const explosionAudio = useMemo(() => {
    const audio = new Audio("/sfx/explosion_1.mp3");
    audio.volume = 0.5;
    return audio;
  }, []);

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
    if (
      laserAudio &&
      laserAudio.currentTime > 0 &&
      !laserAudio.paused &&
      !laserAudio.ended &&
      laserAudio.readyState > 2
    )
      laserAudio.load();
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
        className="relative h-full p-8 bg-no-repeat bg-center bg-cover"
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
      </div>
    </div>
  );
}

export default PlayerAuthority;
