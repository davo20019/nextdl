import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import HighchartsExporting from 'highcharts/modules/exporting';

// if (typeof Highcharts === 'object') {
//   HighchartsExporting(Highcharts);
// }

//exporting(Highcharts);

 if (typeof Highcharts === 'object') {
     exporting(Highcharts);
 }

const data = [
    { name: 'Cases', y: 1000 },
    { name: 'Deaths', y: 100 }
];

function CovidPieChart() {
    const [year, setYear] = useState('all');
    const [chartData, setChartData] = useState(data);

    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'COVID-19 Cases and Deaths'
        },
        series: [{
            name: 'Cases and Deaths',
            data: chartData
        }],
        exporting: {
            allowHTML: true,
            exportChartOptions: {
                chartOptions: {
                    title: {
                        text: 'COVID-19 Cases and Deaths'
                    }
                }
            },
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                }
            }
        }
    };

    function handleAddChart() {
        // Show a form or modal that allows the user to select data
        const newData = [    { name: 'Recovered', y: 500 },    { name: 'Active Cases', y: 400 }  ];

        setChartData([...chartData, ...newData]);
    }


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <button onClick={handleAddChart}>Add more data to the Chart</button>
        </div>
    );
}

export default CovidPieChart;
