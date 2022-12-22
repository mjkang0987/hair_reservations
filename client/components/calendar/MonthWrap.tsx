import {useRouter} from "next/router";

import styled from 'styled-components';

import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {targetStateState, todayState, viewState} from '../../recoil/atoms';

import {Num} from './Num';

interface DateType {
    isToday: boolean;
}

export const MonthWrapComponent = ({
    isToday,
}: DateType) => {
    const router = useRouter();

    const today = useRecoilValue(todayState);
    const [curr, setCurr] = useRecoilState(targetStateState);

    const {
        fullYear,
        month,
        monthFirstDay,
        monthPrevLastNumber,
        monthLastNumber,
        monthLastDay
    } = curr;

    const setView = useSetRecoilState(viewState);

    const setDate = ({currentDate}: {currentDate: any}) => {
        setCurr(new Date(fullYear, month, Number(currentDate)));
        setView({type: 'day'});

        router.push('/day');
    };

    return (
        <MonthWrap>
            {Number(monthFirstDay) < 7 && new Array(monthFirstDay).fill(null).map((_, index) =>
                <DateEl key={`prev_${index}`}>
                    <Num onClick={() => setDate({currentDate: Number(monthPrevLastNumber) - index})}>{Number(monthPrevLastNumber) - index}</Num>
                </DateEl>).reverse()}

            {new Array(monthLastNumber).fill(null).map((_, index) => <DateEl key={`curr_${index}`}>
                    <Num onClick={() => setDate({currentDate: index + 1})} isToday={isToday && index + 1 === today.getDate()}>{index + 1}</Num>
                </DateEl>)}

            {Number(monthLastDay) < 6 && new Array(6 - Number(monthLastDay)).fill(null).map((_, index) =>
                <DateEl key={`next_${index}`}>
                    <Num onClick={() => setDate({currentDate: index + 1})}>{index + 1}</Num>
                </DateEl>)}
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

const DateEl = styled.li`
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
