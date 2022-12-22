import { IconArrowUpRight, IconArrowDownRight, IconArrowRight } from '@tabler/icons';
import moment from 'moment';

export const growthFormula = (a, b) => {

    const diff = a - b
    if (!b) {
        return Math.round(a)
    }
    if (!a) {
        return Math.round(b)
    }
    return Math.round(((diff / (b)) * 100))

}

export const growthIcon = (v) => {
    if (v < 0) {
        return (< IconArrowDownRight style={{ marginBottom: "-0.3rem" }} size={20} color={"#ee6055"} />)
    }
    if (v > 0) {
        return (<IconArrowUpRight style={{ marginBottom: "-0.3rem" }} size={20} color={"#52b788"} />)
    }
    return (<IconArrowRight style={{ marginBottom: "-0.3rem" }} size={20} color={"#ffbf69"} />)
}

export const y1 = `FY ${moment().subtract(1, 'years').calendar().substring(6, 10)} - ${moment().format('YYYY')}`;
export const y2 = `FY ${moment().format('YYYY')} - ${moment().add(1, 'years').calendar().substring(6, 10)}`;

export const convertStringToDate = (date_time_string) => {
    return new Date(Number(date_time_string)).toISOString().substring(0, 10)

}