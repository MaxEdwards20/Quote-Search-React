interface Quote {
  author: string;
  content: string; // ? means this is optional
  children?: [];
  id?: string;
}

export function QuoteHolder({ author, content, id }: Quote) {
  return (
    <div className="card" key={id}>
      <span className="lead">{content}</span>
      <div className="card-body ">
        <span className="font-weight-light">{author}</span>
      </div>
    </div>
  );
}
