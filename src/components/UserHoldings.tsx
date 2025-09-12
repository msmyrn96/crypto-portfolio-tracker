import React, { useMemo } from 'react'

import { Holding } from '../types/portfolio'
import { useNavigate } from 'react-router'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { calculatePercentageofPortfolio } from '../helpers/portfolio'

type UserHoldingsPropsType = {
  holdings: Holding[]
}

const UserHoldings = ({ holdings }: UserHoldingsPropsType) => {
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<Holding>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'symbol', header: 'Symbol' },
      { accessorKey: 'currentPrice', header: 'Price ($)' },
      { accessorKey: 'amount', header: 'Amount' },
      {
        id: 'value',
        header: 'Value ($)',
        cell: ({ row, table }) => {
          const amount = row.original.amount
          const price = row.original.currentPrice
          return `${(amount * price).toFixed(2)}`
        },
      },
      {
        id: 'percentOfPortfolio',
        header: 'Percentage of Portfolio %',
        cell: ({ row, table }) => {
          const data = table.options.data as Holding[]

          const percent = calculatePercentageofPortfolio({ coinId: row.original.id, holdings: data })

          return `${Math.ceil(percent * 10) / 10}%`
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: holdings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">Current Holdings</h4>

      {holdings && holdings.length ? (
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
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">
          No holdings yet. Search and buy some cryptocurrencies to get started!
        </p>
      )}
    </div>
  )
}
export default UserHoldings
