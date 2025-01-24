import React, { useState } from "react";
import Profile from "./Components/Profile";
import Reports from "./Components/Reports";
import CreateGameCards from "./Components/GameCards/CreateGameCards";
import { useNavigate } from "react-router-dom";
import { gameMode, roomActions } from "../../slices/room/room.slice";
import { useDispatch } from "react-redux";
import { FaShare } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startCreatingGame = (mode: gameMode) => {
    dispatch(roomActions.setGameMode(mode));
    navigate("/create");
  };

  const [code, setCode] = useState("");

  return (
    <>
      <div className="w-full flex">
        <Profile className="w-full sm:mx-2 md:w-1/2" />
        <Reports className="w-1/2 sm:mx-2 hidden md:flex" />
      </div>
      <div className="flex flex-col w-full">
        <CreateGameCards mode="2v2" onClick={() => startCreatingGame("2v2")} />
        <CreateGameCards
          mode="group"
          onClick={() => startCreatingGame("group")}
        />
        <div className="mt-4  px-2 py-1 rounded-full bg-black bg-opacity-25 flex flex-row-reverse justify-between items-center">
          <input
            className="w-full py-2 bg-transparent h-full"
            placeholder="کد بازی"
            type="text"
            onChange={(e) => setCode(e.target.value)}
          />
          <FaShare
            className="text-white mx-4 w-10 h-full"
            onClick={() => navigate(`/join?code=${code}`)}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
