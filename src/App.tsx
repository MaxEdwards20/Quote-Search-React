import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { QuoteHolder } from "./components/QuoteHolder";

interface Quote {
  content: string;
  author: string;
  key: string;
}

function App() {
  const [quotes, setQuotes] = useState<[Quote]>([
    { content: "", author: "", key: "" },
  ]); // initial value
  const [searchParam, setSearchParam] = useState("");
  const [showRandom, setFirstView] = useState(true); // change view if this is false
  const [randomQuote, setRandomQuote] = useState<Quote>({
    content: "",
    author: "",
    key: "",
  });

  function handleSearchClick() {
    setFirstView(false); // remove random quote once user searches their own
    async function fetchData() {
      let url = "https://api.quotable.io/search/quotes?query=" + searchParam;
      const result = await fetch(url);
      let json = await result.json();
      console.log(url);
      console.log(json);
      if (json.results.length < 1) {
        let m = {
          content:
            "Your query '" + searchParam + "' was unable to return anything.",
          author: "Please try again",
          key: "invalid",
        };
        setQuotes([m]);
      } else {
        setQuotes(json.results);
      }
    }
    if (searchParam && searchParam.length > 0) {
      // verify there is something in the input to use
      fetchData();
    }
  }

  function getRandomQuote() {
    async function fetchData() {
      const result = await fetch("https://api.quotable.io/random");
      let json = await result.json();
      console.log("Fetched random quote", json);
      setRandomQuote({
        content: json.content,
        author: json.author,
        key: json.id,
      });
    }
    fetchData();
  }

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(event.target.value);
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      handleSearchClick();
    }
  }

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div
      className="container-fluid main_container d-flex bg-primary"
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      <div className="card-body">
        <h1 className="card-title text-white"> Find a Quote </h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchParam}
            onChange={handleSearchInput}
            onKeyDown={handleEnter}
            className="form-control"
            placeholder="Lincoln"
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
        </div>
        <div className="list-group">
          <ul className="list-group">
            {showRandom ? (
              <QuoteHolder
                key={randomQuote.key}
                author={randomQuote.author}
                content={randomQuote.content}
              ></QuoteHolder>
            ) : (
              quotes.map((quote: Quote) => (
                <QuoteHolder
                  key={quote.key}
                  author={quote.author}
                  content={quote.content}
                ></QuoteHolder>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
