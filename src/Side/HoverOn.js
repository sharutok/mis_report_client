import React from 'react'
import '../Styles/HoverOn.css'
import { IconInfoCircle } from '@tabler/icons'
export default function HoverOn() {
    let val = `Hover on chart for more info`
    return (
        <div className='atn'>

            <h4 data-text={val}>
            </h4>
        </div>
    )
}
