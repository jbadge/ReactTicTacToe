import React from 'react'

type CellProps = {
  cell: string
  rowIndex: number
  columnIndex: number
  recordMove: (_row: number, _column: number) => void
}

export function Cell({ cell, rowIndex, columnIndex, recordMove }: CellProps) {
  function handleClickCell() {
    console.log(`You clicked on ${rowIndex} - ${columnIndex}`)
    recordMove(rowIndex, columnIndex)
  }

  return (
    <button
      className={cell === ' ' ? undefined : 'taken'}
      onClick={handleClickCell}
    >
      {cell}
    </button>
  )
}
