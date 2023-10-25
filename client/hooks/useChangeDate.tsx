import {ViewType} from '../utils/constants';

type CurrentDateType = string | number;

interface SetDateType {
    type?: string,
    currDate: CurrentDateType,
    currYear?: CurrentDateType,
    currMonth?: CurrentDateType,
    setCurr: Function,
    setView: Function,
    router: any
}

export const useChangeDay = ({
    type,
    currDate,
    currYear,
    currMonth,
    setCurr,
    setView,
    router
}: SetDateType) => {
    setCurr(new Date(Number(currYear), Number(currMonth), Number(currDate)));
    setView({type: type === ViewType.Year ? ViewType.Month : ViewType.Day});

    if (type === ViewType.Year) {
        router.push(`/${ViewType.Month}/${currYear}/${Number(currMonth) + 1}`);
    }

    if (type !== ViewType.Year) {
        router.push(`/day/${currYear}/${Number(currMonth) + 1}/${currDate}`);
    }
};