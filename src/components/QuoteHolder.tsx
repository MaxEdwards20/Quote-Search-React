interface Quote {
  author: string;
  content: string; // ? means this is optional
  children?: [];
}

export function QuoteHolder({ author, content }: Quote) {
  return (
    <div className="card">
      <span className="lead">{content}</span>
      <div className="card-body ">
        <span className="font-weight-light">{author}</span>
      </div>
    </div>
  );
}
