interface Quote {
  author: string;
  content: string; // ? means this is optional
  children?: [];
  id?: string;
}

export function QuoteHolder({ author, content, id }: Quote) {
  return (
    <div className="card" key={id}>
      {content}
      <div className="card-body ">{author}</div>
    </div>
  );
}
