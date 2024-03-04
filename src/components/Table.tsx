import { useState } from "react";
import Pagination from "./Pagination";

interface TableProps<T> {
  data: T[];
  keys: (keyof T)[];
  itemsPerPage: number;
  onRowClick: (row: T) => void;
}

const splitKey = (key: string) => {
  return key.replace(/([A-Z])/g, " $1").trim();
};

const Table = <T extends Record<string, any>>({
  data,
  keys,
  itemsPerPage,
  onRowClick,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  let currentItems = data.slice(startIndex, endIndex);

  if (sortKey) {
    currentItems = currentItems.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleHeaderClick = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="w-full p-4 overflow-auto  border rounded-lg shadow-lg max-h-[70%]">
        <table className="w-full divide-y divide-gray-300 max-h-[70%]">
          {currentItems.length > 0 && (
            <thead className="rounded-t-lg bg-slate-100">
              <tr>
                {keys.map((key, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-sm font-semibold tracking-wider text-left uppercase cursor-pointer"
                    onClick={() => handleHeaderClick(key)}
                  >
                    {splitKey(key.toString())}
                    {sortKey === key && (
                      <span className="ml-1">
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-gray-300 rounded-b-lg">
            {currentItems.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="cursor-pointer odd:bg-slate-200 hover:bg-slate-300"
                onClick={() => onRowClick(item)}
              >
                {keys.map((key, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    <div className="text-sm">{item[key]}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
};

export default Table;
