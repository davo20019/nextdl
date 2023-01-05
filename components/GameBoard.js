import React, { useState, useEffect } from 'react'
import styles from './GameBoard.module.css'

function GameBoard(props) {
    const [board, setBoard] = useState(null) // state to store the game board

    useEffect(() => {
        // generate a random initial board
        const initialBoard = []
        for (let i = 0; i < 4; i++) {
            const row = []
            for (let j = 0; j < 4; j++) {
                row.push(Math.random() < 0.8 ? 0 : 2)
            }
            initialBoard.push(row)
        }
        setBoard(initialBoard)
    }, [])

    // function to handle arrow key input
    const handleKeyDown = e => {
        if (e.keyCode === 37) {
            // move tiles to the left
        } else if (e.keyCode === 38) {
            // move tiles up
        } else if (e.keyCode === 39) {
            // move tiles to the right
        } else if (e.keyCode === 40) {
            // move tiles down
        }
    }

    useEffect(() => {
        // add event listener for arrow key input
        window.addEventListener('keydown', handleKeyDown)
        // remove event listener when the component unmounts
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div>
            {board &&
                board.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className={`${styles.cell} ${
                                    cell === 0 ? styles.empty : styles[`cell${cell}`]
                                }`}
                                style={
                                    cell === 0 ? { backgroundColor: '#ccc' } : undefined
                                }
                            >
                                {cell === 0 ? '' : cell}
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    )


}

export default GameBoard
