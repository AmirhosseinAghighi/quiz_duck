import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="w-full bg-sky-blue p-8 sm:p-4 overflow-auto">
      <h1 className="text-4xl text-white font-extrabold text-center mb-10">
        Quiz Duck
      </h1>
      <Outlet />
    </div>
  );
};

export default AppLayout;
