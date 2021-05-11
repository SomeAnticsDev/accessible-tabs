import * as React from "react";
import cx from "clsx";
import "./Table.scss";

const Table = React.forwardRef(function Table(
  { as: El = "table", children, className, ...props },
  forwardedRef
) {
  return (
    <El className={cx("Table", className)} ref={forwardedRef} {...props}>
      {children}
    </El>
  );
});
Table.displayName = "Table";
export { Table };

const TableHead = React.forwardRef(function TableHead(
  { as: El = "thead", children, className, ...props },
  forwardedRef
) {
  return (
    <El className={cx("TableHead", className)} ref={forwardedRef} {...props}>
      {children}
    </El>
  );
});
TableHead.displayName = "TableHead";
export { TableHead };

const TableRowContext = React.createContext({
  rowHeadFound: { current: true },
});

const TableRow = React.forwardRef(function TableRow(
  { as: El = "tr", children, className, ...props },
  forwardedRef
) {
  let rowHeadFound = React.useRef(false);
  return (
    <El className={cx("TableRow", className)} ref={forwardedRef} {...props}>
      <TableRowContext.Provider value={{ rowHeadFound }}>
        {children}
      </TableRowContext.Provider>
    </El>
  );
});
TableRow.displayName = "TableRow";
export { TableRow };

const TableCell = React.forwardRef(function TableCell(
  {
    as: asProp,
    children,
    className,
    textAlign = "left",
    role,
    scope,
    ...props
  },
  forwardedRef
) {
  let { rowHeadFound } = React.useContext(TableRowContext);
  let El;
  if (rowHeadFound.current === false) {
    El = asProp || "th";
    role = role || "cell";
    scope = scope || "row";
    rowHeadFound.current = true;
  } else {
    El = asProp || "td";
  }

  return (
    <El
      className={cx("TableCell", `TableCell--align-${textAlign}`, className)}
      ref={forwardedRef}
      role={role}
      scope={scope}
      {...props}
    >
      {children}
    </El>
  );
});
TableCell.displayName = "TableCell";
export { TableCell };

const TableBody = React.forwardRef(function TableBody(
  { as: El = "tbody", children, className, ...props },
  forwardedRef
) {
  return (
    <El className={cx("TableBody", className)} ref={forwardedRef} {...props}>
      {children}
    </El>
  );
});
TableBody.displayName = "TableBody";
export { TableBody };

const TableHeadRow = React.forwardRef(function TableHeadRow(
  { children, className, ...props },
  forwardedRef
) {
  return (
    <TableRow
      className={cx("TableHeadRow", className)}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </TableRow>
  );
});
TableHeadRow.displayName = "TableHeadRow";
export { TableHeadRow };

const TableHeadCell = React.forwardRef(function TableHeadCell(
  {
    as: El = "th",
    scope = "col",
    textAlign = "left",
    children,
    className,
    ...props
  },
  forwardedRef
) {
  return (
    <El
      className={cx(
        "TableHeadCell",
        `TableHeadCell--align-${textAlign}`,
        className
      )}
      ref={forwardedRef}
      scope={scope}
      {...props}
    >
      {children}
    </El>
  );
});
TableHeadCell.displayName = "TableHeadCell";
export { TableHeadCell };
