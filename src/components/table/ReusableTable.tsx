import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

// Props de table
interface ReusableTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  title: string
  icon: LucideIcon
  iconButton: LucideIcon
  paragraph?: string
  buttonText?: string
  enabledButton?: boolean
  onButtonClick?: () => void
}

function ReusableTable<TData>({
  data,
  columns,
  title,
  icon: Icon,
  iconButton: IconButton,
  paragraph,
  buttonText,
  enabledButton = false,
  onButtonClick
}: ReusableTableProps<TData>) {

  // Manejo del os filtros globales
  const [globalFilter, setGlobalFilter] = useState<string>('')
  // Manejo de los filtros
  const [columnFilters, setColumnFilters] = useState<any[]>([])
  // Estado para el tamaño de la ventana
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Modificamos las columnas según el viewport
  const getResponsiveColumns = () => {

    // Separamos la columna de acciones
    const actionColumn = columns.find(col => col.id === 'actions')

    // Filtramos las columnas base (excluyendo acciones)
    const baseColumns = columns.filter(col => 
      ((col as any).accessorKey === 'consecutiveNumber' || 
       (col as any).accessorKey === 'name')
    )

    // Columnas según el viewport (excluyendo acciones)
    const responsiveColumns = [
      ...baseColumns,
      // md: email, status
      ...(windowWidth >= 768 ? columns.filter(col => 
        (col as any).accessorKey === 'email' ||
        (col as any).accessorKey === 'consumer' ||
        (col as any).accessorKey === 'status'
      ) : []),
      // lg: phone, date
      ...(windowWidth >= 1024 ? columns.filter(col => 
        (col as any).accessorKey === 'phone' ||
        (col as any).accessorKey === 'rol' ||
        (col as any).accessorKey === 'date'
      ) : []),
      // xl: numberOfPeople, typeOfCelebration
      ...(windowWidth >= 1280 ? columns.filter(col => 
        (col as any).accessorKey === 'numberOfPeople' ||
        (col as any).accessorKey === 'active' ||
        (col as any).accessorKey === 'typeOfCelebration'
      ) : [])
    ]
    
    return actionColumn ? [...responsiveColumns, actionColumn] : responsiveColumns
  }

  const table = useReactTable({
    data,
    columns: getResponsiveColumns(),
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="md:mx-5 mx-3">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center mt-5 bg-white p-5 rounded-lg flex-col md:flex-row gap-4 md:gap-0 shadow">
        <div className="flex items-center">
          <div className='flex-col'>
            <div className='flex text-center md:text-start'>
              <Icon className='md:w-12 md:h-12 w-8 h-8 text-red-700' />
              <div className='flex flex-col'>
                <h1 className="font-semibold text-red-700 sm:text-4xl text-xl ml-4">
                  {title}
                </h1>

                <p className="mt-4 text-gray-600 ml-6">{paragraph}</p>
              </div>
            </div>
          </div>
        </div>
        {enabledButton && (
          <div className='bg-red-700 p-2 hover:bg-red-800 duration-300 rounded-md w-full justify-center flex sm:w-auto'>
            <button 
              className='flex gap-2 items-center' 
              type='button'
              onClick={onButtonClick}
            >
              <IconButton className='text-white' />
              <span className='text-white font-base'>
                {buttonText}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Contenedor de tabla */}
      <div className="w-full bg-white rounded-lg shadow">
        {/* Search and Entries Header */}
        <div className="p-6 border-b border-gray-200">
          &nbsp;
          <div className="md:flex md:flex-row md:items-center md:justify-between flex flex-col gap-3 items-center">
            <div className="flex items-center space-x-2">
              <select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className="block rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {[7, 10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500">Entradas</span>
            </div>
            <div className="relative">
              <input
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Buscar..."
                className="px-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-500 duration-200 focus:shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-100 duration-200">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-slate-600 font-normal"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {`${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a ${Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                data.length
              )} de ${data.length} resultados`}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-2 bg-slate-100 border-none rounded-md text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed duration-300 mr-3"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* First page */}
              <button
                onClick={() => table.setPageIndex(0)}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                  table.getState().pagination.pageIndex === 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-slate-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                1
              </button>

              {/* Ellipsis and middle pages */}
              {table.getPageCount() > 7 && table.getState().pagination.pageIndex > 3 && (
                <span className="px-2 text-gray-500">...</span>
              )}

              {Array.from({ length: table.getPageCount() }, (_, i) => i)
                .filter(pageIndex => {
                  const current = table.getState().pagination.pageIndex
                  return (
                    (pageIndex > 0 && pageIndex < 4) ||
                    (pageIndex >= current - 1 && pageIndex <= current + 1) ||
                    (pageIndex > table.getPageCount() - 2)
                  )
                })
                .filter(pageIndex => pageIndex !== 0 && pageIndex !== table.getPageCount() - 1)
                .map(pageIndex => (
                  <button
                    key={pageIndex}
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                      pageIndex === table.getState().pagination.pageIndex
                        ? 'bg-red-100 text-red-700 duration-300'
                        : 'bg-slate-100 text-gray-700 hover:bg-red-50 hover:text-red-500 duration-300'
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                ))}

              {/* Ellipsis for end */}
              {table.getPageCount() > 7 && 
                table.getState().pagination.pageIndex < table.getPageCount() - 4 && (
                <span className="px-2 text-gray-500">...</span>
              )}

              {/* Last page */}
              {table.getPageCount() > 1 && (
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                    table.getState().pagination.pageIndex === table.getPageCount() - 1
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  {table.getPageCount()}
                </button>
              )}

              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-2 bg-slate-100 border-none rounded-md text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed duration-300 ml-3"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReusableTable