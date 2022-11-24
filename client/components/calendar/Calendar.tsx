import {useRecoilValue} from 'recoil';
import {viewState} from '../../recoil/atoms';

import {DaysComponent} from './Days';
import {DatesComponent} from './Dates';

export const CalendarComponent = ()  => {
    const view = useRecoilValue(viewState);
    const {type} = view;

    return (
        <>
            {(type === 'month' || type === 'week' || type === 'three') && <DaysComponent type={type}/>}
            <DatesComponent/>
        </>
    );
};
