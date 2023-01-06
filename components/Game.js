import React, { useState, useEffect } from 'react'

const initialGrid = [
    [0, 0, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
]

function Game() {
    const [grid, setGrid] = useState(initialGrid)

    function move(direction) {
        const newGrid = JSON.parse(JSON.stringify(grid))
        // Shift all of the tiles in the given direction
        switch (direction) {
            case 'left':
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (newGrid[i][j] != null) {
                            let col = j
                            while (col > 0) {
                                if (newGrid[i][col - 1] == null) {
                                    newGrid[i][col - 1] = newGrid[i][col]
                                    newGrid[i][col] = null
                                    col--
                                } else if (newGrid[i][col] === newGrid[i][col - 1]) {
                                    newGrid[i][col - 1] *= 2
                                    newGrid[i][col] = null
                                    break
                                } else {
                                    break
                                }
                            }
                        }
                    }
                }
                break
            case 'up':
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (newGrid[j][i] != null) {
                            let row = j
                            while (row > 0) {
                                if (newGrid[row - 1][i] == null) {
                                    newGrid[row - 1][i] = newGrid[row][i]
                                    newGrid[row][i] = null
                                    row--
                                } else if (newGrid[row][i] === newGrid[row - 1][i]) {
                                    newGrid[row - 1][i] *= 2
                                    newGrid[row][i] = null
                                    break
                                } else {
                                    break
                                }
                            }
                        }
                    }
                }
                break

            case 'down':
                for (let i = 0; i < 4; i++) {
                    for (let j = 3; j >= 0; j--) {
                        if (newGrid[j][i] != null) {
                            let row = j
                            while (row < 3) {
                                if (newGrid[row + 1][i] == null) {
                                    newGrid[row + 1][i] = newGrid[row][i]
                                    newGrid[row][i] = null
                                    row++
                                } else if (newGrid[row][i] === newGrid[row + 1][i]) {
                                    newGrid[row + 1][i] *= 2
                                    newGrid[row][i] = null
                                    break
                                } else {
                                    break
                                }
                            }
                        }
                    }
                }
                break

            case 'right':
                for (let i = 0; i < 4; i++) {
                    for (let j = 3; j >= 0; j--) {
                        if (newGrid[i][j] != null) {
                            let col = j
                            while (col < 3) {
                                if (newGrid[i][col + 1] == null) {
                                    newGrid[i][col + 1] = newGrid[i][col]
                                    newGrid[i][col] = null
                                    col++
                                } else if (newGrid[i][col] === newGrid[i][col + 1]) {
                                    newGrid[i][col + 1] *= 2
                                    newGrid[i][col] = null
                                    break
                                } else {
                                    break
                                }
                            }
                        }
                    }
                }
                break
        }

        // Set the new grid state
        console.log(newGrid)
        setGrid(newGrid)
    }

    useEffect(() => {
        function handleKeydown(event) {
            if (event.keyCode === 37) {
                // Left arrow key
                move('left')
            } else if (event.keyCode === 38) {
                // Up arrow key
                move('up')
            } else if (event.keyCode === 39) {
                // Right arrow key
                move('right')
                console.log('right')
            } else if (event.keyCode === 40) {
                // Down arrow key
                move('down')
                console.log('down')
            }
        }

        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [])

    return (
        <div className="game">
            {grid.map((row, i) => (
                <div key={i} className="row">
                    {row.map((col, j) => (
                        <div key={j} className="col">
                            {col || ''}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Game
