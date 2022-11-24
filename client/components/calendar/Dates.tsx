import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {targetStateState, todayState, viewState} from '../../recoil/atoms';

import {DateWrpComponent} from './DateWrap';
import {WeekWrapComponent} from './WeekWrap';

export const DatesComponent = () => {
    const today = useRecoilValue(todayState);
    const target = useRecoilValue(targetStateState);
    const {
        fullYear,
        month,
        date,
        day,
        monthFirstDay,
        monthLastDay,
        monthLastDate,
        monthLastNumber,
        monthPrevLastNumber,
        monthPrevLastDate,
        weekLength,
        weekFirstDate,
        weekFirstNumber,
        weekFirstDay,
        weekLastDay,
        week
    } = target;

    const view = useRecoilValue(viewState);
    const {type} = view;

    const isToday = [today.getFullYear(), today.getMonth(), today.getDate()].join(' ') === [fullYear, month, date].join(' ');
    return (<CalendarWrap>
            {type === 'month' &&
                <DateWrpComponent isToday={isToday}
                                  isCurrentMonth={false}
                                  monthFirstDay={monthFirstDay}
                                  monthLastDay={monthLastDay}
                                  monthLastNumber={monthLastNumber}
                                  monthPrevLastNumber={monthPrevLastNumber}/>}
        </CalendarWrap>
    );
};

const CalendarWrap = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 150px auto;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;
