import { Bar } from "react-chartjs-2"
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale, // Pastikan skala "category" ini terdaftar
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ chartData }) => {




    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Penjualan per Kategori dan Tahun',
            },
        },
        scales: {
            x: {
                stacked: false, // Ubah ke true jika ingin bar ditumpuk
            },
            y: {
                beginAtZero: true,
            },
        },
    });

    return (
        <div style={{ width: '100%' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default LineChart
