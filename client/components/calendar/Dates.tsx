import {useRecoilValue} from 'recoil';

import {currentDate} from '../../recoil/atoms';
import styled from 'styled-components';
import React from 'react';

interface Props {
    prevDates?: [];
    nextDates?: [];
}

interface Props {
    isToday?: boolean;
}

export const DatesComponent = ({prevDates, nextDates}: Props) => {
    const current = useRecoilValue(currentDate);

    const {full, firstDay, lastDay, lastDate, prevLastDate} = current;

    return (
        <CalendarWrap>
            <DateWrap>
                {Number(firstDay) < 7 && new Array(firstDay).fill(null).map((_, index) => <Date key={index}>
                    <Num className="disabled">{Number(prevLastDate) - index}</Num>
                </Date>).reverse()}

                {new Array(lastDate).fill(null).map((_, index) =>
                <Date key={index}>
                    <Num isToday={index + 1 === full?.getDate()}>{index + 1}</Num>
                </Date>)}

                {Number(lastDay) < 6 && new Array(6 - Number(lastDay)).fill(null).map((_, index) => <Date key={index}>
                    <Num className="disabled">{index + 1}</Num>
                </Date>)}
            </DateWrap>
        </CalendarWrap>
    );
};

const CalendarWrap = styled.div`
  flex: 1;
`;

const DateWrap = styled.ul`
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
`

const Num = styled.button <Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: transparent;
  border: none;
  font-size: var(--defaultSmallFont);
  color: var(--defaultBlack);
  ${props => props.isToday && `
    background-color: var(--defaultBlue);
    color: #fff;
  `}
  
  &:hover {
    background-color: var(--defaultDarkGray);
    color: #fff;
  }
  
  &.disabled {
    color: var(--defaultLightGray);
  }
`;
