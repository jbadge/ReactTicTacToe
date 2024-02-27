import React, { useState } from 'react'

type Square = 'X' | 'O' | ' '

type Row = [Square, Square, Square]

type Board = [Row, Row, Row]

type Game = {
  board: Board
  id: null | number
  winner: null | string
}

export function App() {
  const [game, setGame] = useState<Game>({
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })

  async function handleClickCell(row: number, column: number) {
    console.log({ row, column })
    if (game.id === null || game.winner || game.board[row][column] !== ' ') {
      return
    }
    const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${game.id}`

    const body = { row, column }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const newGameState = (await response.json()) as Game

      setGame(newGameState)
    }
  }

  async function handleNewGame() {
    const response = await fetch(
      'https://sdg-tic-tac-toe-api.herokuapp.com/game',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )

    if (response.ok) {
      const newGameState = (await response.json()) as Game
      setGame(newGameState)
    }
  }

  const header = game.winner ? `${game.winner} is the winner` : 'Tic Tac Toe'

  return (
    <div>
      <h1>
        {header} - <button onClick={handleNewGame}>New</button>
      </h1>
      <main className={game.winner === null ? undefined : 'game-over'}>
        {game.board.map((row, rowIndex) =>
          row.map((column, columnIndex) => (
            <Cell
              key={columnIndex}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={game.board[rowIndex][columnIndex]}
            />
          ))
        )}
      </main>
    </div>
  )
}

type CellProps = {
  cell: string
  rowIndex: number
  columnIndex: number
}

function Cell(props: CellProps) {
  return (
    <button
      className={props.cell === ' ' ? undefined : 'taken'}
      // onClick={() => handleClickCell(props.rowIndex, props.columnIndex)}
    >
      {props.cell}
    </button>
  )
}
