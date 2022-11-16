import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { httpApi } from '../../Side/Http';
import { useParams } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function Top5SelllingProducts() {
    const { cust_id, date_time_string } = useParams()
    const [eqp, setEqp] = useState([])
    const [cons, setCons] = useState([])
    const [val, setVal] = useState([])
    const [key, setKey] = useState([])

    const getData = async () => {
        const data = await axios.post(httpApi.top5SP, { cust_id, date_time_string })
        const { consumables, equipment } = data.data.data
        let _c = []
        let _e = []
        let _x = []
        let _y = []
        consumables.map(x => {
            _c.push(Math.round(x[1]))
        })
        equipment.map(x => {
            _e.push(Math.round(x[1]))
        })
        setCons(_c)
        setEqp(_e)

        consumables.map(x => {
            _y.push((x[0]))
            _x.push(Math.round(x[1]))
        })
        equipment.map(x => {
            _y.push((x[0]))
            _x.push(Math.round(x[1]))
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
                        return `${val[so]} ${Math.round(data.raw / 1000000)} Lakhs`
                    }
                }
            },
        },
        scales: {
            y: {

                title: {
                    display: true,
                    text: 'Sales in Lakhs'
                },
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    callback: function (value, index) {
                        return (value / 1000000)
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
                <h4>Top 5 Selling Products</h4>
                <Bar
                    options={options} data={data} />
            </div>
        </>
    )
}


