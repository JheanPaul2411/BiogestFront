import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, ColumnSort, getFilteredRowModel, ColumnHelper, getPaginationRowModel } from '@tanstack/react-table';
import { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import PopupDetallesTabla from '../Popups/Historial_medico/PopupDetalles';
import { User } from '../AgendarCita/dto/Login.dto';

interface Props {
    data: User[],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns: ColumnHelper[],
    filterPlaceholder: string
}
function PacientesTable({ data, columns, filterPlaceholder }: Props) {
    const [sorting, setSorting] = useState<ColumnSort[]>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showPopupDetalles, setShowPopupDetalles] = useState(false);
    const [selectedUser, setSetselectedHistorial] = useState<User>()


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
        <div className="my-5">
            <TextInput placeholder={filterPlaceholder} onChange={e => setGlobalFilter(e.target.value)} value={globalFilter} />
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 my-5">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    {table.getHeaderGroups().map(headerGroup => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <tr key={data.id}>
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
                        <tr key={row.id} className='dark:hover:bg-gray-600 hover:bg-gray-300'
                            onClick={() => {
                                setShowPopupDetalles(true)
                                setSetselectedHistorial(data.find(
                                    d => d.id === parseInt(row.getValue('id'))
                                ))
                            }}>

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
                    <Button color='gray' onClick={() => table.setPageIndex(0)} disabled={table.getState().pagination.pageIndex === 0}>Primera página</Button>
                    <Button color='gray' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Página anterior</Button>
                    <Button color='gray' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Página siguiente</Button>
                    <Button color='gray' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={table.getState().pagination.pageIndex === table.getPageCount() - 1}>Última página</Button>
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
            {showPopupDetalles && selectedUser && (
                <PopupDetallesTabla selectedUser={selectedUser} onClose={()=>setShowPopupDetalles(false)}/>
            )}
        </div>
    );
}

export default PacientesTable;