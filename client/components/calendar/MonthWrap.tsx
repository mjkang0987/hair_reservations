import React from 'react';

import styled from 'styled-components';

import {
    useRecoilValue,
} from 'recoil';

import {
    targetStateState,
} from '../../recoil/atoms';

import {ViewType} from '../../utils/constants';

import {DateComponent} from './Date';

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
        return +monthFirstDay < 7 && new Array(monthFirstDay).fill(0).reduce((acc, _, i) => [+monthPrevLastNumber - i, ...acc], []);
    };

    const arrayCurrent = () => {
        return new Array(monthLastNumber).fill(0).reduce((acc, _, i) => [...acc, i + 1], []);
    };

    const arrayNext = () => {
        return +monthLastDay < 6 && new Array(6 - +monthLastDay).fill(0).reduce((acc, _, i) => [...acc, i + 1], []);
    };

    return (<StyledMonthWrap>
            {arrayPrev() && <DateComponent arrayDates={arrayPrev()}
                                           currMonth={month - 1}
                                           type={ViewType.Month}/>}
            <DateComponent arrayDates={arrayCurrent()}
                           currMonth={month}
                           type={ViewType.Month}/>
            {arrayNext() && <DateComponent arrayDates={arrayNext()}
                                           currMonth={month + 1}
                                           type={ViewType.Month}/>}
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
