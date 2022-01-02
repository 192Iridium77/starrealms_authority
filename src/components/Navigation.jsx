import { ReactComponent as Cog } from "./icons/Cog.svg";

export default function Navigation({ onOpenMenu }) {
  const Title = () => (
    <div className="text-white text-center text-2xl font-bold">
      {"Star Realms Authority"}
    </div>
  );

  return (
    <div className="z-20">
      <div className="container">
        <div className="flex justify-between py-8 items-center">
          <div className="flex items-center gap-4">
            <div className="desktop">
              <Title />
            </div>
          </div>
          <div className="mobile">
            <Title />
          </div>
          <div className="flex gap-4">
            <button className="p-2" onClick={onOpenMenu}>
              <div className="w-8 h-8">
                <Cog />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
