import React, { useState, useEffect } from 'react'

const Game2048 = () => {
    const [grid, setGrid] = useState([])
    const [score, setScore] = useState(0)

    useEffect(() => {
        // Initialize the grid with two random cells
        let grid = [...Array(4)].map(() => Array(4).fill(0))
        grid = addRandomCell(addRandomCell(grid))
        setGrid(grid)

        // Set up event listeners for arrow keys
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleKeyDown = (event) => {
        // Get the new grid after moving in the specified direction
        let newGrid = move(grid, event.key)

        // If the grid has changed, add a new random cell and update the score
        if (newGrid !== grid) {
            newGrid = addRandomCell(newGrid)
            setScore(score + 1)
        }

        setGrid(newGrid)
    }


    const newGame = () => {
        // Reset the grid and score
        let grid = [...Array(4)].map(() => Array(4).fill(0))
        grid = addRandomCell(addRandomCell(grid))
        setGrid(grid)
        setScore(0)
    }

    const addRandomCell = (grid) => {
        // Get a list of all empty cells
        const emptyCells = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] === 0) {
                    emptyCells.push({ i, j })
                }
            }
        }

        // Return the grid if there are no empty cells
        if (emptyCells.length === 0) return grid

        // Choose a random empty cell and set it to 2 or 4 with a 90%/10% chance
        const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        grid[i][j] = Math.random() < 0.9 ? 2 : 4
        return grid
    }

    const shareScore = () => {
        // Create a message to share
        const message = `I scored ${score} in the 2048 game! Can you beat it?`

        // Share the message on social media
        if (navigator.share) {
            navigator.share({
                title: '2048 Game',
                text: message,
                url: window.location.href,
            })
        } else {
            // Fallback for browsers that don't support the Web Share API
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`)
        }
    }

    const move = (grid, direction) => {
        // Clone the grid to prevent modifying the original
        const newGrid = JSON.parse(JSON.stringify(grid))
        let newGridResponse = []

        // Move the tiles in the specified direction
        switch (direction) {
            case 'ArrowUp':
                newGridResponse = moveUp(newGrid)
                break
            case 'ArrowDown':
                newGridResponse = moveDown(newGrid)
                break
            case 'ArrowLeft':
                newGridResponse = moveLeft(newGrid)
                break
            case 'ArrowRight':
                newGridResponse = moveRight(newGrid)
                break
            default:
                break
        }

        return newGridResponse
    }

    const moveUp = (grid) => {
        // Move tiles up
        for (let j = 0; j < 4; j++) {
            let current = 0
            for (let i = 0; i < 4; i++) {
                if (grid[i][j] !== 0) {
                    if (grid[current][j] === 0) {
                        grid[current][j] = grid[i][j]
                        grid[i][j] = 0
                    } else if (grid[current][j] === grid[i][j]) {
                        grid[current][j] *= 2
                        grid[i][j] = 0
                        current++
                    } else {
                        current++
                        if (current !== i) {
                            grid[current][j] = grid[i][j]
                            grid[i][j] = 0
                        }
                    }
                }
            }
        }
        return grid
    }

    const moveDown = (grid) => {
        // Move tiles down
        for (let j = 0; j < 4; j++) {
            let current = 3
            for (let i = 3; i >= 0; i--) {
                if (grid[i][j] !== 0) {
                    if (grid[current][j] === 0) {
                        grid[current][j] = grid[i][j]
                        grid[i][j] = 0
                    } else if (grid[current][j] === grid[i][j]) {
                        grid[current][j] *= 2
                        grid[i][j] = 0
                        current--
                    } else {
                        current--
                        if (current !== i) {
                            grid[current][j] = grid[i][j]
                            grid[i][j] = 0
                        }
                    }
                }
            }
        }
        return grid
    }

    const moveLeft = (grid) => {
        // Move tiles left
        for (let i = 0; i < 4; i++) {
            let current = 0
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] !== 0) {
                    if (grid[i][current] === 0) {
                        grid[i][current] = grid[i][j]
                        grid[i][j] = 0
                    } else if (grid[i][current] === grid[i][j]) {
                        grid[i][current] *= 2
                        grid[i][j] = 0
                        current++
                    } else {
                        current++
                        if (current !== j) {
                            grid[i][current] = grid[i][j]
                            grid[i][j] = 0
                        }
                    }
                }
            }
        }
        return grid
    }

    const moveRight = (grid) => {
        // Move tiles right
        for (let i = 0; i < 4; i++) {
            let current = 3
            for (let j = 3; j >= 0; j--) {
                if (grid[i][j] !== 0) {
                    if (grid[i][current] === 0) {
                        grid[i][current] = grid[i][j]
                        grid[i][j] = 0
                    } else if (grid[i][current] === grid[i][j]) {
                        grid[i][current] *= 2
                        grid[i][j] = 0
                        current--
                    } else {
                        current--
                        if (current !== j) {
                            grid[i][current] = grid[i][j]
                            grid[i][j] = 0
                        }
                    }
                }
            }
        }
        return grid
    }


    return (
        <div className="game">
            <div className="grid">
                {grid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((cell, j) => (
                            <div key={j} className="cell">
                                {cell > 0 ? cell : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="controls">
                <div className="score">{score}</div>
                <button onClick={newGame}>New Game</button>
                <button onClick={shareScore}>Share Score</button>
            </div>
        </div>
    )
}

export default Game2048
