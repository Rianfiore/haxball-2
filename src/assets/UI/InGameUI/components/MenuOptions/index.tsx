import { UI } from "@/assets/UI";
import { BiSolidExit } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export function MenuOptions() {
  function handleResumeGame() {
    UI.handleCloseGameMenu();
  }

  return (
    <div className="fixed bg-neutral-black-200/50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8 rounded-lg shadow-xl flex flex-col gap-12">
      <div className="flex gap-2 text-2xl text-neutral-white">
        <div className="flex flex-col items-center">
          <h2>Red team</h2>

          <div className="w-[200px] h-[300px] bg-neutral-black-200/100 rounded-md"></div>
        </div>

        <div className="flex flex-col items-center">
          <h2>Spectators</h2>

          <div className="w-[200px] h-[300px] bg-neutral-black-200/100 rounded-md"></div>
        </div>

        <div className="flex flex-col items-center">
          <h2>Blue team</h2>

          <div className="w-[200px] h-[300px] bg-neutral-black-200/100 rounded-md"></div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-around text-2xl">
        <button
          onClick={handleResumeGame}
          className="bg-neutral-black-500 px-4 py-1 rounded-lg flex items-center justify-between gap-2"
        >
          <FaPlay size={12} />
          Resume <p className="text-lg">( ESC )</p>
        </button>
        <button className="bg-neutral-black-500 px-4 py-1 rounded-lg flex items-center justify-between gap-2">
          <IoSettingsSharp size={16} />
          Settings
        </button>
        <button className="bg-support-blue400 px-4 py-1 rounded-lg flex items-center justify-between gap-2 ">
          <FaPause size={14} />
          Pause <p className="text-lg">( P )</p>
        </button>
        <button className="bg-support-red px-4 py-1 rounded-lg flex items-center justify-between gap-2">
          <BiSolidExit size={20} />
          Leave
        </button>
      </div>
    </div>
  );
}
