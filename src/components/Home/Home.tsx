import React from "react";
import Profile from "./Components/Profile";
import Reports from "./Components/Reports";
import CreateGameCards from "./Components/GameCards/CreateGameCards";

const Home = () => {
  return (
    <>
      <div className="w-full flex">
        <Profile className="w-full sm:mx-2 md:w-1/2" />
        <Reports className="w-1/2 sm:mx-2 hidden md:flex" />
      </div>
      <div className="flex flex-col w-full">
        <CreateGameCards mode="2v2" />
        <CreateGameCards mode="group" />
      </div>
    </>
  );
};

export default Home;
