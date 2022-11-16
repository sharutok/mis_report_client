import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import BarApp from '../Side/AppBar'
import Reports from './Reports'
import UserInfo from '../Side/UserInfo'
import OTPDialogBox from '../Side/OTPDialogBox'
const queryClient = new QueryClient()
export const ContextHelper = React.createContext()

export default function HomePage() {
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
        di: "",
        ate: ""
    })


    const value = {
        salesDataForCurrMon, setSalesDataForCurrMon, salesDataForQTD, setSalesDataForQTD, salesDataForYTD,
        setSalesDataForYTD, qtrMonths, setQtrMonths, salesDataForPast12Months, setSalesDataForPast12Months,
        productMixCurrMon, setProductMixCurrMon, productMixQTD, setProductMixQTD, productMixYTD, setProductMixYTD,
        forProductMixYTD, setforProductMixYTD, productMixDiffMonth, setProductMixDiffMonth, cook, setCook
    }
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <ContextHelper.Provider value={value}>
                    {/* <OTPDialogBox /> */}
                    <BarApp />
                    <UserInfo />
                    <Reports />
                </ContextHelper.Provider>
            </QueryClientProvider>
        </div>
    )
}
