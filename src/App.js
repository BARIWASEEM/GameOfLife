import React, { useState, useEffect } from 'react';
import './App.css';

// Constants for board size
const ROWS = 20;
const COLS = 20;

// Helper function to create an empty board
const createEmptyBoard = () => {
  const board = [];
  for (let i = 0; i < ROWS; i++) {
    board.push(Array(COLS).fill(0));
  }
  return board;
};

function App() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle cell state (alive/dead) when clicked


  // Function to count the live neighbors of a given cell
  const countNeighbors = (board, x, y) => {
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],        [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;
    dirs.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLS) {
        count += board[newX][newY];
      }
    });
    return count;
  };

  // Function to apply Conway's Game of Life rules to the board
  const nextGeneration = () => {
    const newBoard = board.map((row, x) =>
      row.map((cell, y) => {
        const neighbors = countNeighbors(board, x, y);
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          return 0; // Cell dies
        } else if (cell === 0 && neighbors === 3) {
          return 1; // Cell becomes alive
        }
        return cell; // Remains the same
      })
    );
    setBoard(newBoard);
  };

  // Start/stop the game logic
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        nextGeneration();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, board]);

  // Handle Play/Stop
  const handlePlayStop = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle clearing the board
  const handleClear = () => {
    setBoard(createEmptyBoard());
    setIsPlaying(false);
  };

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell ? 'alive' : 'dead'}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handlePlayStop}>{isPlaying ? 'Stop' : 'Play'}</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

export default App;
