import React, { useEffect, useState, useRef } from "react";
import { rankItem } from "@tanstack/match-sorter-utils";
import { jsPDF } from "jspdf";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getGroupedRowModel,
} from "@tanstack/react-table";

import { DownloadTableExcel } from "react-export-table-to-excel";

const generatePDF = () => {
  const report = new jsPDF("p", "mm", [1280, 900]);
  report
    .html(document.querySelector("table"), {
      margin: 10,
      html2canvas: {
        scale: 0.4,
        letterRendering: true,
      },
    })
    .then(() => {
      report.save("report.pdf");
    });
};

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Table = ({ data, columns }) => {
  const tableRef = useRef(null);
  const [grouping, setGrouping] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
      grouping,
    },
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onGlobalFilterChange: setGlobalFilter,
    getGroupedRowModel: getGroupedRowModel(),
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 container m-auto">
      <div className="my-4 flex items-center gap-3">
        <input
          value={globalFilter ?? ""}
          onChange={({ target }) => setGlobalFilter(target.value)}
          className="p-2 font-lg border"
          placeholder="Ara"
        />
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <i className="fa-solid fa-file-excel  text-green-500 text-3xl cursor-pointer"></i>
        </DownloadTableExcel>

        <button onClick={generatePDF}>
          <i className="fa-solid fa-file-pdf text-red-500 text-3xl cursor-pointer"></i>
        </button>
      </div>
      <table ref={tableRef}>
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="w-1/12 border border-gray-300 h-10"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <button
                          {...{
                            onClick: header.column.getToggleGroupingHandler(),
                            style: {
                              cursor: "pointer",
                            },
                          }}
                        >
                          {header.column.getIsGrouped()
                            ? `❌(${header.column.getGroupedIndex()}) `
                            : `✅`}
                        </button>
                      ) : null}{" "}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border">
                  {cell.getContext().getValue() != undefined &&
                    flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="my-4 flex items-center justify-center gap-3">
        <button
          className="border rounded p-2 bg-gray-500 text-white w-14"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-2 bg-gray-500 text-white w-10"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-2 bg-gray-500 text-white w-10"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-2 bg-gray-500 text-white w-14"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
      <span className="flex items-center justify-center">
        <div>Toplam&nbsp;</div>
        <strong>{table.getPageCount()}&nbsp;</strong>
        <span>sayfadan&nbsp;</span>
        <strong>{table.getState().pagination.pageIndex + 1}.&nbsp;</strong>
        <span>görüntüleniyor</span>
      </span>
    </div>
  );
};
