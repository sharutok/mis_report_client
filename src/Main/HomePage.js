import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import BarApp from '../Side/AppBar'
import Reports from './Reports'
import UserInfo from '../Side/UserInfo'
import OTPDialogBox from '../Side/OTPDialogBox'
import { useParams } from 'react-router-dom';
import { getCookies } from '../Side/ManageCookies'
import AlterErrorPage from '../Side/AlterErrorPage'
import bcrypt from 'bcryptjs'
import Cookies from "universal-cookie";
const cookies = new Cookies()
const queryClient = new QueryClient()
export const ContextHelper = React.createContext()

export default function HomePage() {
    const { cust_id, date_time_string } = useParams()
    const [salesDataForCurrMon, setSalesDataForCurrMon] = useState([])
    const [salesDataForQTD, setSalesDataForQTD] = useState([])
    const [salesDataForYTD, setSalesDataForYTD] = useState([])
    const [qtrMonths, setQtrMonths] = useState([])
    const [salesDataForPast12Months, setSalesDataForPast12Months] = useState([])

    const [productMixCurrMon, setProductMixCurrMon] = useState([])
    const [productMixQTD, setProductMixQTD] = useState([])
    const [productMixYTD, setProductMixYTD] = useState([])
    const [forProductMixYTD, setforProductMixYTD,] = useState({
        elec: [],
        wf: [],
        eqsgp: []
    })
    const [productMixDiffMonth, setProductMixDiffMonth] = useState("")
    const [cook, setCook] = useState({
        di: "", ate: "", pot: ""
    })
    const [val, setVal] = useState({
        otp: "",
        cust_id: "",
        cust_verified: false
    })
    const [use, setUse] = useState({
        hash_cust_id: "", hash_date_time_string: ""
    })

    const value = {
        salesDataForCurrMon, setSalesDataForCurrMon, salesDataForQTD, setSalesDataForQTD, salesDataForYTD,
        setSalesDataForYTD, qtrMonths, setQtrMonths, salesDataForPast12Months, setSalesDataForPast12Months,
        productMixCurrMon, setProductMixCurrMon, productMixQTD, setProductMixQTD, productMixYTD, setProductMixYTD,
        forProductMixYTD, setforProductMixYTD, productMixDiffMonth, setProductMixDiffMonth, cook, setCook, val, setVal,
        use, setUse
    }
    function compareHash() {
        const _cust_id = cookies.get("di")
        const _date_string = cookies.get("ate")
        const _id_ = bcrypt.compareSync(cust_id, _cust_id)
        const _date_string_ = bcrypt.compareSync(date_time_string, _date_string)
        return _id_ && _date_string_
    }


    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <ContextHelper.Provider value={value}>

                    <BarApp />
                    <UserInfo />
                    <Reports />

                    {/* {!getCookies()[2] && <OTPDialogBox />}
                    {(getCookies()[2] && compareHash()) ? <>
                        <BarApp />
                        <UserInfo />
                        <Reports />
                    </> : <AlterErrorPage />} */}
                </ContextHelper.Provider>
            </QueryClientProvider>
        </div>
    )
}
