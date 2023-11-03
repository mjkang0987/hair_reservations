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

import {
    isTodayValue,
    SetDateType,
    ViewType
} from '../../utils/constants';

import {useChangeDay} from '../../hooks/useChangeDate';

import {Num} from './Num';
import {TimelineComponent} from './Timeline';

interface WeekType {
    type: string
}

export const WeekWrapComponent = ({
    type
}: WeekType) => {
    const router = useRouter();

    const today = useRecoilValue(todayState);

    const [curr, setCurr] = useRecoilState(targetStateState);
    const [view, setView] = useRecoilState(viewState);

    const {
        fullYear,
        month,
        date,
        weekFirstNumber,
        monthLastNumber,
        monthPrevLastNumber,
    } = curr;

    const setDate = ({
        currMonth,
        currDate
    }: SetDateType) => {
        useChangeDay({
            currMonth: currMonth ?? month,
            currYear : fullYear,
            currDate,
            setCurr,
            setView,
            router
        });
    };

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

    return (<>
            {view.type === ViewType.Day && <TimelineComponent fullYear={fullYear}
                                                              month={month}
                                                              date={date}
                                                              isToday={isTodayValue(today, fullYear, month, date)}/>}
            {view.type !== ViewType.Day && <StyledWeeks>
                {view.type === ViewType.Week && arrayPrev().map((w: number) => <StyledWeek key={`week_${w}`}>
                    <StyledNumWrap>
                        <Num onClick={() => {
                            setDate({
                                currMonth: month - 1,
                                currDate: w,
                            });
                        }}
                             isToday={isTodayValue(today, fullYear, month - 1, +w)}>{w}</Num>
                    </StyledNumWrap>
                </StyledWeek>)}

                {arrayCurrent().map((w: number, index: number) => <StyledWeek key={`week_${w}`}>
                    <StyledNumWrap>
                        <Num onClick={() => {
                            setDate({
                                currDate: w
                            });
                        }}
                             isToday={isTodayValue(today, fullYear, month, +w)}>{w}</Num>
                    </StyledNumWrap>
                    <TimelineComponent fullYear={fullYear}
                                       month={month}
                                       date={+w}
                                       isToday={isTodayValue(today, fullYear, month, +w)}/>
                </StyledWeek>)}

                {arrayNext().map((w: number, index: number) => <StyledWeek key={`week_${w}`}>
                    <StyledNumWrap>
                        <Num onClick={() => {
                            setDate({
                                currMonth: month + 1,
                                currDate: w,
                            });
                        }}
                             isToday={isTodayValue(today, fullYear, month + 1, +w)}>{w}</Num>
                    </StyledNumWrap>
                </StyledWeek>)}

            </StyledWeeks>}
        </>
    );
};

const StyledWeeks = styled.ul`
  flex: 1;
  position: relative;
  display: grid;
  grid-row: 2 / 3;
  align-items: stretch;
`;

const StyledWeek = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: var(--light-gray-color);
  }

  &:nth-child(7) {
    &:after {
      display: none;
    }
  }

  button {
    font-size: var(--default-font);
  }
`;

const StyledNumWrap = styled.span`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 35px;
  width: 100%;
  background-color: var(--white-color-80);
  z-index: 1;

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
`;