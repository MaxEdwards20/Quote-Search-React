import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FormInput } from "./components/FormInput";
import { QuoteHolder } from "./components/QuoteHolder";

interface Quote {
  content: string;
  author: string; // ? means this is optional
}

function App() {
  const [quotes, setQuotes] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  function handleSearchClick() {
    async function fetchData() {
      let url = "https://api.quotable.io/search/quotes?query=" + searchParam;
      const result = await fetch(url);
      let json = await result.json();
      setQuotes(json.results);
    }
    if (searchParam && searchParam.length > 0) {
      fetchData();
    }
  }

  async function getRandomQuote() {
    const result = await fetch("https://api.quotable.io/random");
    return await result.json();
  }

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(event.target.value);
  }

  return (
    <div className="card bg-primary" style={{ width: "100%" }}>
      <div className="card-body">
        <h1 className="card-title text-white"> Find a Quote </h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchParam}
            onChange={handleSearchInput}
            className="form-control"
            placeholder="Search Quotes Here"
          ></input>
          <div className="input-group-prepend">
            <button
              type="button"
              className="btn btn-secondary btn-large btn-block mr-2 padding-3"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          <div>
            {
              <ul className="list-group">
                {quotes.map((quote: Quote) => (
                  <QuoteHolder
                    author={quote.author}
                    content={quote.content}
                  ></QuoteHolder>
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
