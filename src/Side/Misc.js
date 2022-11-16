import { IconArrowUpRight, IconArrowDownRight, IconArrowRight } from '@tabler/icons';
import moment from 'moment';

// a curr 
// b prev
export const growthFormula = (a, b) => {

    const diff = a - b
    return Math.round(((diff / (b)) * 100))
}

export const growthIcon = (v) => {
    if (v < 0) {
        return (< IconArrowDownRight style={{ marginBottom: "-0.3rem" }} size={20} color={"red"} />)
    }
    if (v > 0) {
        return (<IconArrowUpRight style={{ marginBottom: "-0.3rem" }} size={20} color={"green"} />)
    }
    return (<IconArrowRight style={{ marginBottom: "-0.3rem" }} size={20} color={"orange"} />)
}

export const y1 = `FY ${moment().subtract(1, 'years').calendar().substring(6, 10)} - ${moment().format('YYYY')}`;
export const y2 = `FY ${moment().format('YYYY')} - ${moment().add(1, 'years').calendar().substring(6, 10)}`;