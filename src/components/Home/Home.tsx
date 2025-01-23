import React from "react";
import Profile from "./Components/Profile";
import Reports from "./Components/Reports";
import CreateGameCards from "./Components/GameCards/CreateGameCards";
import { useNavigate } from "react-router-dom";
import { gameMode, rooomActions } from "../../slices/room/room.slice";
import { useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startCreatingGame = (mode: gameMode) => {
    dispatch(rooomActions.setGameMode(mode));
    navigate("/create");
  };

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
      </div>
    </>
  );
};

export default Home;
