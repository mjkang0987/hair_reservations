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
    isTodayValue
} from '../../utils/utils';

import {TimelineComponent} from './Timeline';

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