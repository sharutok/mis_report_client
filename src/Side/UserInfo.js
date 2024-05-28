import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/UserInfo.css'
import { httpApi } from './Http'
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
                <div>
                    <h3>For The Month :  {moment(new Date(Number(date_time_string)).toLocaleDateString()).format("MMMM YYYY")}</h3>
                    <h5 style={{ textAlign: "right", fontStyle: "italic", fontSize: "1rem" }}>* All values shown are including DAP</h5>
                </div>
            </div>

        </div>
    )
}

export default UserInfo