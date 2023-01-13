interface Quote {
  author: string;
  content: string; // ? means this is optional
}

export function QuoteHolder({ author, content }: Quote) {
  return (
    <div className="card">
      {content + " --- "}
      {author}
    </div>
  );
}
