import {
    useRecoilValue,
} from 'recoil';

import {
    currReservationsState,
    targetStateState,
    todayState
} from '../../recoil/atoms';

import {
    filterReservations,
    isTodayValue
} from '../../utils/utils';

import {TimelineComponent} from './Timeline';
import {ReservationComponent} from '../reservation/Reservation';

export const DayComponent = () => {
    const today = useRecoilValue(todayState);
    const curr = useRecoilValue(targetStateState);
    const currReservations = useRecoilValue(currReservationsState);

    const {
        fullYear,
        month,
        date,
    } = curr;

    return (<>
            <TimelineComponent fullYear={fullYear}
                               month={month}
                               date={date}
                               isToday={isTodayValue(today, fullYear, month, date)}>
                <ReservationComponent items={filterReservations({
                    reservations: currReservations,
                    fullYear,
                    currMonth: month + 1,
                    currDate: date
                })}/>
            </TimelineComponent>
        </>
    );
};