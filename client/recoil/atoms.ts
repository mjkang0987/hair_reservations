import {atom} from 'recoil';

type FullType = any;

interface TodayDateType {
    full: FullType;
    firstDay?: null | number;
    lastDay?: null | number;
    lastDate?: null | number;
    prevLastDate?: null | number;
}

export const todayDate = atom<FullType>({
    key: 'todayDate',
    default: {
        full: null
    }
});

export const currentDate = atom<TodayDateType>({
    key: 'currentDate',
    default: {
        full: null,
        firstDay: null,
        lastDay: null,
        lastDate: null,
        prevLastDate: null,
    }
});

interface AsideType {
    isVisible: boolean;
    isTransitionEnd: boolean;
}

export const asideState = atom<AsideType>({
    key: 'asideState',
    default: {
        isVisible: false,
        isTransitionEnd: true
    }
});
