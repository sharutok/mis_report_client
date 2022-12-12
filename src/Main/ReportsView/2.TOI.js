import React, { useContext, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, defaults } from 'react-chartjs-2';
import { ContextHelper } from '../HomePage';
import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export default function TOI() {
    const { salesDataForQTD, qtrMonths } = useContext(ContextHelper)
    // console.log(salesDataForQTD, qtrMonths);
    const barThickness = 200
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const dataPoints = [0, "75", "125", "250", 475]

    const labels = ["Month wise sales in the Quarter"]
    const datasetz = [{
        label: moment().month(qtrMonths[0] - 1).format("MMM"),
        data: salesDataForQTD.slice((1, salesDataForQTD.length / 2))[0] && [salesDataForQTD.slice((1, salesDataForQTD.length / 2))[0]],
        backgroundColor: '#dd6e42',
        barThickness,

    },
    salesDataForQTD.slice((1, salesDataForQTD.length / 2))[1] && {
        label: moment().month(qtrMonths[1] - 1).format("MMM"),
        data: salesDataForQTD.slice((1, salesDataForQTD.length / 2))[1] && [salesDataForQTD.slice((1, salesDataForQTD.length / 2))[1]],
        backgroundColor: '#e8dab2',
        barThickness,
    },
    salesDataForQTD.slice((1, salesDataForQTD.length / 2))[1] && {
        label: moment().month(qtrMonths[2] - 1).format("MMM"),
        data: salesDataForQTD.slice((1, salesDataForQTD.length / 2))[2] && [salesDataForQTD.slice((1, salesDataForQTD.length / 2))[2]],
        backgroundColor: '#4f6d7a',
        barThickness,
    },]
    const data = {
        labels,
        datasets: [
            ...datasetz.filter(n => n)
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                titleFont: {
                    size: 15
                },
                bodyFont: {
                    size: 15
                },
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Turn Over Incentive [TOI]  Achivement*`,
                font: {
                    size: 20
                }
            },
            datalabels: {
                borderRadius: 1,
                fontSize: 50,
                color: '#495057',
                font: {
                    weight: 'bold',
                    size: 16,

                },
                formatter: Math.round,
                padding: 3
            }

        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    drawBorder: false,
                    lineWidth: 0
                }
            },
            y: {
                max: 475,
                afterBuildTicks: axis => axis.ticks = [...dataPoints].map(v => ({ value: v })),
                ticks: {
                    callback: function (value, index) {
                        return value
                    }
                },
                title: {
                    display: true,
                    text: 'TOI Slab in ₹ lakhs'
                },
                grid: {
                    drawBorder: false,
                    lineWidth: function (context) {
                        return context?.index === 0 ? 0 : 1;
                    },
                },
                stacked: true,


            },
        },
    };
    return (
        <div >
            <Bar options={options} plugins={[ChartDataLabels]}
                data={data} />
            {/* <div style={{ textAlign: "right", color: "grey", marginTop: "1rem" }}>* TOI will be calculated on net value excluding DAP charges</div> */}
        </div >
    )
}

