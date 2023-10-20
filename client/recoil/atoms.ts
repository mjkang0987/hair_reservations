import {
    atom,
    selector,
    RecoilEnv
} from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

type FullType = any;

interface DateType {
    full: FullType,
    fullYear: null | number;
    month: null | number;
    date: null | number;
    day: null | number;
}

export const todayState = atom<FullType>({
    key    : 'todayState',
    default: null
});

export const targetState = atom<DateType>({
    key    : 'targetState',
    default: {
        full    : null,
        fullYear: null,
        month   : null,
        date    : null,
        day     : null
    }
});

export const targetStateState = selector({
    key: 'targetStateState',
    get: ({get}) => {
        const targetDate = get(targetState);

        if (!targetDate.full) {
            return;
        }

        const {full, fullYear, month, date, day} = targetDate;

        const monthLastDate = new Date(Number(fullYear), Number(month) + 1, 0);
        const monthFirstDate = new Date(Number(fullYear), Number(month), 1);
        const monthPrevLastDate = new Date(Number(fullYear), Number(month), 0);

        const monthFirstDay = monthFirstDate.getDay();
        const monthLastDay = monthLastDate.getDay();
        const monthLastNumber = monthLastDate.getDate();
        const monthPrevLastNumber = monthPrevLastDate.getDate();

        const weekIndex = 0;
        const weekLength = 7;

        const weekFirstDate = new Date(
            Number(fullYear),
            Number(month),
            Number(date) - Number(day) < 0
            ? 1
            : Number(date) - Number(day)
        );

        const weekFirstNumber = weekFirstDate.getDate();

        const weekLastDate = new Date(
            Number(fullYear),
            Number(month),
            Number(weekFirstNumber) + 6 > monthLastNumber
            ? monthLastNumber
            : Number(date) + (6 - Number(day))
        );

        const weekFirstDay = weekFirstDate.getDay();
        const weekLastDay = weekLastDate.getDay();
        const weekLastNumber = weekLastDate.getDate();
        // console.log(weekFirstNumber, weekLastNumber, weekLastNumber - weekFirstNumber + 1)

        const week = () => {
            const arrWeek = new Array(weekLastNumber + 1 - weekFirstNumber).fill(weekFirstNumber);
            return arrWeek.reduce((acc, curr, index) => {
                return [...acc, curr + index];
            }, []);
        };

        const three = () => {
            const arrThree = [date, Number(date) + 1, Number(date) + 2];

            return arrThree.filter((a, i) => {
                return Number(a) <= monthLastNumber;
            });
        };

        return {
            full,
            fullYear,
            month,
            date,
            day,
            monthLastDate,
            monthFirstDate,
            monthPrevLastDate,
            monthFirstDay,
            monthLastDay,
            monthLastNumber,
            monthPrevLastNumber,
            weekLength,
            weekFirstNumber,
            weekFirstDate,
            weekFirstDay,
            weekLastDate,
            weekLastDay,
            weekLastNumber,
            week,
            three
        };
    },
    set: ({set}, newValue: any) => {
        const target = new Date(newValue);
        const fullYear = target.getFullYear();
        const month = target.getMonth();
        const date = target.getDate();
        const day = target.getDay();

        set(targetState, {
            full: target,
            fullYear,
            month,
            date,
            day
        });
    }
});

interface AsideType {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

export const asideState = atom<AsideType>({
    key    : 'asideState',
    default: {
        isVisible      : false,
        isTransitionEnd: true
    }
});

export interface ViewType {
    type: string;
}

export const viewState = atom<ViewType>({
    key    : 'viewType',
    default: {
        type: ''
    }
});
    }
});
