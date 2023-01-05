import React, { useState, useEffect } from 'react'

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(5) // initial time left in seconds

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000) // decrease time left by 1 every second

        // clear the interval when the component unmounts
        return () => clearInterval(countdownInterval)
    }, [timeLeft]) // only re-run the effect when timeLeft changes

    return (
        <div>
            Time left: {timeLeft} seconds
        </div>
    )
}

export default CountdownTimer
