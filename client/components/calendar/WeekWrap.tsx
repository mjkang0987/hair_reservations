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

import {useChangeDayType} from '../../hooks/useChangeDate';

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
    const setView = useSetRecoilState(viewState);

    const {
        fullYear,
        month,
        date,
        day,
        weekLastDay,
        monthLastNumber,
        monthPrevLastNumber,
    } = curr;

    const setDate = ({
        currMonth,
        currDate
    }: SetDateType) => {
        useChangeDayType({
            currMonth: currMonth ?? month,
            currYear : fullYear,
            currDate,
            setCurr,
            setView,
            router
        });
    };

    const setNumArr = () => {
        if (type === ViewType.Week && (weekLastDay < 6)) {
            return new Array(6 - weekLastDay);
        }

        if (type === ViewType.Three && (monthLastNumber - date < 2)) {
            return new Array((monthLastNumber - date === 0
                              ? 2
                              : monthLastNumber - date));
        }

        return [];
    };

    return (<>
            {type === ViewType.Day && <TimelineComponent isToday={isTodayValue(today, fullYear, month, date)}/>}

            {type !== ViewType.Day && <StyledWeeks>
                {type && curr[type]().map((w: number, index: number) => <StyledWeek key={`week_${w}`}>
                    <StyledNumWrap>
                        <Num onClick={() => {
                            setDate({
                                currDate: w
                            });
                        }}
                             isToday={isTodayValue(today, fullYear, month, Number(w))}>{w}</Num>
                    </StyledNumWrap>

                    <TimelineComponent isToday={isTodayValue(today, fullYear, month, Number(w))}/>
                </StyledWeek>)}
                {setNumArr().length > 0 && setNumArr().fill(null).map((_, index) => <StyledWeek key={`next_${index}`}>
                    <StyledNumWrap>
                        <Num onClick={() => {
                            setDate({
                                currDate : index + 1,
                                currMonth: month + 1
                            });
                        }}
                             isToday={isTodayValue(today, fullYear, month, Number(index) + 1)}>{index + 1}</Num>
                    </StyledNumWrap>

                    <TimelineComponent isToday={isTodayValue(today, fullYear, month, Number(index) + 1)}/>
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