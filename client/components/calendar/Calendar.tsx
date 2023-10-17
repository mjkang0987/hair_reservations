import {useRecoilValue} from 'recoil';
import {viewState} from '../../recoil/atoms';

import {ViewType} from '../../utils/constants';

import {DaysComponent} from './Days';
import {DatesComponent} from './Dates';
import {YearComponents} from './Year';

export const CalendarComponent = () => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    return (
        <>
            {(type !== viewType.Year && type !== viewType.Day) && <>
                <DaysComponent/>
                <DatesComponent/>
            </>}
            {(type ===  ViewType.Year) && <YearComponents/>}
        </>
    );
};
