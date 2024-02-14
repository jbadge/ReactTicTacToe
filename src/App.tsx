import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
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
      const newGameState = await response.json()

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
      const newGameState = await response.json()
      setGame(newGameState)
    }
  }

  const header = game.winner ? `${game.winner} is the winner` : 'Tic Tac Toe'

  return (
    <div>
      <h1>
        {header} - <button onClick={handleNewGame}>New</button>
      </h1>
      <ul>
        {game.board.map(function (row, rowIndex) {
          return row.map(function (column, columnIndex) {
            return (
              <li
                key={columnIndex}
                className={column === ' ' ? undefined : 'taken'}
                onKeyDown={() => handleClickCell(rowIndex, columnIndex)}
                onClick={() => handleClickCell(rowIndex, columnIndex)}
              >
                {game.board[rowIndex][columnIndex]}
              </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
