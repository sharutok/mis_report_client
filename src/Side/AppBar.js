import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconDownload } from '@tabler/icons'
import { useParams } from 'react-router-dom';
import '../Styles/AppBar.css'
import moment from 'moment'
export default function BarApp() {
    const { date_time_string } = useParams()
    const convertStringToDate = new Date(Number(date_time_string)).toISOString().substring(0, 10)
    const a = 'ADMIS_LEDGER'
    const b = moment(convertStringToDate).format('MMM').toUpperCase()
    const c = moment(convertStringToDate).format('YY')
    const d = moment(convertStringToDate).add(1, 'years').format('YY')
    const val = `${a}_${b}-${c}-${d}_`
    // console.log(a + b + c + d);
    // const val = `ADMIS_LEDGER_OCT-22-23_`



    const { cust_id } = useParams()
    return (
        <div><Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: "#edede9", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }} position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
                        <img src={require('../Images/AWL_logo_new.png')} alt="ADOR" width={100} />
                    </Typography>
                    <Typography className='header' variant="h5" component="div" sx={{ flexGrow: 1, mt: 1 }}>
                        MIS REPORT - Distributor Dashboard
                    </Typography>
                    <a
                        style={{ textDecoration: "none" }}
                        className="Download"
                        target="_blank"
                        rel="noreferrer"
                        href={require(`../../../server/Resources/Ledger_PDF/${val + cust_id}.pdf`)}
                        download
                    >
                        <Button className='button-download-ledger btn-download' endIcon={<IconDownload />} variant="contained">Download Ledger</Button>
                    </a>
                </Toolbar>
            </AppBar>
        </Box></div>
    )
}
