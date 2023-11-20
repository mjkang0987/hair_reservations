import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {ReservationsType} from '../recoil/atoms';

import {
    ASIDE,
    ViewType
} from './constants';

export const isTodayValue = (today: any, fullYear: number, month: number, number: number = 0): boolean => {
    return [today.getFullYear(), today.getMonth(), today.getDate()].join(' ') === [fullYear, month, number].join(' ');
};

export const isCalendar = (arrayPath: string[] = ['', '', '', '']) => {
    const findIndex = Object.keys(ASIDE).findIndex((aside) => aside.toLowerCase() === arrayPath[1]);
    return findIndex > -1;
};

interface RouterType {
    type: string,
    year: number | null,
    month: number | null,
    date: number | null,
    router: any
}

export const setRouter = ({
    type,
    year,
    month,
    date,
    router
}: RouterType) => {
    const arrayDate = [year, month, date];
    const setLength = type === ViewType.Day ? arrayDate.length : 2;
    const index = type === ViewType.Year ? 1 : setLength;
    const isCalendarPath = isCalendar(['', type]);
    const resultPath = isCalendarPath ? `/${type}/${arrayDate.slice(0, index).join('/')}` : `/${type}`;
    router.push(resultPath);
};

interface RouterChangeType {
    setRouters: Function;
}

export const handleOnload = ({
    setRouters,
}: RouterChangeType) => {
    const getRouterState = (url: string) => {
        const array = url.split('/');

        setRouters({
            arrayRouter   : array,
            isRootPath    : array.join('').length === 0,
            isCalendarPath: isCalendar(array)
        });
    };

    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeComplete', getRouterState);
        return () => {
            router.events.off('routeChangeComplete', getRouterState);
        };
    }, []);

    return null;
};

interface FilterReservationsType {
    reservations: ReservationsType[] | [];
    fullYear: number,
    currMonth: number;
    currDate: number;
}

export const filterReservations = ({
    reservations,
    fullYear,
    currMonth,
    currDate
}: FilterReservationsType) => {
    if (reservations.length === 0) {
        return [];
    }

    const obj = {
        year : fullYear,
        month: currMonth,
        date : currDate
    };

    if (obj.month > 12) {
        obj.year = obj.year + 1;
        obj.month = 1;
    }

    if (obj.month < 1) {
        obj.year = obj.year - 1;
        obj.month = 12;
    }

    return reservations.filter((reservation) => reservation.id === Number(`${obj.year}${obj.month}${obj.date}`)) || [];
};

export interface TimeStartType {
    startHours: number;
    startMinutes: number;
}

export interface TimeEndType {
    endHours: number;
    endMinutes: number;
}

export const setTimeText = ({
    startHours,
    startMinutes
}: TimeStartType) => {
    const hours = startHours < 12
                  ? `오전 ${startHours}`
                  : `오후 ${(startHours - 12).toString().length === 0
                          ? `0${(startHours - 12)}`
                          : startHours - 12}`;
    const minutes = startMinutes.toString().length === 1
                    ? `0${startMinutes}`
                    : startMinutes;

    return `${hours}:${minutes}`;
};

export const setTimeHeight = ({
    startHours,
    startMinutes,
    endHours,
    endMinutes
}: TimeStartType & TimeEndType) => {
    return `${((endHours - startHours) * 120) + ((endMinutes - startMinutes) * 2)}px`;
};

