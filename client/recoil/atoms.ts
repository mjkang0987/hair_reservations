import {
    atom,
    selector,
    RecoilEnv
} from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

type FullType = Date | null;

interface DateType {
    full: FullType,
    fullYear: number;
    month: number;
    date: number;
    day: number;
}

export const todayState = atom<FullType>({
    key    : 'todayState',
    default: null
});

export const targetState = atom<DateType>({
    key    : 'targetState',
    default: {
        full    : null,
        fullYear: 0,
        month   : 0,
        date    : 0,
        day     : 0
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

        const monthLastDate = new Date(+fullYear, +month + 1, 0);
        const monthFirstDate = new Date(+fullYear, +month, 1);
        const monthPrevLastDate = new Date(+fullYear, +month, 0);

        const monthFirstDay = monthFirstDate.getDay();
        const monthLastDay = monthLastDate.getDay();
        const monthLastNumber = monthLastDate.getDate();
        const monthPrevLastNumber = monthPrevLastDate.getDate();

        const weekIndex = 0;
        const weekLength = 7;

        const weekFirstDate = new Date(
            +fullYear,
            +month,
            +date - +day < 1
            ? 1
            : +date - +day
        );

        const weekFirstNumber = weekFirstDate.getDate();

        const weekLastDate = new Date(
            +fullYear,
            +month,
            +weekFirstNumber + 6 > monthLastNumber
            ? monthLastNumber
            : +date + (6 - +day)
        );

        const weekFirstDay = weekFirstDate.getDay();
        const weekLastDay = weekLastDate.getDay();
        const weekLastNumber = weekLastDate.getDate();
        // console.log(weekFirstNumber, weekLastNumber, weekLastNumber - weekFirstNumber + 1)

        const week = () => {
            return new Array(weekLastNumber + 1 - weekFirstNumber).fill(weekFirstNumber).reduce((acc, curr, index) => [...acc, curr + index], []);
        };

        const three = () => {
            return [date, +date + 1, +date + 2].filter((a, i) => +a <= monthLastNumber);
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
        type: 'week'
    }
});

interface TimeType {
    start: number;
    end: number;
    is12Hour: boolean;
}

export const timeState = atom<TimeType>({
    key    : 'timeState',
    default: {
        start   : 10,
        end     : 20,
        is12Hour: false
    }
});

interface RouterType {
    arrayRouter: Array<string | number>,
    isRootPath: boolean,
    isCalendarPath: boolean,
}

export const routerState = atom<RouterType>({
    key    : 'routerState',
    default: {
        arrayRouter   : [],
        isRootPath    : false,
        isCalendarPath: false
    }
});

interface ReservationsType {
    id: number;
    year: number;
    month: number;
    date: number;
    startHours: number;
    startMinutes: number;
    endHour: number;
    endMinutes: number;
    service: string;
    name: string;
}

export const reservationsState = atom<ReservationsType[]>({
    key    : 'reservationsState',
    default: []
});

export const currReservationsState = atom<ReservationsType[]>({
    key    : 'currReservationsState',
    default: []

});

