import React, { useEffect, useContext, useState } from 'react'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { httpApi } from '../../Side/Http'
import axios from "axios";
import { ContextHelper } from '../HomePage';
import { growthFormula, growthIcon, y1, y2 } from '../../Side/Misc';
import { IconInfoCircle } from '@tabler/icons'
import { useParams } from 'react-router-dom';
import '../../Styles/SalesDataSet.css'
import { convertStringToDate } from '../../Side/Misc'

export default function SalesDataSet() {
    const { cust_id, date_time_string } = useParams()
    const [monthDiff, setMonthDiff] = useState("")
    const { salesDataForCurrMon, setSalesDataForCurrMon, salesDataForQTD, setSalesDataForQTD, salesDataForYTD, setSalesDataForYTD, setQtrMonths, setSalesDataForPast12Months } = useContext(ContextHelper)
    let thead = [y1, y2, 'Growth (%)']

    async function datas() {
        let flag = []
        const data = await axios.post(httpApi.salesData, { cust_id, date_time_string })

        const { current_month_sale, current_qtr_sale, annual_sales, current_qtr_month, last_12_months_data,
            month_difference } = data.data.data.data

        current_month_sale.map(x => {
            Object.values(x).map(y => {
                flag.push(y)
            })
        })

        //current month
        setSalesDataForCurrMon(flag)

        //QTD
        flag = []
        current_qtr_sale.map(x => {
            Object.values(x).map(y => {
                flag.push(y)
            })
        })
        setSalesDataForQTD(flag)


        //YTD
        flag = []
        annual_sales.map(x => {
            Object.values(x).map(y => {
                flag.push(y)
            })
        })
        setSalesDataForYTD(flag)
        setQtrMonths(current_qtr_month)


        //past 12 months 
        setSalesDataForPast12Months(last_12_months_data)
        setMonthDiff(month_difference)
    }


    // const { data, isLoading } = useQuery(['sales-data'], async () => { return await axios.post(httpApi.salesData, { cust_id, date_time_string }) })
    // console.log(data);



    useEffect(() => {
        datas()
    }, [1])


    // if (isLoading) {
    //     return <p>Loading....</p>
    // }

    return (
        <div>
            <h4>Sales Data (in Lakhs)</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className='no-border'></th>
                            {thead.map((x, i) => {
                                return (
                                    <th key={i}>{x}</th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='growth-text'>{moment(convertStringToDate(date_time_string)).format('MMMM')}</td>
                            {salesDataForCurrMon.map((x, i) => {
                                return (<td key={i}>{Math.round(x)}</td>)
                            })}
                            <td className='growth-text' style={{ color: growthFormula(salesDataForCurrMon[1], salesDataForCurrMon[0]) ? growthFormula(salesDataForCurrMon[1], salesDataForCurrMon[0]) < 0 ? "red" : "green" : 'orange' }}>{(growthFormula(salesDataForCurrMon[1], salesDataForCurrMon[0]))} {growthIcon(growthFormula(salesDataForCurrMon[1], salesDataForCurrMon[0]))}</td>
                        </tr>
                        <tr>
                            <td className='growth-text'>{"QTD"}</td>
                            <td>{Math.round(salesDataForQTD.slice(0, salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0))}</td>
                            <td>{Math.round(salesDataForQTD.slice(salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0))}</td>
                            <td className='growth-text' style={{ color: growthFormula(salesDataForQTD.slice(salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0), salesDataForQTD.slice(0, salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0)) ? growthFormula(salesDataForQTD.slice(salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0), salesDataForQTD.slice(0, salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0)) < 0 ? "red" : "green" : 'orange' }}>{(growthFormula(salesDataForQTD.slice(salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0), salesDataForQTD.slice(0, salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0)))} {growthIcon(growthFormula(salesDataForQTD.slice(salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0), salesDataForQTD.slice(0, salesDataForQTD.length / 2).reduce((a, b) => { return a + b }, 0)))}</td>
                        </tr>
                        <tr>
                            <td className='growth-text'>{"YTD"}</td>
                            {salesDataForYTD.map((x, i) => {
                                return (<td key={i}>
                                    {Math.round(x)}
                                </td>)
                            })}
                            <td className='growth-text' style={{ color: growthFormula(salesDataForYTD[1], salesDataForYTD[0]) ? growthFormula(salesDataForYTD[1], salesDataForYTD[0]) < 0 ? "red" : "green" : 'orange' }} >{(growthFormula(salesDataForYTD[1], salesDataForYTD[0]))} {growthIcon(growthFormula(salesDataForYTD[1], salesDataForYTD[0]))}</td>
                        </tr>
                        <tr>
                            <td className='growth-text' style={{ fontSize: "0.9rem" }}>{"Avg. Monthly Sales"}</td>
                            {salesDataForYTD.map((x, i) => {
                                return (<td key={i}>
                                    {Math.round(x / monthDiff)}
                                </td>)
                            })}
                            <td className='growth-text' style={{ color: growthFormula(salesDataForYTD[1] / monthDiff, salesDataForYTD[0] / monthDiff) ? growthFormula(salesDataForYTD[1] / monthDiff, salesDataForYTD[0] / monthDiff) < 0 ? "red" : "green" : 'orange' }} >{(growthFormula(salesDataForYTD[1] / monthDiff, salesDataForYTD[0] / monthDiff))} {growthIcon(growthFormula(salesDataForYTD[1] / monthDiff, salesDataForYTD[0] / monthDiff))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}
//
// 2022-2023 salesDataForCurrMon[1] , 2021-2022 salesDataForCurrMon[0]