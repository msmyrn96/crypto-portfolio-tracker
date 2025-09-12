import React, { memo, useMemo } from 'react'
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'
import { MarketCoin } from '../types/coins'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { CoinParamsType } from '../pages/Dashboard'
import { useNavigate } from 'react-router'
import Spinner from './Spinner'

interface MarketCoinsTablePropsType {
  data: MarketCoin[]
  coinParams: CoinParamsType
  handlePagination: (value: number) => void
  isLoading: boolean
}

const MarketCoinsTable = ({ data, coinParams, handlePagination, isLoading }: MarketCoinsTablePropsType) => {
  const totalPages = coinParams.totalPages
  const pageIndex = coinParams.page
  const searchCoin = coinParams.search
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<MarketCoin>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'symbol', header: 'Symbol' },
      { accessorKey: 'current_price', header: 'Price ($)' },
      { accessorKey: 'market_cap', header: 'Market Cap' },
      { accessorKey: 'price_change_percentage_24h', header: '24h %' },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // tell table we handle pagination
    state: { pagination: { pageIndex: coinParams.page, pageSize: coinParams.perPage } },
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4 mt-8">
      <div className="bg-gray-800 rounded-lg p-6">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="rounded-lg border border-gray-700">
              <Table>
                <TableHeader className="bg-gray-700 font-bold">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="border-b border-gray-700">
                      {headerGroup.headers.map((header, idx) => {
                        let cornerClass = ''
                        if (idx === 0) cornerClass = 'rounded-tl-md'
                        if (idx === headerGroup.headers.length - 1) cornerClass += ' rounded-tr-md'

                        return (
                          <TableHead key={header.id} className={`border-none ${cornerClass}`}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row, idx) => {
                    const isLast = idx === table.getRowModel().rows.length - 1

                    return (
                      <TableRow
                        key={row.id}
                        className={`border-b border-gray-700 cursor-pointer hover:bg-gray-500 ${isLast && 'border-0'}`}
                        onClick={() => {
                          const coinId = row.original.id
                          navigate(`/coin/${coinId}`)
                        }}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {!searchCoin && (
              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-2">
                  <button
                    disabled={pageIndex === 1}
                    onClick={() => {
                      handlePagination(1)
                    }}
                    className={`px-4 py-2 bg-gray-700 rounded-lg ${
                      pageIndex === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                    {`<<`}
                  </button>
                  <button
                    disabled={pageIndex === 1}
                    className={`px-4 py-2 bg-gray-700 rounded-lg ${
                      pageIndex === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => {
                      handlePagination(pageIndex - 1)
                    }}>
                    {`<`}
                  </button>
                </div>

                <div>
                  Page {pageIndex} of {totalPages}
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={pageIndex >= totalPages}
                    onClick={() => {
                      handlePagination(pageIndex + 1)
                    }}
                    className={`px-4 py-2 bg-gray-700 rounded-lg ${
                      pageIndex >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                    {`>`}
                  </button>
                  <button
                    disabled={pageIndex >= totalPages}
                    onClick={() => {
                      handlePagination(totalPages) // parent probably expects 1-based page
                    }}
                    className={`px-4 py-2 bg-gray-700 rounded-lg ${
                      pageIndex >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                    {`>>`}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default memo(MarketCoinsTable)
