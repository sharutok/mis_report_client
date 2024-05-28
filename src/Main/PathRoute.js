import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from '../Side/404ErrorPage'
import HomePage from './HomePage'
export default function PathRoute() {
    return (
        <div>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Navigate to="/admin/login" replace />} /> */}
                    <Route path="/mis/reports/:cust_id/:date_time_string" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>
    )
}
