interface Quote {
  author: string;
  content: string; // ? means this is optional
  children?: [];
  key: string;
}

export function QuoteHolder({ author, content, key }: Quote) {
  return (
    <div className="card" key={key}>
      <span className="lead">{content}</span>
      <div className="card-body ">
        <span className="font-weight-light">{author}</span>
      </div>
    </div>
  );
}
