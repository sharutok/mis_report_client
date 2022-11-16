import React, { useContext } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ContextHelper } from '../HomePage'
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Filler
);
export default function Past12MonthSales() {

    const { salesDataForPast12Months } = useContext(ContextHelper)
    let labels = []
    let datas = []

    salesDataForPast12Months.map(x => {
        Object.entries(x).map((z, i) => {
            labels.push(z[i])
            datas.push(Math.round(String(z[i + 1])))
        })

    })

    const options = {
        elements: {
            line: {
                tension: 0.5
            }
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            tooltip: {
                titleFont: {
                    size: 15
                },
                bodyFont: {
                    size: 15
                },
            },
            title: {
                display: true,
                text: 'Past 12 month Sales',
                font: {
                    size: 20
                }
            },
            datalabels: {
                backgroundColor: 'white',
                borderRadius: 200,
                borderColor: "#e8dab2",
                borderWidth: 2, // <- add this 
                color: '#dd6e42',
                font: {
                    weight: 'bold',
                    size: 15
                },
                formatter: Math.round,
                // padding: 5
            }
        },

        scales: {
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Sales in Lakhs'
                },
                type: 'linear',
                display: true,
                position: 'left',
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: '12 Months',
                data: datas,
                borderColor: '#4f6d7a',
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                    gradient.addColorStop(0, "rgba(79, 109, 122,1)");
                    gradient.addColorStop(1, "rgba(79, 109, 122,0)");
                    return gradient;
                },
            },
        ],
    };
    return (
        <div>
            <Line options={options} data={data} plugins={[ChartDataLabels]} />
        </div>
    )
}