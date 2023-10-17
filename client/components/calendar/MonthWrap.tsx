import {useRouter} from "next/router";

import styled from 'styled-components';

import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {targetStateState, todayState, viewState} from '../../recoil/atoms';

import {useChangeDayType} from "../../hooks/useChangeDate";

import {
    SetDateType
} from '../../utils/constants';

import {Num} from './Num';

export const MonthWrapComponent = () => {
    const router = useRouter();

    const today = useRecoilValue(todayState);
    const [curr, setCurr] = useRecoilState(targetStateState);

    const {
        fullYear,
        month,
        date,
        monthFirstDay,
        monthPrevLastNumber,
        monthLastNumber,
        monthLastDay
    } = curr;

    const setView = useSetRecoilState(viewState);

    const setDate = ({
        currMonth,
        currDate,
    }: SetDateType) => {
        useChangeDayType({
            currMonth: currMonth ?? month,
            currYear: fullYear,
            currDate,
            setCurr,
            setView,
            router
        });
    };

    const isTodayValue = (number: number = 0): boolean => {
        return [today.getFullYear(), today.getMonth(), today.getDate()].join(' ') === [fullYear, month, number].join(' ');
    };

    return (
        <StyledMonthWrap>
            {Number(monthFirstDay) < 7 && new Array(monthFirstDay).fill(null).map((_, index) =>
                <StyledDate key={`prev_${index}`}>
                    <Num onClick={() => {
                        setDate({
                            currMonth: month - 1,
                            currDate: Number(monthPrevLastNumber) - index
                        });
                    }} isToday={isTodayValue(Number(monthPrevLastNumber) - index)}>{Number(monthPrevLastNumber) - index}</Num>
                </StyledDate>).reverse()}

            {new Array(monthLastNumber).fill(null).map((_, index) => <StyledDate key={`curr_${index}`}>
                    <Num onClick={() => {
                        setDate({
                            currDate: index + 1
                        });
                    }} isToday={isTodayValue(Number(index) + 1)}>{index + 1}</Num>
                </StyledDate>)}

            {Number(monthLastDay) < 6 && new Array(6 - Number(monthLastDay)).fill(null).map((_, index) =>
                <StyledDate key={`next_${index}`}>
                    <Num onClick={() => {
                        setDate({
                            currMonth: month + 1,
                            currDate: index + 1
                        });
                    }} isToday={isTodayValue(Number(index) + 1)}>{index + 1}</Num>
                </StyledDate>)}
        </StyledMonthWrap>
    );
};

const StyledMonthWrap = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;
  height: 100%;
`;

const StyledDate = styled.li`
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
