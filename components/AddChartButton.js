import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import Modal from 'react-modal';

if (typeof Highcharts === 'object') {
    exporting(Highcharts);
}

function AddChartButton({ onAddChart }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chartType, setChartType] = useState('pie');
    const [data, setData] = useState([
        { name: 'Cases', y: 1000 },
        { name: 'Deaths', y: 100 }
    ]);
    const [title, setTitle] = useState('COVID-19 Cases and Deaths');

    function handleAddChart() {
        onAddChart({ type: chartType, data, title });
        setIsModalOpen(false);
    }

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Add a New Chart to the dashboard</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <label>
                    Chart Type:
                    <select value={chartType} onChange={e => setChartType(e.target.value)}>
                        <option value="pie">Pie</option>
                        <option value="column">Column</option>
                        <option value="line">Line</option>
                        <option value="area">Area</option>
                    </select>
                </label>
                <br />
                <label>
                    Data:
                    <input value={data} onChange={e => setData(e.target.value)} />
                </label>
                <br />
                <label>
                    Title:
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <br />
                <button onClick={handleAddChart}>Add a New Chart</button>
            </Modal>
        </div>
    );
}
export default AddChartButton