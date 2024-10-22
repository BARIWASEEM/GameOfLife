import React from 'react';
import './Board.css';

const Board = ({ board, toggleCell }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${board[rowIndex][colIndex] ? 'alive' : 'dead'}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
