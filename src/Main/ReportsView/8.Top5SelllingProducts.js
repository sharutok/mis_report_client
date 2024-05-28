import axios from 'axios';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { httpApi } from '../../Side/Http';
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

export default function Top5SelllingProducts() {
    const { cust_id, date_time_string } = useParams()
    const [eqp, setEqp] = useState([])
    const [cons, setCons] = useState([])
    const [val, setVal] = useState([])
    const [key, setKey] = useState([])

    function payables(value) {
        var val = Math.abs(value)
        //Cr
        if (val >= 10000000) {
            val = (val / 100000).toFixed(1);
        }
        //Lac
        else if (val >= 100000) {
            val = (val / 100000).toFixed(2);
        }
        //10K
        else if (val >= 10000) {
            val = (val / 100000).toFixed(1);
        }//1k
        else if (val >= 10000) {
            val = (val / 1000000).toFixed(2);
        }
        return Number(val)
    }

    const getData = async () => {
        const data = await axios.post(httpApi.top5SP, { cust_id, date_time_string })
        const { consumables, equipment } = data.data.data
        let _c = []
        let _e = []
        let _x = []
        let _y = []
        consumables.map(x => {
            _c.push((x[1]))
        })
        equipment.map(x => {
            _e.push((x[1]))
        })
        setCons(_c)
        setEqp(_e)

        consumables.map(x => {
            _y.push((x[0]))
            _x.push((x[1]))
        })
        equipment.map(x => {
            _y.push((x[0]))
            _x.push((x[1]))
        })
        setKey(_x)
        setVal(_y)

    }
    useEffect(() => {
        getData()
    }, [])
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

                callbacks: {
                    label: function (data) {
                        let so = key.indexOf(data.raw)
                        return `${val[so]}  ${payables(Math.round(data.raw))} Lakhs`
                    }
                }
            },
        },
        scales: {
            y: {

                title: {
                    display: true,
                    text: 'Sales in ₹ Lakhs  '
                },
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    callback: function (value, index) {
                        return value
                    }
                },
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
    };
    const labels = ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5'];
    const data = {
        labels,
        datasets: [
            {
                id: 1,
                label: 'Consumables',
                data: cons,
                backgroundColor: '#dd6e42'
            },
            {
                id: 2,
                label: 'Equipment',
                data: eqp,
                backgroundColor: '#4f6d7a',
            },
        ],
    };
    return (
        <>
            <div>
                <h4>Top 5 Selling Products - YTD * </h4>
                <Bar
                    options={options} data={data} />
            </div>
        </>
    )
}