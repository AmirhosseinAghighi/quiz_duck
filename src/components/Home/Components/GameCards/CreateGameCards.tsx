import React from "react";
import twoDuck from "../../../../assets/2v2.png";
import groupDuck from "../../../../assets/group.png";
import clsx from "clsx";
import { gameMode } from "../../../../slices/room/room.slice";

const Modes = {
  ["2v2"]: {
    banner: twoDuck,
    title: "کلکل جدید",
    desc: "با یکی دوستات میتونی مسابقه بدی و کل بندازی!",
  },
  ["group"]: {
    banner: groupDuck,
    title: "کلکل گروهی",
    desc: "با گروهی از دوستات میتونی مسابقه بدی و کل بندازی!",
  },
};

interface Props {
  mode: gameMode;
  onClick?: () => void;
}

const CreateGameCards = ({ mode, onClick }: Props) => {
  return (
    <div
      className={clsx("flex mt-8 rounded-xl items-center p-2 cursor-pointer", {
        ["bg-dark_orange"]: mode === "group",
        ["bg-main_yellow"]: mode === "2v2",
      })}
      style={{
        boxShadow:
          "0px 2px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 4px 2px rgba(0, 0, 0, 0.15) inset",
      }}
      onClick={onClick}
    >
      <img src={Modes[mode].banner} alt="banner" className={"w-1/2 h-full"} />
      <div className="flex flex-col justify-center text-white mr-4">
        <h1 className="font-extrabold text-2xl sm:text-4xl">
          {Modes[mode].title}
        </h1>
        <p className="text-md text-text-gray font-bold mt-2 text-sm sm:text-lg">
          {Modes[mode].desc}
        </p>
      </div>
    </div>
  );
};

export default CreateGameCards;
