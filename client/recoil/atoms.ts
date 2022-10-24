import {atom} from 'recoil';

interface TodayDateType {
    year: null | number;
    month: null | number;
    date: null | number;
    day: null | number;
}

export const todayDate = atom<TodayDateType>({
    key: 'todayDate',
    default: {
        year: null,
        month: null,
        date: null,
        day: null
    }
});

export const currentDate = atom<TodayDateType>({
    key: 'currentDate',
    default: {
        year: null,
        month: null,
        date: null,
        day: null
    }
});

interface AsideType {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

export const asideState = atom<AsideType>({
    key: 'asideState',
    default: {
        isVisible: true,
        isTransitionEnd: true
    }
});
