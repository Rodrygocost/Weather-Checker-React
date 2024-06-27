import { useState } from "react";
import DataCard from "./components/SearchCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main">
        <DataCard />
        
      </div>
    </>
  );
}

export default App;
