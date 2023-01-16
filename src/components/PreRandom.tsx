export function PreRandom({}) {
  return (
    <div
      className="container-fluid main_container d-flex bg-primary"
      style={{ width: "100%", height: "100%" }}
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
        </div>
        <div className="list-group">
          <ul className="list-group">
            {showRandom ? (
              <QuoteHolder
                author={randomQuote.author}
                content={randomQuote.content}
              ></QuoteHolder>
            ) : (
              quotes.map((quote: Quote) => (
                <QuoteHolder
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
