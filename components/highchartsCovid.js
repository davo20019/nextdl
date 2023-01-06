import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const data = [
    { date: '2020-01-01', cases: 1000, deaths: 100 },
    { date: '2020-02-01', cases: 2000, deaths: 200 },
    { date: '2020-03-01', cases: 3000, deaths: 300 },
    { date: '2021-01-01', cases: 4000, deaths: 400 },
    { date: '2021-02-01', cases: 5000, deaths: 500 },
    { date: '2021-03-01', cases: 6000, deaths: 600 },
    { date: '2022-01-01', cases: 1000, deaths: 900 },
    { date: '2022-02-01', cases: 1500, deaths: 800 },
    { date: '2022-03-01', cases: 2500, deaths: 1000 }
];

function CovidChart() {
    const [year, setYear] = useState('all');

    const options = {
        title: {
            text: 'COVID-19 Cases and Deaths'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Number of cases/deaths'
            }
        },
        series: [{
            name: 'Cases',
            data: data.map(datum => [datum.date, datum.cases])
        }, {
            name: 'Deaths',
            data: data.map(datum => [datum.date, datum.deaths])
        }],
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                }
            }
        }
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const filteredData = year === 'all' ? data : data.filter(datum => new Date(datum.date).getFullYear() === parseInt(year, 10));
    options.series[0].data = filteredData.map(datum => [datum.date, datum.cases]);
    options.series[1].data = filteredData.map(datum => [datum.date, datum.deaths]);

    return (
        <div>
            <select value={year} onChange={handleYearChange}>
                <option value="all">All years</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default CovidChart;
