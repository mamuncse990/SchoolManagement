interface TableProps {
  data?: any[];
  columns: { header: string; accessor: string }[];
  renderRow: (item: any) => React.ReactNode;
}

const Table = ({ data = [], columns, renderRow }: TableProps) => {
  if (!Array.isArray(data)) {
    return (
      <table className="min-w-full">
        <tbody>
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              Loading...
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              No data available
            </td>
          </tr>
        ) : (
          data.map((item) => renderRow(item))
        )}
      </tbody>
    </table>
  );
};

export default Table;
