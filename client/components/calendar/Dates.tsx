import styled from 'styled-components';

import {DateWrpComponent} from './DateWrap';
import {useRecoilValue} from 'recoil';
import {currentDate, todayDate} from '../../recoil/atoms';
import {useChangeDateBridge} from '../../hooks/useChangeDate';

export const DatesComponent = () => {
    const today = useRecoilValue(todayDate);
    const current = useRecoilValue(currentDate);

    const {full} = current;

    const changeDate = useChangeDateBridge();

    const isToday = changeDate.getDate({targetDate: full})?.join(' ') === changeDate.getDate({targetDate: today})?.join(' ');
    const isCurrentMonth = changeDate.getDate({targetDate: full, type: 'month'})?.join(' ') === changeDate.getDate({targetDate: today, type: 'month'})?.join(' ');

    return (<CalendarWrap>
            {today && <DateWrpComponent isToday={isToday}
                                        isCurrentMonth={isCurrentMonth}/>}
        </CalendarWrap>
    );
};

const CalendarWrap = styled.div`
  flex: 1;
`;
