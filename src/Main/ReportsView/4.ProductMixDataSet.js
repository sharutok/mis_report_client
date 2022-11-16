import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { httpApi } from '../../Side/Http'
import { ContextHelper } from '../HomePage'
import moment from 'moment'
import { useParams } from 'react-router-dom'

export default function ProductMixDataSet() {
    const { cust_id, date_time_string } = useParams()

    const { productMixCurrMon, setProductMixCurrMon, productMixQTD,
        setProductMixQTD, productMixYTD, setProductMixYTD, setProductMixDiffMonth } = useContext(ContextHelper)

    let thead = ['Electrodes', 'Eqpt. & SGP', 'W&F', 'Total']

    async function getData() {
        const data = await axios.post(httpApi.productMixData, { cust_id, date_time_string })
        const { pro_mix_current_month, pro_mix_qtd, pro_mix_ytd, month_difference } = data.data.data

        let _a = []
        pro_mix_current_month.map(x => {
            Object.values(x).map(y => {
                _a.push(y)
            })
        })
        setProductMixCurrMon(_a)

        let _b = []
        pro_mix_qtd.map(x => {
            Object.values(x).map(y => {
                _b.push(y)
            })
        })
        setProductMixQTD(_b)

        let _c = []
        pro_mix_ytd.map(x => {
            Object.values(x).map(y => {
                y.map(z => {
                    _c.push(z)
                })
            })
        })
        setProductMixYTD(_c)
    }




    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <h4>Product Mix (in Lakhs)</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th className='no-border'></th>
                            {thead.map((x, i) => {
                                return (
                                    <th key={i}>{x}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='growth-text'>{moment().subtract(1, 'months').format('MMMM')}</td>
                            {productMixCurrMon.map((x, i) => {
                                return (
                                    <td key={i} >{Math.round(Number(x))}</td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td className='growth-text'>{"QTD"}</td>
                            {productMixQTD.map((x, i) => {
                                return (
                                    <td key={i} >{Math.round(Number(x))}</td>
                                )
                            })}

                        </tr>
                        <tr>
                            <td className='growth-text'>{"YTD"}</td>
                            {productMixYTD.map((x, i) => {
                                return (<td key={i}>
                                    {Math.round(x)}
                                </td>)
                            })}
                            <td>{productMixYTD.reduce((a, b) => { return Math.round(Number(a) + Number(b)) }, 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
