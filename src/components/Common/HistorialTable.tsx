import {
  ColumnSort,
  useReactTable,
  getPaginationRowModel,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { HistorialMedico } from "@/helpers/models/HistorialMedico";

interface Props {
  data: HistorialMedico[];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  columns: ColumnHelper[];
  filterPlaceholder: string;
}
export default function HistorialTable({
  data,
  columns,
  filterPlaceholder,
}: Props) {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {}, [data]);

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <section className="w-[80%]">
        <div className="my-5 overflow-x-auto">
          <TextInput
            placeholder={filterPlaceholder}
            onChange={(e) => setGlobalFilter(e.target.value)}
            value={globalFilter}
            aria-label="Filtro de búsqueda global"
          />
          <table className="divide-y divide-gray-200 dark:divide-gray-600 my-5" aria-label="Tabla de historial médico">
            <thead className="bg-gray-100 dark:bg-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <tr key={data.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                        aria-sort={
                          header.column.getIsSorted() === "asc"
                            ? "ascending"
                            : header.column.getIsSorted() === "desc"
                            ? "descending"
                            : "none"
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <span aria-label="Ordenado ascendentemente" role="img">
                            🔼
                          </span>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <span aria-label="Ordenado descendentemente" role="img">
                            🔽
                          </span>
                        ) : null}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="dark:hover:bg-gray-600 hover:bg-gray-300"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                    >
                      <div className="flex items-center justify-start gap-5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <div className="paginacion flex gap-2 my-3" aria-label="Controles de paginación">
              <Button
                color="gray"
                onClick={() => table.setPageIndex(0)}
                disabled={table.getState().pagination.pageIndex === 0}
                aria-label="Ir a la primera página"
              >
                Primera página
              </Button>
              <Button
                color="gray"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Ir a la página anterior"
              >
                Página anterior
              </Button>
              <Button
                color="gray"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Ir a la página siguiente"
              >
                Página siguiente
              </Button>
              <Button
                color="gray"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getState().pagination.pageIndex ===
                  table.getPageCount() - 1
                }
                aria-label="Ir a la última página"
              >
                Última página
              </Button>
            </div>
            <div aria-live="polite" aria-atomic="true">
              <span>
                Página{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} de{" "}
                  {table.getPageCount()}
                </strong>{" "}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}