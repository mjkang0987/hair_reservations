type CurrentDateType = string | number;

interface SetDateType {
    currDate: CurrentDateType
    currYear?: CurrentDateType
    currMonth?: CurrentDateType
    setCurr: Function;
    setView: Function;
    router: any;
}

export const useChangeDayType = ({
    currDate,
    currYear,
    currMonth,
    setCurr,
    setView,
    router
}: SetDateType) => {
    setCurr(new Date(Number(currYear), Number(currMonth), Number(currDate)));
    setView({type: 'day'});

    router.push('/day');
};