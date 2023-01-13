import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FormInput } from "./components/FormInput";
import { QuoteHolder } from "./components/QuoteHolder";

interface Quote {
  content: string;
  author: string; // ? means this is optional
}

function App() {
  const [quote, setQuote] = useState();
  const [quoteBox, addQuotes] = useState();
  const [searchParam, changeParam] = useState();
  return (
    <div className="App" color="blue">
      <div> {quote} </div>
      <div className="card">
        <button
          onClick={async () => {
            let quote = await getRandomQuote();
            let formatted = formatQuote(quote);
            setQuote(formatted); // What can I use here? How do I adjust the types for these state objects?
          }}
        >
          Click for a random Quote
        </button>
      </div>
      <div className="card">
        <FormInput label="Search"> {searchParam}</FormInput>{" "}
        {/* I am not sure why this FormInput is red underlined */}
        <button
          onClick={async () => {
            let quotes = await searchQuotes({ searchParam }); // How can I send the value from the form to the function to search with?
            console.log(quotes.results);
            let quoteHolders = quotes.map((quote: Quote) => (
              <QuoteHolder
                author={quote.author}
                content={quote.content}
              ></QuoteHolder>
            ));
            addQuotes(quoteHolders); // why does this not work and display these QuoteHolder elements?
          }}
        >
          Search
        </button>
      </div>
      <div>{quoteBox}</div>
    </div>
  );
}

async function getRandomQuote() {
  const result = await fetch("https://api.quotable.io/random");
  return await result.json();
}

async function searchQuotes(quote: string) {
  // How can I pass the value from the FormInput down here? Is using a state value the best way?
  let url = "https://api.quotable.io/search/quotes?query=" + quote;
  const result = await fetch(url);
  return await result.json();
}

function formatQuote(quote: Quote) {
  return quote.content + " --- " + quote.author;
}

export default App;
