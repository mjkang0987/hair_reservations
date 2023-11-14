import {useEffect} from 'react';

import styled from 'styled-components';

import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';
import {
    currReservationsState,
    reservationsState,
    targetStateState,
    todayState,
    viewState
} from '../../recoil/atoms';

import {
    NodeType,
    ViewType
} from '../../utils/constants';

import {
    isTodayValue,
    filterReservations
} from '../../utils/utils';

import {Num} from './Num';
import {ReservationComponent} from '../reservation/Reservation';

interface MonthType {
    arrayDates: number[];
    currMonth: number;
    type: string;
}

export const DateComponent = ({
    arrayDates,
    currMonth,
    type
}: MonthType) => {
    const today = useRecoilValue(todayState);
    const [curr, setCurr] = useRecoilState(targetStateState);

    const reservations = useRecoilValue(reservationsState);
    const currReservations = useRecoilValue(currReservationsState);

    const {
        fullYear
    } = curr;

    const setView = useSetRecoilState(viewState);

    const filterItems = ({
        month,
        date
    }: {month: number; date: number}) => {
        return filterReservations({
            reservations: currReservations,
            fullYear,
            currMonth: month,
            currDate: date
        })
    };

    return (<>
        {arrayDates.map((val, index) => <StyledDate key={`month_${val + index}`} type={type}>
            <StyledNumWrap>
                <Num onClick={() => {
                    setCurr(new Date(fullYear, currMonth, val));
                    setView({type: ViewType.Day});
                }}
                     isToday={isTodayValue(today, fullYear, currMonth, +val)}>{val}</Num>
            </StyledNumWrap>
            {currReservations.length > 0 && <>
                <ReservationComponent items={filterReservations({
                    reservations: currReservations,
                    fullYear,
                    currMonth: currMonth + 1,
                    currDate: val
                })}/>
            </>}
        </StyledDate>)}
    </>);
};

const StyledDate = styled.li<{ type: string }>`
  ${props => props.type !== ViewType.Month ? `
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  
  &:nth-child(7) {
    &:after {
      display: none;
    }
  }

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: var(--light-gray-color);
  }
  
  > span {
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 50px;
      background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .8) 100%);
      pointer-events: none;
    }
  }
  
  button {
    font-size: var(--default-font);
  }
  ` : `
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
  `};
`;

const StyledNumWrap = styled.span`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 35px;
  width: 100%;
  background-color: var(--white-color-80);
  z-index: 1;
`;