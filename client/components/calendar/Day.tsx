import {
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import {
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {
    isTodayValue,
} from '../../utils/constants';

import {TimelineComponent} from './Timeline';

interface WeekType {
    type: string
}

export const DayComponent = () => {
    const today = useRecoilValue(todayState);
    const curr = useRecoilValue(targetStateState);

    const {
        fullYear,
        month,
        date,
    } = curr;

    return (<TimelineComponent fullYear={fullYear}
                               month={month}
                               date={date}
                               isToday={isTodayValue(today, fullYear, month, date)}/>
    );
};