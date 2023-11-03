import {useCallback} from 'react';

import {useRouter} from 'next/router';

import styled from 'styled-components';

import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';
import {
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {useChangeDay} from '../../hooks/useChangeDate';

import {
    isTodayValue,
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

    return (
        <StyledMonthWrap>
            {+monthFirstDay < 7 && new Array(monthFirstDay).fill(0).map((val, index) =>
                <StyledDate key={`prev_${val + index}`}
                            type="prev">
                    <Num onClick={() => {
                        useChangeDay({
                            currMonth: month - 1,
                            currYear : fullYear,
                            currDate : +monthPrevLastNumber - index,
                            setCurr,
                            setView,
                            router
                        });
                    }}
                         isToday={isTodayValue(today, fullYear, month - 1, +monthPrevLastNumber - index)}>{Number(
                        monthPrevLastNumber) - index}</Num>
                </StyledDate>).reverse()}

            {new Array(monthLastNumber).fill(0).map((val, index) => <StyledDate key={`curr_${val + index}`} type="current">
                <Num onClick={() => {
                    useChangeDay({
                        currMonth: month,
                        currYear : fullYear,
                        currDate: index + 1,
                        setCurr,
                        setView,
                        router
                    });
                }}
                     isToday={isTodayValue(today, fullYear, month, +index + 1)}>{index + 1}</Num>
            </StyledDate>)}

            {+monthLastDay < 6 && new Array(6 - +monthLastDay).fill(0).map((val, index) =>
                <StyledDate key={`next_${val + index}`}
                            type="next">
                    <Num onClick={() => {
                        useChangeDay({
                            currMonth: month + 1,
                            currYear : fullYear,
                            currDate: index + 1,
                            setCurr,
                            setView,
                            router
                        });
                    }}
                         isToday={isTodayValue(today, fullYear, month + 1, +index + 1)}>{index + 1}</Num>
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

const StyledDate = styled.li<{ type: string }>`
  padding: 5px;
  text-align: center;
  border-right: 1px solid var(--light-gray-color);
  border-top: 1px solid var(--light-gray-color);

  &:nth-child(7n) {
    border-right: none;
  }

  &:nth-child(-n+7) {
    border-top: none;
  }

  ${props => (props.type === 'prev' || props.type === 'next') && `button {
    color: var(--gray-color);
  }
  `}
`;
