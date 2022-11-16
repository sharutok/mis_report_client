import { Stack } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { httpApi } from './Http'
import '../Styles/UserInfo.css'
import moment from 'moment'
function UserInfo() {
    const { cust_id, date_time_string } = useParams()
    const [user, setUser] = useState({
        name: "",
        id: ""
    })
    async function getData() {
        const data = await axios.post(httpApi.distributorOrigin, { cust_id })
        const { cust_name } = data.data.data
        setUser({ ...user, name: cust_name, id: cust_id })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='info-container'>
            <div className='info info-btn'>
                <div>
                    <h3>Distributor Name: <span>{user.name}</span></h3>
                    <h3>Code: <span>{user.id}</span></h3>
                </div>
                {/* <h3>For The Month: {new Date(Number(date_time_string)).toLocaleDateString('IN')}</h3> */}
                <h3>For The Month :  {moment(new Date(Number(date_time_string)).toLocaleDateString()).format("MMMM YYYY")}</h3>

            </div>
        </div>
    )
}

export default UserInfo