import {useRecoilValue} from 'recoil';
import {viewState} from '../../recoil/atoms';

import {DaysComponent} from './Days';
import {DatesComponent} from './Dates';
import {YearComponents} from './Year';

enum viewType {
    Year = 'year',
    Day = 'day'
}

export const CalendarComponent = () => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    return (
        <>
            {(type !== viewType.Year && type !== viewType.Day) && <>
                <DaysComponent/>
                <DatesComponent/>
            </>}
            {(type ===  viewType.Year) && <YearComponents/>}
        </>
    );
};
