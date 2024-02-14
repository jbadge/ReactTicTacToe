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
    // Make a POST request to ask for a new game
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

  // function header() {
  //   if (game.winner) {
  //     alert(`${game.winner} is the winner`)
  //   } else {
  //     console.log('Tic Tac Toe')
  //   }
  // }

  const header = game.winner ? `${game.winner} is the winner` : 'Tic Tac Toe'
  // Create switch statement to handle TIEs

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
