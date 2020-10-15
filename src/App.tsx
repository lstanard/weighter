import React from "react";
import "./App.css";
import EquipmentPanel from "./components/EquipmentPanel/EquipmentPanel";

function App() {
  return (
    <div className="app">
      <h1>Weighter</h1>
      <div className="main">
        <EquipmentPanel />
      </div>
    </div>
  );
}

export default App;
