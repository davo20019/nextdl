import React, { useState, useEffect } from 'react'
import styles from './GameBoard.module.css'

function GameBoard(props) {
    const [board, setBoard] = useState([
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 2, 2]
    ]) // state to store the game board
    const [score, setScore] = useState(0) // state to store the score
    const [gameOver, setGameOver] = useState(false) // state to store the game over status




    // function to handle arrow key input
    const handleKeyDown = e => {
        console.log(board)
        if (!board) {
            console.log('I am returning')
            return
        }
        if (e.keyCode === 37) {
            // move tiles to the left
            let moved = false
            const newBoard = board.map(row => {
                // remove empty cells from the beginning of the row
                const nonEmptyCells = row.filter(cell => cell !== 0)
                // combine equal adjacent cells
                for (let i = 0; i < nonEmptyCells.length - 1; i++) {
                    if (nonEmptyCells[i] === nonEmptyCells[i + 1]) {
                        nonEmptyCells[i] *= 2
                        nonEmptyCells[i + 1] = 0
                        setScore(score + nonEmptyCells[i])
                        moved = true
                    }
                }
                // remove empty cells again
                const combined = nonEmptyCells.filter(cell => cell !== 0)
                // add empty cells to the end of the row
                while (combined.length < 4) {
                    combined.push(0)
                }
                return combined
            })
            if (moved) {
                setBoard(newBoard)
                addNumber()
            }

        } else if (e.keyCode === 38) {
            // move tiles up
            let moved = false
            const newBoard = board.map((row, rowIndex) => {
                // remove empty cells from the top of the column
                const nonEmptyCells = board
                    .map(row => row[rowIndex])
                    .filter(cell => cell !== 0)
                // combine equal adjacent cells
                for (let i = 0; i < nonEmptyCells.length - 1; i++) {
                    if (nonEmptyCells[i] === nonEmptyCells[i + 1]) {
                        nonEmptyCells[i] *= 2
                        nonEmptyCells[i + 1] = 0
                        setScore(score + nonEmptyCells[i])
                        moved = true
                    }
                }
                // remove empty cells again
                const combined = nonEmptyCells.filter(cell => cell !== 0)
                // add empty cells to the bottom of the column
                while (combined.length < 4) {
                    combined.push(0)
                }
                return row.map((cell, cellIndex) => (cellIndex === rowIndex ? combined.shift() : cell))
            })
            if (moved) {
                setBoard(newBoard)
                addNumber()
            }

        } else if (e.keyCode === 39) {
            // move tiles to the right
            let moved = false
            const newBoard = board.map(row => {
                // remove empty cells from the end of the row
                const nonEmptyCells = row.filter(cell => cell !== 0).reverse()
                // combine equal adjacent cells
                for (let i = 0; i < nonEmptyCells.length - 1; i++) {
                    if (nonEmptyCells[i] === nonEmptyCells[i + 1]) {
                        nonEmptyCells[i] *= 2
                        nonEmptyCells[i + 1] = 0
                        setScore(score + nonEmptyCells[i])
                        moved = true
                    }
                }
                // remove empty cells again
                const combined = nonEmptyCells.filter(cell => cell !== 0).reverse()
                // add empty cells to the beginning of the row
                while (combined.length < 4) {
                    combined.unshift(0)
                }
                return combined
            })
            if (moved) {
                setBoard(newBoard)
                addNumber()
            }
        } else if (e.keyCode === 40) {
            // move tiles down
            let moved = false
            const newBoard = board.map((row, rowIndex) => {
                // remove empty cells from the bottom of the column
                const nonEmptyCells = board
                    .map(row => row[rowIndex])
                    .filter(cell => cell !== 0)
                    .reverse()
                // combine equal adjacent cells
                for (let i = 0; i < nonEmptyCells.length - 1; i++) {
                    if (nonEmptyCells[i] === nonEmptyCells[i + 1]) {
                        nonEmptyCells[i] *= 2
                        nonEmptyCells[i + 1] = 0
                        setScore(score + nonEmptyCells[i])
                        moved = true
                    }
                }
                // remove empty cells again
                const combined = nonEmptyCells.filter(cell => cell !== 0).reverse()
                // add empty cells to the top of the column
                while (combined.length < 4) {
                    combined.unshift(0)
                }
                return row.map((cell, cellIndex) => (cellIndex === rowIndex ? combined.shift() : cell))
            })
            if (moved) {
                setBoard(newBoard)
                addNumber()
            }
        }
    }

    const addNumber = () => {
        const emptyCells = []
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === 0) {
                    emptyCells.push({ row: rowIndex, cell: cellIndex })
                }
            })
        })
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length)
            const randomCell = emptyCells[randomIndex]
            const newBoard = [...board]
            newBoard[randomCell.row][randomCell.cell] = 2
            setBoard(newBoard)
        } else {
            setGameOver(true)
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
            {(board != null) &&
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
