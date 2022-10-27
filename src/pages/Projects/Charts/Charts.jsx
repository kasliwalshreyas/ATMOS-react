import React from "react";
import styles from './Charts.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['completed', 'not completed'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ]
};

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
};



const Charts = () => {
    return (
        <div className={styles.mainView}>







            <div className={styles.chartArena}>
                <div className={styles.chartHeading}>
                    <h1>Status</h1>
                </div>
                <div className={styles.statusChart} >
                    {/* <CountChart /> */}
                </div>
            </div>

        </div >
    );
}

export default Charts;
{/* <Pie
    data={data}
    options={options}
/>; */}