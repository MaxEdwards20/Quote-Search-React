import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { QuoteHolder } from "./components/QuoteHolder";

interface Quote {
  content: string;
  author: string;
  _id: string;
}

function App() {
  const [quotes, setQuotes] = useState<[Quote]>([
    { content: "", author: "", _id: "" },
  ]); // initial value
  const [searchParam, setSearchParam] = useState("");
  const [firstView, setFirstView] = useState(true); // change view if this is false
  const [randomQuote, setRandomQuote] = useState<Quote>({
    content: "",
    author: "",
    _id: "",
  });

  function handleSearchClick() {
    async function fetchData() {
      setFirstView(false);
      let url =
        "https://usu-quotes-mimic.vercel.app/api/search?query=" + searchParam;
      const result = await fetch(url);
      let json = await result.json();

      if (json.results.length < 1) {
        let m = {
          content:
            "Your query '" + searchParam + "' was unable to return anything.",
          author: "Please try again",
          _id: "invalid",
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
      const result = await fetch(
        "https://usu-quotes-mimic.vercel.app/api/random"
      );
      let json = await result.json();
      setRandomQuote({
        content: json.content,
        author: json.author,
        _id: json._id,
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
    if (firstView) {
      getRandomQuote();
    }
  }, []);

  return (
    <div className="container-fluid main_container d-flex bg-primary">
      <div className="card-body">
        <h1 className="card-title text-white"> Find a Quote </h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchParam}
            onChange={handleSearchInput}
            onKeyDown={handleEnter}
            className="form-control"
            placeholder="Enter Author Here"
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
            {firstView ? (
              <QuoteHolder
                key={randomQuote._id}
                author={randomQuote.author}
                content={randomQuote.content}
              ></QuoteHolder>
            ) : (
              quotes.map((quote: Quote) => (
                <QuoteHolder
                  key={quote._id}
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
