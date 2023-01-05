import React, { useState, useEffect } from 'react'
import styles from './CountdownTimer.module.css' // import the CSS module

function CountdownTimer(props) {
    const targetDate = new Date(props.targetDate) // target date to count down to
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
            // get the current date and time
            const currentDate = new Date()

            // get the difference between the target date and the current date
            const timeDifference = targetDate - currentDate

            // calculate the time left in days, hours, minutes, and seconds
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

            // update the state with the new time left values
            setTimeLeft({ days, hours, minutes, seconds })
        }, 1000) // update the time left every second

        // clear the interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [targetDate]) // only re-run the effect when the target date changes

    return (
        <div className={styles.countdownTimer}>
            <div className={styles.timeLeft}>
                {timeLeft.days}:{timeLeft.hours}:
                {timeLeft.minutes < 10 ? '0' : ''}{timeLeft.minutes}:
                {timeLeft.seconds < 10 ? '0' : ''}{timeLeft.seconds}
            </div>
            <div className={styles.label}>Time left until {targetDate.toString()}</div>
        </div>
    )
}

export default CountdownTimer
