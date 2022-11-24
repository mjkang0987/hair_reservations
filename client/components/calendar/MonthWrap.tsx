import styled from 'styled-components';

import {useRecoilValue} from 'recoil';
import {todayState} from '../../recoil/atoms';
import {Num} from './Num';

interface DateType {
    isToday: boolean;
    isCurrentMonth: boolean;
    monthFirstDay: number;
    monthLastDay: number;
    monthLastNumber: number;
    monthPrevLastNumber: number;
}

export const MonthWrapComponent = ({
    isToday,
    monthFirstDay,
    monthLastDay,
    monthLastNumber,
    monthPrevLastNumber
}: DateType) => {
    const today = useRecoilValue(todayState);
    return (
        <MonthWrap>
            {Number(monthFirstDay) < 7 && new Array(monthFirstDay).fill(null).map((_, index) =>
                <Date key={`prev_${index}`}>
                    <Num>{Number(monthPrevLastNumber) - index}</Num>
                </Date>).reverse()}

            {new Array(monthLastNumber).fill(null).map((_, index) => <Date key={`curr_${index}`}>
                    <Num isToday={isToday && index + 1 === today.getDate()}>{index + 1}</Num>
                </Date>)}

            {Number(monthLastDay) < 6 && new Array(6 - Number(monthLastDay)).fill(null).map((_, index) =>
                <Date key={`next_${index}`}>
                    <Num>{index + 1}</Num>
                </Date>)}
        </MonthWrap>
    );
};

const MonthWrap = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  height: 100%;
`;

const Date = styled.li`
  padding: 5px;
  text-align: center;
  border-right: 1px solid var(--defaultLightGray);
  border-top: 1px solid var(--defaultLightGray);

  &:nth-child(7n) {
    border-right: none;
  }

  &:nth-child(-n+7) {
    border-top: none;
  }
`;
