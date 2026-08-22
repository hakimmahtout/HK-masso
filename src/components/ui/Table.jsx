function Table({ className = "", ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    </div>
  );
}

function Header({ className = "", ...props }) {
  return <thead className={`[&_tr]:border-b ${className}`} {...props} />;
}

function Body({ className = "", ...props }) {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  );
}

function Footer({ className = "", ...props }) {
  return (
    <tfoot
      className={`border-t bg-muted/50 font-medium [&>tr]:last:border-b-0 ${className}`}
      {...props}
    />
  );
}

function Row({ className = "", ...props }) {
  return (
    <tr
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
      {...props}
    />
  );
}

function Head({ className = "", ...props }) {
  return (
    <th
      className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  );
}

function Cell({ className = "", ...props }) {
  return (
    <td
      className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  );
}

function Caption({ className = "", ...props }) {
  return (
    <caption
      className={`mt-4 text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;
Table.Caption = Caption;

export default Table;
