import {useRecoilValue} from 'recoil';
import {viewState} from '../../recoil/atoms';

import {DaysComponent} from './Days';
import {DatesComponent} from './Dates';
import {YearComponents} from './Year';

export const CalendarComponent = ()  => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    return (
        <>
            {(type === 'month' || type === 'week' || type === 'three') && <DaysComponent/>}
            <DatesComponent/>
            {(type ===  viewType.Year) && <YearComponents/>}
        </>
    );
};
