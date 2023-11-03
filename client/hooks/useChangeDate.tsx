import {useRouter} from 'next/router';

import {ViewType} from '../utils/constants';

type CurrentDateType = string | number;

interface SetDateType {
    type?: string,
    currDate: CurrentDateType,
    currYear?: CurrentDateType,
    currMonth?: CurrentDateType,
    setCurr: Function,
    setView: Function
}

const setCalcDate = (currYear: number, currMonth: number, currDate: number) => {
    const calcDate = {
        currYear,
        currMonth,
        currDate
    };

    if (calcDate.currMonth > 12) {
        calcDate.currYear = currYear + 1;
        calcDate.currMonth = 0;
    }

    if (calcDate.currMonth < 0) {
        calcDate.currYear = currYear - 1;
        calcDate.currMonth = 11;
    }

    return {
        ...calcDate
    };
}

export const useChangeDate = ({
    type,
    currDate,
    currYear,
    currMonth,
    setCurr,
    setView
}: SetDateType) => {
    if (!currYear || !currMonth || !currDate) {
        return;
    }

    const router = useRouter();
    const newDate = setCalcDate(+currYear, +currMonth, +currDate);

    setCurr(new Date(Number(newDate.currYear), Number(newDate.currMonth), Number(newDate.currDate)));

    setView({type: type === ViewType.Year ? ViewType.Month : ViewType.Day});

    if (type === ViewType.Year) {
        router.push(`/${ViewType.Month}/${newDate.currYear}/${Number(newDate.currMonth) + 1}`);
    }

    if (type !== ViewType.Year) {
        router.push(`/day/${newDate.currYear}/${Number(newDate.currMonth) + 1}/${newDate.currDate}`);
    }

    return null;
};