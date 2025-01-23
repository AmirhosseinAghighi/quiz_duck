import React from "react";
import { Outlet } from "react-router-dom";

const MiniApp = () => {
  return (
    <div
      className="w-full md:w-[430px] h-[100dvh] flex items-stretch select-none relative"
      dir="rtl"
    >
      <Outlet />
    </div>
  );
};

export default MiniApp;
