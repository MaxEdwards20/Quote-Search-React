interface Quote {
  author: string;
  content: string; // ? means this is optional
  children?: [];
}

export function QuoteHolder({ author, content }: Quote) {
  return (
    <div className="card">
      {content}
      <div className="card-body ">{author}</div>
    </div>
  );
}
