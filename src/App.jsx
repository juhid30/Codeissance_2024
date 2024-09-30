import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Test from "./components/Test";
import MapTest from "./components/MapTest";
import Heatmap from "./components/MapTest";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Heatmap />
      {/* <Test /> */}
    </>
  );
}

export default App;
