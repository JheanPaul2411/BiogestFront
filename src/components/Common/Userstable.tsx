import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, ColumnSort, getFilteredRowModel, ColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';

interface Props {
    data: object,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns: ColumnHelper[]
}
function Table({ data, columns }: Props) {
    const [sorting, setSorting] = useState<ColumnSort[]>([]);
    const [inputFilter, setinputFilter] = useState('')





    const table = useReactTable({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: inputFilter
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setinputFilter
    });

    return (
        <div className="my-5">
            <TextInput placeholder='Buscar paciente' onChange={e => setinputFilter(e.target.value)} value={inputFilter} />
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 my-5">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th
                                        key={header.id}
                                        scope="col"
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() === 'asc' ? '🔼' : '🔽'
                                        ) : null}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-700">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className='dark:hover:bg-gray-600 hover:bg-gray-300'>
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center">
                <div className="paginacion flex gap-2 my-3">
                    <Button color='gray' onClick={() => table.setPageIndex(0)}>Primera página</Button>
                    <Button color='gray' onClick={() => table.previousPage()}>Página siguiente</Button>
                    <Button color='gray' onClick={() => table.nextPage()}>Página Anterior</Button>
                    <Button color='gray' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última página</Button>
                </div>
                <div>
                    <span>
                        Página{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                        </strong>{' '}
                    </span>
                </div>

            </div>
        </div>
    );
}

export default Table;