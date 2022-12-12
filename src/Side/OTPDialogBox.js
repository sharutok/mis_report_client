import React, { useEffect, useState, useContext } from 'react';
import { Button, Box, TextField, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconDeviceMobileMessage } from '@tabler/icons'
import axios from 'axios';
import { httpApi } from './Http';
import { useParams } from 'react-router-dom';
import { setCookies } from '../Side/ManageCookies'
import bcrypt from 'bcryptjs'
import { ContextHelper } from '../Main/HomePage'
import Cookies from "universal-cookie";
const cookies = new Cookies()

export default function OTPDialogBox() {
    const salt = bcrypt.genSaltSync(10)
    const { val, setVal, use, setUse } = useContext(ContextHelper)
    const { cust_id, date_time_string } = useParams()
    const [open, setOpen] = useState(true);
    const [error, setError] = useState({
        state: false,
        mess: ""
    })
    const [mobilNo, setMobilNo] = useState("")

    function hash() {
        const _hash_cust_id = bcrypt.hashSync(cust_id, salt)
        const _hash_date_time_string = bcrypt.hashSync(date_time_string, salt)
        setUse({ ...use, hash_cust_id: _hash_cust_id, hash_date_time_string: _hash_date_time_string, })
        setCookies([_hash_cust_id, _hash_date_time_string, ""])
    }

    function compareHash() {
        const _cust_id = cookies.get("di")
        const _date_string = cookies.get("ate")
        const _id_ = bcrypt.compareSync(cust_id, _cust_id)
        const _date_string_ = bcrypt.compareSync(date_time_string, _date_string)
        return _id_ && _date_string_
    }

    async function CheckOTPCookieThere() {
        const _otp = cookies.get("pot")
        if (!_otp) {
            hash()
            if (compareHash()) {
                try {
                    const data = await axios.post(httpApi.otp_sender, { cust_id, cust_verified: true })
                    setMobilNo(data.data.mobile_no)

                } catch (error) {
                    console.log("error", "👺");
                }
            }
        }
    }

    const checkOTP = async () => {
        try {
            const result = await axios.post(httpApi.otp_verify, { ...val, cust_id, cust_verified: true })
            return result
        } catch (error) {
            console.log("error");
        }
    }


    const handleOnChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setVal({ ...val, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        const data = await checkOTP()
        if (data.data.state) {
            cookies.set("pot", true, { path: "/" })
            setOpen(false);
            setError({
                state: false,
                mess: ""
            })
            window.location.reload()
        }
        else {
            setError({
                state: true,
                mess: data.data.mess
            })
            setTimeout(() => {
                setError({
                    state: false,
                    mess: ""
                })
            }, 2500)
        }
    }

    useEffect(() => {
        CheckOTPCookieThere()
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Dear Distributor,"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        OTP has been sent to your Mobile Number
                        <h4 style={{ fontWeight: "bold", margin: "1rem" }}>

                            +91 {mobilNo}
                        </h4>
                        <Stack justifyContent={"center"}>
                            <div style={{ margin: "0 auto" }}>
                                <IconDeviceMobileMessage size={60} sx={{ color: 'action.active' }} />
                                <TextField error={error.state} helperText={error.mess} sx={{ width: 90 }} inputProps={{ style: { textAlign: 'center', fontSize: "2rem", } }}
                                    size='small' id="input-with-sx" onChange={handleOnChange} autoFocus={true} name="otp" variant="standard" />
                            </div>
                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: "white", background: "grey" }} variant="contained" onClick={handleOnSubmit}>Submit OTP !</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}