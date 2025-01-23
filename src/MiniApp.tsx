import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MiniApp = () => {
  return (
    <div
      className="w-full md:w-[430px] h-[100dvh] flex items-stretch select-none relative"
      dir="rtl"
    >
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default MiniApp;
