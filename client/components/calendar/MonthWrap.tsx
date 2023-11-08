import styled from 'styled-components';

import {
    useRecoilValue,
} from 'recoil';
import {
    targetStateState,
} from '../../recoil/atoms';

import {MonthComponent} from './Month';

export const MonthWrapComponent = () => {
    const curr = useRecoilValue(targetStateState);

    const {
        month,
        monthFirstDay,
        monthPrevLastNumber,
        monthLastNumber,
        monthLastDay
    } = curr;

    const arrayPrev = () => {
        return +monthFirstDay < 7 && new Array(monthFirstDay).fill(0).reduce((acc, curr, i) => [+monthPrevLastNumber - i, ...acc], []);
    };

    const arrayCurrent = () => {
        return new Array(monthLastNumber).fill(0).reduce((acc, _, i) => [...acc, i + 1], []);
    };

    const arrayNext = () => {
        return +monthLastDay < 6 && new Array(6 - +monthLastDay).fill(0).reduce((acc, _, i) => [...acc, i + 1], []);
    };

    return (
        <StyledMonthWrap>
            <MonthComponent monthDates={arrayPrev()} currMonth={month - 1} type="prev"/>
            <MonthComponent monthDates={arrayCurrent()} currMonth={month} type="current"/>
            <MonthComponent monthDates={arrayNext()} currMonth={month + 1} type="next"/>
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
