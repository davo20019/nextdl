import React, { useState, useEffect } from 'react'
import Chart from 'chart.js'

function CovidChart(props) {
    const [chart, setChart] = useState(null)
    const [years, setYears] = useState([]) // state to store the selected years

    useEffect(() => {
        const ctx = document.getElementById('covid-chart').getContext('2d')
        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: props.dates,
                datasets: [
                    {
                        label: 'COVID-19 cases',
                        data: props.cases,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
        setChart(newChart)
    }, [props.dates, props.cases])

    useEffect(() => {
        if (!chart || !years.length) return // exit if the chart or years are not yet set
        // filter the data by year
        const filteredDates = props.dates.filter(date => years.includes(new Date(date).getFullYear()))
        const filteredCases = props.cases.filter((_, index) => years.includes(new Date(props.dates[index]).getFullYear()))
        // update the chart with the filtered data
        chart.data.labels = filteredDates
        chart.data.datasets[0].data = filteredCases
        chart.update()
    }, [years, chart])

    return (
        <div>
            <select
                multiple
                value={years}
                onChange={e => setYears([...e.target.selectedOptions].map(option => option.value))}
            >
                <option value='2019'>2019</option>
                <option value='2020'>2020</option>
                <option value='2021'>2021</option>
            </select>
            <canvas id='covid-chart' />
        </div>
    )
}

export default CovidChart
