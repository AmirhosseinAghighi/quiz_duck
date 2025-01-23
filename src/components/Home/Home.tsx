import React from "react";
import Profile from "./Components/Porfile";
import Reports from "./Components/Reports";
import CreateGameCards from "./Components/GameCards/CreateGameCards";

const Home = () => {
  return (
    <>
      <div className="w-full flex">
        <Profile className="w-1/2 mx-2" />
        <Reports className="w-1/2 mx-2" />
      </div>
      <div className="flex flex-col w-full">
        <CreateGameCards mode="2v2" />
        <CreateGameCards mode="group" />
      </div>
    </>
  );
};

export default Home;
