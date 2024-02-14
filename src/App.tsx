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

  function handleClickCell(row: number, column: number) {
    console.log({ row, column })
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

  return (
    <div>
      <h1>
        Tic Tac Toe - {game.id} <button onClick={handleNewGame}>New</button>
      </h1>
      <ul>
        <li
          onKeyDown={() => handleClickCell(0, 0)}
          onClick={() => handleClickCell(0, 0)}
        >
          {game.board[0][0]}
        </li>
        <li
          onKeyDown={() => handleClickCell(0, 1)}
          onClick={() => handleClickCell(0, 1)}
        >
          {game.board[0][1]}
        </li>
        <li
          onKeyDown={() => handleClickCell(0, 2)}
          onClick={() => handleClickCell(0, 2)}
        >
          {game.board[0][2]}
        </li>
        <li
          onKeyDown={() => handleClickCell(1, 0)}
          onClick={() => handleClickCell(1, 0)}
        >
          {game.board[1][0]}
        </li>
        <li
          onKeyDown={() => handleClickCell(1, 1)}
          onClick={() => handleClickCell(1, 1)}
        >
          {game.board[1][1]}
        </li>
        <li
          onKeyDown={() => handleClickCell(1, 2)}
          onClick={() => handleClickCell(1, 2)}
        >
          {game.board[1][2]}
        </li>
        <li
          onKeyDown={() => handleClickCell(2, 0)}
          onClick={() => handleClickCell(2, 0)}
        >
          {game.board[2][0]}
        </li>
        <li
          onKeyDown={() => handleClickCell(2, 1)}
          onClick={() => handleClickCell(2, 1)}
        >
          {game.board[2][1]}
        </li>
        <li
          onKeyDown={() => handleClickCell(2, 2)}
          onClick={() => handleClickCell(2, 2)}
        >
          {game.board[2][2]}
        </li>
      </ul>
    </div>
  )
}
