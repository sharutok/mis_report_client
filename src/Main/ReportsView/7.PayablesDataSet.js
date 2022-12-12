import React, { useState, useEffect } from 'react'
import { useSpring, animated, config } from 'react-spring'
import axios from 'axios'
import { httpApi } from '../../Side/Http'
import { useParams } from 'react-router-dom'
export default function PayablesDataSet() {
    const [payablesData, setPayablesData] = useState({
        opening: "",
        closing: ""
    })
    const { cust_id, date_time_string } = useParams()
    const getData = async () => {
        try {
            const data = await axios.post(httpApi.payables, { cust_id, date_time_string })
            const { opening_bal, closing_bal } = data.data
            setPayablesData({
                opening: opening_bal,
                closing: closing_bal
            })
        } catch (error) {
            console.log('🧨');
        }
    }

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
        //K
        else if (val >= 10000) {
            val = (val / 10000).toFixed(2);
        }
        return Number(val)
    }

    useEffect(() => {
        getData()
    }, [])


    const { number } = useSpring({
        from: { number: 0 },
        number: payables(payablesData.opening),
        delay: 100,
        config: config.molasses,
    })
    const { number1 } = useSpring({
        from: { number1: 0 },
        number1: payables(payablesData.closing),
        delay: 100,
        config: config.molasses,
    })

    let thead = ['Opening Balance', 'Closing Balance']
    return (
        <div>
            <h4>Payables (in ₹ Lakhs  )*</h4>
            <table>
                <thead>
                    <tr>
                        {thead.map((x, i) => {
                            return (<th key={i}>{x}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ fontSize: "5rem" }} className='growth-text'>
                            <animated.div>{number.to(n => n.toFixed(0))}</animated.div>
                        </td>
                        <td style={{ fontSize: "5rem" }} className='growth-text'>
                            <animated.div>{number1.to(n => n.toFixed(0))}</animated.div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
