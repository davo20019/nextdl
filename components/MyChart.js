import { useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from "highcharts/modules/exporting";

function MyChart() {
    const [chartOptions, setChartOptions] = useState({
        title: {
            text: 'My Chart'
        },
        series: [{
            type: 'line',
            data: [1, 2, 3, 4, 5]
        }],
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        yAxis: {
            title: {
                text: 'Values'
            }
        },
        plotOptions: {
            series: {
                turboThreshold: 0
            }
        },
        exporting: {
            url: '/chart-export'
        }
    });

    // create a ref to store the chart instance
    const chartRef = useRef(null);

    function handleFilterChange(event) {
        const { name, value } = event.target;
        setChartOptions(prevOptions => ({
            ...prevOptions,
            [name]: value
        }));
    }

    function handleUrlClick() {
        // get the chart instance from the ref
        const chart = chartRef.current.chart;

        // get the URL for the chart
        console.log(chart);
        if (typeof chart === 'object') {
            const chartUrl = chart.options.exporting.url;
        }

        //console.log(chartUrl);
    }

    return (
        <div>
            <form>
                <label>
                    Filter 1:
                    <input type="text" name="title.text" onChange={handleFilterChange} />
                </label>
                <br />
                <label>
                    Filter 2:
                    <input type="text" name="xAxis.categories" onChange={handleFilterChange} />
                </label>
                <br />
                <label>
                    Filter 3:
                    <input type="text" name="yAxis.title.text" onChange={handleFilterChange} />
                </label>
            </form>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={chartRef}
            />
            <button onClick={handleUrlClick}>Get URL</button>
        </div>
    );
}

export default MyChart;
