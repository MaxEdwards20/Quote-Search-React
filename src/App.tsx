import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={async () => {
            let quote = await getRandomQuote();
            console.log("Quote received: ");
            console.log(quote.content);
          }}
        >
          Click me for a Quote
        </button>
      </div>

      <div id="quoteBox"></div>
    </div>
  );
}

async function getRandomQuote() {
  console.log("Grabbing a quote");
  const result = await fetch("https://api.quotable.io/random");
  return await result.json();
}

export default App;
