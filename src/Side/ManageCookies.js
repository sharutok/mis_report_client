import { useContext } from 'react'
import Cookies from "universal-cookie";
const cookies = new Cookies()
// di -> id
// ate -> date
// pot->otp
let cookieName = ["di", "ate", 'pot']
let flag = []

export const setCookies = (cookieValues) => {
    cookieName.map((x, i) => {
        cookies.set(x, cookieValues[i], { path: "/" })
    })

}
export const getCookies = () => {
    cookieName.map(x => {
        flag.push(cookies.get(x))
    })
    return flag
}

export const deleteCookies = () => {
    cookieName.map(x => {
        return cookies.remove(x, { path: "/" })
    })
}

function CookiesS() {
    // const { cook, setCook } = useContext(AppContext)
    // setCook({ di: "", ate: "", pot: "" })
}
export default CookiesS