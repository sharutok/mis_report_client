import React, { useContext } from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { convertStringToDate } from '../../Side/Misc'
import { ContextHelper } from '../HomePage'
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function ProductMixCurrentMonth() {
    const { date_time_string } = useParams()
    const { productMixCurrMon } = useContext(ContextHelper)
    const total = productMixCurrMon.slice(productMixCurrMon.length - 1)
    const dataSet = [...[...productMixCurrMon.slice(0, -1)].map(x => { return ((x * 100) / total) })]
    const data = {
        labels: ['Electrodes', 'W&F', 'Eqpt. & SGP'],
        datasets: [
            {
                data: [...dataSet],
                backgroundColor: [
                    '#dd6e42',
                    '#e8dab2',
                    '#4f6d7a',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                borderRadius: 4,
                fontSize: 50,
                color: '#343a40',
                font: {
                    weight: 'bold',
                    size: 20,
                },
                formatter: (val) => {
                    return `${(String(val).substring(0, 4))}%`
                },
                padding: 6
            },
            legend: {
                position: 'top',
            },
            tooltip: {
                titleFont: {
                    size: 15
                },
                bodyFont: {
                    size: 15
                },
                callbacks: {
                    label: function (data) {
                        return `${data.label}-: ${(String(data.raw).substring(0, 4))} %`
                    }
                }
            },
            title: {
                display: true,
                text: `Product Mix - ${moment(convertStringToDate(date_time_string)).format('MMMM')}*`,
                font: {
                    size: 20
                }
            },
        },

    };
    return (
        <div ><Doughnut data={data} options={options} plugins={[ChartDataLabels]} /></div>
    )
}
