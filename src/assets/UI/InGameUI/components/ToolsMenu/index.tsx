import { UI } from "@/assets/UI";
import { FaVolumeHigh } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export function ToolsMenu() {
  function handleOpenMenu() {
    UI.isGameMenuOpened = !UI.isGameMenuOpened;
  }

  return (
    <>
      <span className="justify-self-end items-center bg-neutral-black-200/50 px-4 py-2 border-b-2 rounded-b-lg flex justify-between gap-2 text-2xl shadow-lg cursor-pointer">
        <span className="bg-neutral-black-500 p-2 rounded-md">
          <FaVolumeHigh size={20} />
        </span>
        <span
          className="flex gap-1 items-center bg-neutral-black-500 p-2 rounded-md text-base cursor-pointer"
          onClick={handleOpenMenu}
        >
          <IoMenu size={20} />
        </span>
      </span>
    </>
  );
}
