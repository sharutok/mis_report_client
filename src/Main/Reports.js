import React from 'react'
import HoverOn from '../Side/HoverOn'
import '../Styles/Reports.css'
import SalesDataSet from './ReportsView/1.SalesDataSet'
import TOI from './ReportsView/2.TOI'
import Past12MonthSales from './ReportsView/3.Past12MonthSales'
import ProductMixDataSet from './ReportsView/4.ProductMixDataSet'
import ProductMixYTD from './ReportsView/5.ProductMixYTD'
import ProductMixCurrentMonth from './ReportsView/6.ProductMixCurrentMonth'
import PayablesDataSet from './ReportsView/7.PayablesDataSet'
import Top5SellingProducts from './ReportsView/8.Top5SelllingProducts'

export default function Reports() {
    return (
        <>
            <div className='main-view'>
                <div className='reports-view'>
                    <div className='div1'>
                        <div>
                            <div className="comp1">
                                <SalesDataSet />
                            </div>
                        </div>
                        <div className="comp1">
                            <HoverOn />
                            <TOI />
                        </div>
                        <div className="comp1">
                            <HoverOn />
                            <Past12MonthSales />
                        </div>
                    </div>
                </div>
                <div className='div2'>
                    <div className='div3'>
                        <div className="comp1">
                            <HoverOn />
                            <ProductMixCurrentMonth />
                        </div>
                        <div className="comp1">
                            <HoverOn />
                            <ProductMixYTD />
                        </div>
                    </div>
                    <div className='div4'>
                        <div className="comp1">
                            <ProductMixDataSet />
                        </div>
                        <div className="comp1">
                            <PayablesDataSet />
                        </div>
                    </div>
                    <div className='div5'>
                        <div className="comp1">
                            <HoverOn />
                            <Top5SellingProducts />
                        </div>
                    </div>
                </div>
            </div >
            <div style={{ padding: "1rem", }}>
                <div className='infos infos-btn' >
                    <h3><a style={{ color: "red" }} target="_blank" href="https://www.adorwelding.com/">www.adorwelding.com</a></h3>
                </div>
            </div>
        </>
    )
}
