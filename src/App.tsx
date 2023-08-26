import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import AllRoutes from "./pages/AllRoutes";

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <div className="App">
      <header className="bg-indigo-500 text-white p-4">
        <h1 className="text-2xl font-bold">
          {currentRoute === "/" ? "Contact Management App" : "Charts and Maps"}
        </h1>
      </header>
      <div className="flex w-full">
        <div className="sticky top-0 h-screen">
          <SideBar />
        </div>
        <div className="w-full">
          <AllRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
