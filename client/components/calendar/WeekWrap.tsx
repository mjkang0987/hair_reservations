import React from 'react';
import styled from 'styled-components';

import {
    useRecoilValue,
} from 'recoil';

import {
    targetStateState,
    viewState
} from '../../recoil/atoms';

import {
    ViewType
} from '../../utils/constants';

import {DateComponent} from './Date';

interface WeekType {
    type: string
}

export const WeekWrapComponent = ({
    type
}: WeekType) => {
    const curr = useRecoilValue(targetStateState);
    const view = useRecoilValue(viewState);

    const {
        month,
        weekFirstNumber,
        monthPrevLastNumber,
    } = curr;

    const arrayCurrent = () => {
        return curr[type]();
    };

    const arrayPrev = () => {
        const prevCount = 7 - weekFirstNumber > -1 ? 7 - curr.week().length : 0;
        return new Array(prevCount).fill(monthPrevLastNumber).reduce((acc, curr, i) => [+curr - i, ...acc], []);
    };

    const arrayNext = () => {
        const nextCount = (view.type === ViewType.Week ? 7 : 3) - arrayCurrent().length - (view.type === ViewType.Week ? arrayPrev().length : 0);
        return new Array(nextCount).fill(1).reduce((acc, curr, i) => [...acc, curr + i], []);
    };

    return (<StyledWeeks>
            {view.type === ViewType.Week && <DateComponent arrayDates={arrayPrev()} currMonth={month -1} type={ViewType.Week}/>}
            <DateComponent arrayDates={arrayCurrent()} currMonth={month} type={view.type} />
            <DateComponent arrayDates={arrayNext()} currMonth={month + 1} type={view.type} />
        </StyledWeeks>
    );
};

const StyledWeeks = styled.ul`
  flex: 1;
  position: relative;
  display: grid;
  grid-row: 2 / 3;
  align-items: stretch;
`;